import { createElementTypeContext } from "~/components/ElementType";
import type { InputGroupStates } from "~/components/InputGroup";
import { useSlot } from "~/hooks/useSlot";
import * as React from "react";
import type { AriaSelectOptions, SelectAria } from "react-aria";
import { HiddenSelect, useSelect } from "react-aria";
import type { SelectState } from "react-stately";
import { Item, Section, useSelectState } from "react-stately";
import { Field } from "../Field";
import { PickerContextualHelp } from "./PickerContextualHelp";
import { PickerDescription } from "./PickerDescription";
import { PickerErrorMessage } from "./PickerErrorMessage";
import { PickerIcon } from "./PickerIcon";
import { PickerLabel } from "./PickerLabel";
import { PickerReset } from "./PickerReset";
import type { PickerSelectProps } from "./PickerSelect";
import { PickerSelect } from "./PickerSelect";

export const { ElementTypeProvider, useElementType } = createElementTypeContext<
  "root" | "select"
>();

export type PickerProps<T extends Record<string, unknown>> = Omit<
  AriaSelectOptions<T>,
  "items" | "children" | "label" | "errorMessage"
> & {
  children: React.ReactNode;
};

export type PickerContextValue<T extends Record<string, unknown>> = {
  props: {
    labelProps: SelectAria<T>["labelProps"];
    triggerProps: SelectAria<T>["triggerProps"];
    valueProps: SelectAria<T>["valueProps"];
    menuProps: SelectAria<T>["menuProps"];
    errorMessageProps: SelectAria<T>["errorMessageProps"];
    placeholderProps: {
      children?: string;
    };
    states: InputGroupStates;
  };
  state: {
    setSelectProps: React.Dispatch<React.SetStateAction<PickerSelectProps<T>>>;
    selectState: SelectState<T>;
  };
  refs: {
    triggerRef: React.RefObject<HTMLDivElement>;
    triggerButtonRef: React.RefObject<HTMLDivElement>;
    labelRef: React.RefCallback<HTMLLabelElement>;
    errorMessageRef: React.RefCallback<HTMLDivElement>;
  };
};

export const PickerContext = React.createContext<
  PickerContextValue<Record<string, unknown>>
>({
  props: {
    labelProps: {},
    triggerProps: {},
    valueProps: {},
    menuProps: {},
    errorMessageProps: {},
    placeholderProps: {},
    states: {
      isInvalid: false,
    },
  },
  state: {
    setSelectProps: () => {},
    selectState: null!,
  },
  refs: {
    triggerRef: React.createRef<HTMLDivElement>(),
    triggerButtonRef: React.createRef<HTMLDivElement>(),
    labelRef: () => {},
    errorMessageRef: () => {},
  },
});

/**
 * Picker is a component that allows users to select an option from a list of options.
 */
export function Picker<T extends Record<string, unknown>>(
  props: PickerProps<T>
) {
  const { children, name, ...otherProps } = props;

  const triggerRef = React.useRef<HTMLDivElement>(null!);
  const triggerButtonRef = React.useRef<HTMLDivElement>(null!);

  const [selectProps, setSelectProps] = React.useState<
    PickerSelectProps<Record<string, unknown>>
  >({
    items: undefined,
    children: [],
  });

  const [labelRef, label] = useSlot();
  const [errorMessageRef, errorMessage] = useSlot();

  const state = useSelectState({
    ...selectProps,
    ...otherProps,
    label,
    errorMessage,
  });

  const { labelProps, triggerProps, valueProps, menuProps, errorMessageProps } =
    useSelect(
      {
        ...selectProps,
        ...otherProps,
      },
      state,
      triggerRef
    );

  return (
    <ElementTypeProvider type="root">
      <PickerContext.Provider
        value={{
          props: {
            labelProps,
            triggerProps,
            valueProps,
            menuProps,
            errorMessageProps,
            placeholderProps: {
              children: props.placeholder,
            },
            states: {
              isInvalid: props.validationState === "invalid",
            },
          },
          state: { setSelectProps, selectState: state },
          refs: {
            labelRef,
            errorMessageRef,
            triggerRef,
            triggerButtonRef,
          },
        }}
      >
        <Field>
          <HiddenSelect
            triggerRef={triggerRef}
            state={state}
            name={name}
            autoComplete={props.autoComplete}
            isDisabled={props.isDisabled}
          />

          {children}
        </Field>
      </PickerContext.Provider>
    </ElementTypeProvider>
  );
}

Picker.Label = PickerLabel;
Picker.Description = PickerDescription;
Picker.Icon = PickerIcon;
Picker.Reset = PickerReset;
Picker.ContextualHelp = PickerContextualHelp;
Picker.Select = PickerSelect;
Picker.ErrorMessage = PickerErrorMessage;
Picker.Item = Item;
Picker.Section = Section;
