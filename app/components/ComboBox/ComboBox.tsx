import { createElementTypeContext } from "~/components/ElementType";
import { breakpoints } from "~/css";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { useSlot } from "~/hooks/useSlot";
import * as React from "react";
import type { AriaComboBoxOptions, ComboBoxAria } from "react-aria";
import { useComboBox } from "react-aria";
import { useFilter } from "react-aria";
import type { ComboBoxState } from "react-stately";
import { useComboBoxState } from "react-stately";
import { Item, Section } from "react-stately";
import { Field } from "../Field";
import { ComboBoxContextualHelp } from "./ComboBoxContextualHelp";
import { ComboBoxDescription } from "./ComboBoxDescription";
import { ComboBoxErrorMessage } from "./ComboBoxErrorMessage";
import { ComboBoxIcon } from "./ComboBoxIcon";
import { ComboBoxLabel } from "./ComboBoxLabel";
import { ComboBoxReset } from "./ComboBoxReset";
import type { ComboBoxSelectProps } from "./ComboBoxSelect";
import { ComboBoxSelect } from "./ComboBoxSelect";

export const { ElementTypeProvider, useElementType } = createElementTypeContext<
  "root" | "select" | "input"
>();

export type ComboboxContextValue<T extends Record<string, unknown>> = {
  props: {
    children: React.ReactNode;
    labelProps: ComboBoxAria<T>["labelProps"];
    errorMessageProps: ComboBoxAria<T>["errorMessageProps"];
    buttonProps: ComboBoxAria<T>["buttonProps"];
    inputProps: ComboBoxAria<T>["inputProps"];
    listBoxProps: ComboBoxAria<T>["listBoxProps"];
    placeholderProps: {
      children?: string;
    };
  };
  state: {
    setSelectProps: React.Dispatch<
      React.SetStateAction<ComboBoxSelectProps<T>>
    >;
    comboboxState: ComboBoxState<T>;
  };
  refs: {
    buttonRef: React.RefObject<HTMLButtonElement>;
    inputRef: React.RefObject<HTMLInputElement>;
    listBoxRef: React.RefObject<HTMLUListElement>;
    popoverRef: React.RefObject<HTMLDivElement>;
    labelRef: React.RefCallback<HTMLLabelElement>;
    errorMessageRef: React.RefCallback<HTMLDivElement>;
  };
};

export const ComboBoxContext = React.createContext<
  ComboboxContextValue<Record<string, unknown>>
>({
  props: {
    children: null,
    labelProps: {},
    errorMessageProps: {},
    buttonProps: {},
    inputProps: {},
    listBoxProps: {},
    placeholderProps: {},
  },
  state: {
    setSelectProps: () => {},
    comboboxState: null!,
  },
  refs: {
    buttonRef: React.createRef<HTMLButtonElement>(),
    inputRef: React.createRef<HTMLInputElement>(),
    listBoxRef: React.createRef<HTMLUListElement>(),
    popoverRef: React.createRef<HTMLDivElement>(),
    labelRef: () => {},
    errorMessageRef: () => {},
  },
});

export type ComboboxProps<T extends Record<string, unknown>> = Omit<
  AriaComboBoxOptions<T>,
  | "items"
  | "defaultItems"
  | "children"
  | "label"
  | "errorMessage"
  | "buttonRef"
  | "inputRef"
  | "listBoxRef"
  | "popoverRef"
> & {
  children: React.ReactNode;
};

export function ComboBox<T extends Record<string, unknown>>(
  props: ComboboxProps<T>
) {
  const { children, ...otherProps } = props;

  // We need to have the item's and children properties from the
  // ComboBox.Select component since we need to pass them to the useComboBox hook
  const [selectProps, setSelectProps] = React.useState<
    ComboBoxSelectProps<Record<string, unknown>>
  >({
    items: undefined,
    defaultItems: undefined,
    children: [],
  });

  // Check if a Combobox.Label is mounted
  const [labelRef, label] = useSlot();
  // Check if a Combobox.ErrorMessage is mounted
  const [errorMessageRef, errorMessage] = useSlot();

  // We need to know if the popover is rendered as a tray or a popover
  // because if we wan't to render it in a tray, it would mean that we wan't to have
  // an input on top of the select items, but this will mean some other hooks would be impacted as well
  const isPopover = useMediaQuery(breakpoints.medium);

  const { contains } = useFilter({ sensitivity: "base" });

  const state = useComboBoxState({
    ...otherProps,
    ...selectProps,
    defaultFilter: contains,
    // In case we're rendering the popover in a tray, the
    // we can show an empty state when there are no items
    allowsEmptyCollection: !isPopover,
  });

  const buttonRef = React.useRef<HTMLButtonElement>(null!);
  const inputRef = React.useRef<HTMLInputElement>(null!);
  const listBoxRef = React.useRef<HTMLUListElement>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);

  const {
    buttonProps,
    inputProps,
    listBoxProps,
    labelProps,
    errorMessageProps,
  } = useComboBox(
    {
      ...otherProps,
      ...selectProps,

      label,
      errorMessage,

      buttonRef,
      listBoxRef,
      inputRef,
      popoverRef,
    },
    state
  );

  return (
    <ElementTypeProvider type="root">
      <ComboBoxContext.Provider
        value={{
          props: {
            children,
            labelProps,
            buttonProps,
            inputProps,
            errorMessageProps,
            listBoxProps,
            placeholderProps: {
              children: props.placeholder,
            },
          },
          state: { setSelectProps, comboboxState: state },
          refs: {
            buttonRef,
            inputRef,
            listBoxRef,
            popoverRef,
            labelRef,
            errorMessageRef,
          },
        }}
      >
        <Field>{children}</Field>
      </ComboBoxContext.Provider>
    </ElementTypeProvider>
  );
}

ComboBox.Label = ComboBoxLabel;
ComboBox.Select = ComboBoxSelect;
ComboBox.Reset = ComboBoxReset;
ComboBox.ContextualHelp = ComboBoxContextualHelp;
ComboBox.ErrorMessage = ComboBoxErrorMessage;
ComboBox.Description = ComboBoxDescription;
ComboBox.Icon = ComboBoxIcon;
ComboBox.Item = Item;
ComboBox.Section = Section;
ComboBox.Select = ComboBoxSelect;
