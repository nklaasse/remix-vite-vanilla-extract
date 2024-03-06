import { createElementTypeContext } from "~/components/ElementType";
import { useSlot } from "~/hooks/useSlot";
import * as React from "react";
import type { AriaRadioGroupProps, RadioGroupAria } from "react-aria";
import { useRadioGroup } from "react-aria";
import type { RadioGroupState, SingleSelectListState } from "react-stately";
import {
  Item,
  useRadioGroupState,
  useSingleSelectListState,
} from "react-stately";
import { Field } from "../Field";
import { RangeButtonGroupContextualHelp } from "./RangeButtonGroupContextualHelp";
import { RangeButtonGroupErrorMessage } from "./RangeButtonGroupErrorMessage";
import type { RangeButtonGroupInputProps } from "./RangeButtonGroupInput";
import { RangeButtonGroupInput } from "./RangeButtonGroupInput";
import { RangeButtonGroupLabel } from "./RangeButtonGroupLabel";
import { RangeButtonGroupReset } from "./RangeButtonGroupReset";

export const { ElementTypeProvider, useElementType } = createElementTypeContext<
  "root" | "input" | "value"
>();

export type RangeButtonGroupContextValue<T extends Record<string, unknown>> = {
  props: {
    labelProps: RadioGroupAria["labelProps"];
    radioGroupProps: RadioGroupAria["radioGroupProps"];
    errorMessageProps: RadioGroupAria["errorMessageProps"];
  };
  state: {
    setInputProps: React.Dispatch<
      React.SetStateAction<RangeButtonGroupInputProps<T>>
    >;
    listState: SingleSelectListState<T>;
    radioGroupState: RadioGroupState;
  };
  refs: {
    labelRef: React.RefCallback<HTMLLabelElement>;
    errorMessageRef: React.RefCallback<HTMLDivElement>;
    rangeButtonGroupRef: React.RefObject<HTMLDivElement>;
  };
};

export const RangeButtonGroupContext = React.createContext<
  RangeButtonGroupContextValue<Record<string, unknown>>
>({
  props: {
    labelProps: {},
    radioGroupProps: {},
    errorMessageProps: {},
  },
  state: {
    setInputProps: () => {},
    listState: null!,
    radioGroupState: null!,
  },
  refs: {
    labelRef: () => {},
    errorMessageRef: () => {},
    rangeButtonGroupRef: React.createRef<HTMLDivElement>(),
  },
});

export type RangeButtonGroupProps = Omit<
  AriaRadioGroupProps,
  "orientation" | "label" | "errorMessage"
> & {
  children: React.ReactNode;
};

/**
 * RangeButtonGroups allow user to choose from a list (rate) of hierarchical data.
 */
const _RangeButtonGroup = React.forwardRef<
  HTMLDivElement,
  RangeButtonGroupProps
>(function RangeButtonGroup(props, ref) {
  const { children, ...otherProps } = props;

  const [inputProps, setInputProps] = React.useState<
    RangeButtonGroupInputProps<Record<string, unknown>>
  >({
    items: undefined,
    children: [],
  });

  const [labelRef, label] = useSlot();
  const [errorMessageRef, errorMessage] = useSlot();

  const rangeButtonGroupRef = React.useRef<HTMLInputElement>(null!);

  const radioGroupState = useRadioGroupState(otherProps);
  const { radioGroupProps, labelProps, errorMessageProps } = useRadioGroup(
    {
      ...otherProps,
      label,
      errorMessage,
    },
    radioGroupState
  );

  const listState = useSingleSelectListState({
    selectedKey: radioGroupState.selectedValue,
    ...inputProps,
  });

  const selectedItem = listState.selectedItem;

  return (
    <ElementTypeProvider type="root">
      <RangeButtonGroupContext.Provider
        value={{
          props: {
            labelProps,
            radioGroupProps,
            errorMessageProps,
          },
          state: {
            setInputProps,
            listState,
            radioGroupState,
          },
          refs: {
            labelRef,
            errorMessageRef,
            rangeButtonGroupRef,
          },
        }}
      >
        <Field ref={ref}>
          {selectedItem ? (
            <ElementTypeProvider type="value">
              {selectedItem.rendered}
            </ElementTypeProvider>
          ) : null}
          {children}
        </Field>
      </RangeButtonGroupContext.Provider>
    </ElementTypeProvider>
  );
});

export const RangeButtonGroup = Object.assign(_RangeButtonGroup, {
  Item,
  Label: RangeButtonGroupLabel,
  ErrorMessage: RangeButtonGroupErrorMessage,
  ContextualHelp: RangeButtonGroupContextualHelp,
  Reset: RangeButtonGroupReset,
  Input: RangeButtonGroupInput,
});
