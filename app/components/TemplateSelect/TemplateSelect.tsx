import { createElementTypeContext } from "~/components/ElementType";
import { Field } from "~/components/Field";
import { useSlot } from "~/hooks/useSlot";
import { ListCollection } from "@react-stately/list";
import * as React from "react";
import type { AriaRadioGroupProps, RadioGroupAria } from "react-aria";
import { chain, useRadioGroup } from "react-aria";
import type { Node, RadioGroupState } from "react-stately";
import { Item, useCollection, useRadioGroupState } from "react-stately";
import { TemplateSelectContextualHelp } from "./TemplateSelectContextualHelp";
import { TemplateSelectErrorMessage } from "./TemplateSelectErrorMessage";
import type { TemplateSelectInputProps } from "./TemplateSelectInput";
import { TemplateSelectInput } from "./TemplateSelectInput";
import { TemplateSelectLabel } from "./TemplateSelectLabel";
import { TemplateSelectPreview } from "./TemplateSelectPreview";
import { TemplateSelectReset } from "./TemplateSelectReset";

export const { ElementTypeProvider, useElementType } = createElementTypeContext<
  "input" | "slide"
>();

type TemplateSelectContextValue<T extends Record<string, unknown>> = {
  props: {
    labelProps: RadioGroupAria["labelProps"];
    errorMessageProps: RadioGroupAria["errorMessageProps"];
    radioGroupProps: RadioGroupAria["radioGroupProps"];
  };
  state: {
    radioGroupState: RadioGroupState;
    setInputProps: React.Dispatch<
      React.SetStateAction<TemplateSelectInputProps<T>>
    >;
    collection: ListCollection<T>;
  };
  refs: {
    labelRef: React.RefCallback<HTMLLabelElement>;
    errorMessageRef: React.RefCallback<HTMLDivElement>;
    sliderRef: React.RefObject<HTMLDivElement>;
    scrollRef: React.RefObject<HTMLUListElement>;
  };
};

export const TemplateSelectContext = React.createContext<
  TemplateSelectContextValue<Record<string, unknown>>
>({
  props: {
    labelProps: {},
    errorMessageProps: {},
    radioGroupProps: {},
  },
  state: {
    radioGroupState: null!,
    setInputProps: () => {},
    collection: null!,
  },
  refs: {
    labelRef: () => {},
    errorMessageRef: () => {},
    sliderRef: React.createRef<HTMLDivElement>(),
    scrollRef: React.createRef<HTMLUListElement>(),
  },
});

export type TemplateSelectProps = Omit<
  AriaRadioGroupProps,
  "orientation" | "label" | "errorMessage"
> & {
  /**
   * TemplateSelect.Label, TemplateSelect.Input, TemplateSelect.ErrorMessage, TemplateSelect.Reset or TemplateSelect.ContextualHelp components
   */
  children: React.ReactNode;
};

export function TemplateSelect(props: TemplateSelectProps) {
  const { children, ...otherProps } = props;

  const [labelRef, label] = useSlot();
  const [errorMessageRef, errorMessage] = useSlot();

  const [inputProps, setInputProps] = React.useState<
    TemplateSelectInputProps<Record<string, unknown>>
  >({
    children: [],
    items: undefined,
  });

  const sliderRef = React.useRef<HTMLDivElement>(null!);
  const scrollRef = React.useRef<HTMLUListElement>(null!);

  // Create a collection based on the children
  const factory = (nodes: Iterable<Node<Record<string, unknown>>>) =>
    new ListCollection(nodes);

  const collection = useCollection(inputProps, factory, {
    suppressTextValueWarning: true,
  });

  /**
   * If the value of the slider / radio group changes we want to focus
   * on the newly selected node.
   */
  const onChange = (value: React.Key) => {
    const slide = sliderRef.current.querySelector(`[data-key="${value}"]`);

    if (slide) {
      const {
        left: sliderLeft,
        right: sliderRight,
        width: sliderWidth,
      } = sliderRef.current.getBoundingClientRect();
      const {
        left: slideLeft,
        right: slideRight,
        width: slideWidth,
      } = slide.getBoundingClientRect();

      if (!(sliderLeft <= slideLeft)) {
        scrollRef.current.scrollLeft += slideLeft - sliderLeft;
      } else if (!(sliderRight >= slideRight)) {
        scrollRef.current.scrollLeft +=
          slideLeft -
          sliderLeft -
          (sliderWidth - slideWidth - (sliderWidth % slideWidth));
      }
    }
  };

  const radioGroupState = useRadioGroupState({
    ...otherProps,
    onChange: chain(props.onChange, onChange),
  });

  const { radioGroupProps, labelProps, errorMessageProps } = useRadioGroup(
    {
      ...otherProps,
      label,
      errorMessage,
      orientation: "horizontal",
    },
    radioGroupState
  );

  return (
    <ElementTypeProvider type="input">
      <TemplateSelectContext.Provider
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
            sliderRef,
            scrollRef,
          },
        }}
      >
        <Field>{children}</Field>
      </TemplateSelectContext.Provider>
    </ElementTypeProvider>
  );
}

TemplateSelect.Item = Item;
TemplateSelect.Label = TemplateSelectLabel;
TemplateSelect.Preview = TemplateSelectPreview;
TemplateSelect.Reset = TemplateSelectReset;
TemplateSelect.ContextualHelp = TemplateSelectContextualHelp;
TemplateSelect.ErrorMessage = TemplateSelectErrorMessage;
TemplateSelect.Input = TemplateSelectInput;
