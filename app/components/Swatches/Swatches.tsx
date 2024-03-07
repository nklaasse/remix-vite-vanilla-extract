import { Field } from "~/components/Field";
import { useSlot } from "~/hooks/useSlot";
import { ListCollection } from "@react-stately/list";
import * as React from "react";
import type { AriaRadioGroupProps, RadioGroupAria } from "react-aria";
import { useRadioGroup } from "react-aria";
import type { Node, RadioGroupState } from "react-stately";
import { Item, useRadioGroupState, useCollection } from "react-stately";
import { SwatchesContextualHelp } from "./SwatchesContextualHelp";
import { SwatchesErrorMessage } from "./SwatchesErrorMessage";
import type { SwatchesInputProps } from "./SwatchesInput";
import { SwatchesInput } from "./SwatchesInput";
import { SwatchesLabel } from "./SwatchesLabel";
import { SwatchesReset } from "./SwatchesReset";

export type SwatchesContextValue<T extends Record<string, unknown>> = {
  props: {
    labelProps: RadioGroupAria["labelProps"];
    errorMessageProps: RadioGroupAria["errorMessageProps"];
    radioGroupProps: RadioGroupAria["radioGroupProps"];
  };
  state: {
    radioGroupState: RadioGroupState;
    setInputProps: React.Dispatch<React.SetStateAction<SwatchesInputProps<T>>>;
    collection: ListCollection<T>;
  };
  refs: {
    labelRef: React.RefCallback<HTMLLabelElement>;
    errorMessageRef: React.RefCallback<HTMLDivElement>;
    groupRef: React.RefObject<HTMLDivElement>;
  };
};

export const SwatchesContext = React.createContext<
  SwatchesContextValue<Record<string, unknown>>
>({
  props: {
    labelProps: {},
    errorMessageProps: {},
    radioGroupProps: {},
  },
  state: {
    setInputProps: () => {},
    radioGroupState: null!,
    collection: null!,
  },
  refs: {
    labelRef: () => {},
    errorMessageRef: () => {},
    groupRef: React.createRef<HTMLDivElement>(),
  },
});

export type SwatchesProps = Omit<
  AriaRadioGroupProps,
  "orientation" | "label" | "errorMessage"
> & {
  /**
   * Swatches.Input, Swatches.Label, Swatches.Reset or Swatches.Content components
   */
  children: React.ReactNode;
};

export function Swatches(props: SwatchesProps) {
  const { children } = props;

  const [labelRef, label] = useSlot();
  const [errorMessageRef, errorMessage] = useSlot();

  const [inputProps, setInputProps] = React.useState<
    SwatchesInputProps<Record<string, unknown>>
  >({
    children: [],
    items: undefined,
  });

  const radioGroupState = useRadioGroupState(props);

  const { radioGroupProps, labelProps, errorMessageProps } = useRadioGroup(
    {
      ...props,
      errorMessage,
      label,
      orientation: "horizontal",
    },
    radioGroupState
  );

  const collection = useCollection(
    {
      ...inputProps,
    },
    (nodes) => new ListCollection(nodes as Node<Record<string, unknown>>[])
  );

  const groupRef = React.useRef<HTMLDivElement>(null);

  return (
    <SwatchesContext.Provider
      value={{
        props: {
          labelProps,
          errorMessageProps,
          radioGroupProps,
        },
        state: {
          radioGroupState,
          collection,
          setInputProps,
        },
        refs: {
          labelRef,
          errorMessageRef,
          groupRef,
        },
      }}
    >
      <Field>{children}</Field>
    </SwatchesContext.Provider>
  );
}

Swatches.Item = Item;
Swatches.Label = SwatchesLabel;
Swatches.Reset = SwatchesReset;
Swatches.Input = SwatchesInput;
Swatches.ContextualHelp = SwatchesContextualHelp;
Swatches.ErrorMessage = SwatchesErrorMessage;
