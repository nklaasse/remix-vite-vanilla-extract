import { Field } from "~/components/Field";
import { useControlledState } from "~/hooks/useControlledState";
import { useSlot } from "~/hooks/useSlot";
import * as React from "react";
import type {
  AriaDatePickerProps,
  DatePickerAria,
  DateValue,
} from "react-aria";
import { useDatePicker } from "react-aria";
import type { DatePickerState } from "react-stately";
import { useDatePickerState } from "react-stately";
import { createElementTypeContext } from "../ElementType";

export const { ElementTypeProvider, useElementType } = createElementTypeContext<
  "date" | "present"
>();

type PeriodGranularity = "year" | "month";

type PeriodPickerDateBaseContextValue = {
  props: {
    locale: string;
    fieldProps: DatePickerAria["fieldProps"];
    buttonProps: DatePickerAria["buttonProps"];
    dialogProps: DatePickerAria["dialogProps"];
    labelProps: DatePickerAria["labelProps"];
    errorMessageProps: DatePickerAria["errorMessageProps"];
    granularityProps: {
      onChange?: (isSelected: boolean) => void;
      isSelected?: boolean;
      value?: "year";
    };
  };
  state: {
    datePickerState: DatePickerState;
  };
  refs: {
    labelRef: React.RefCallback<HTMLLabelElement>;
    errorMessageRef: React.RefCallback<HTMLDivElement>;
    fieldRef: React.RefObject<HTMLDivElement>;
  };
};

export const PeriodPickerDateBaseContext =
  React.createContext<PeriodPickerDateBaseContextValue>({
    props: {
      locale: "en-GB",
      fieldProps: {},
      buttonProps: {},
      dialogProps: {},
      labelProps: {},
      errorMessageProps: {},
      granularityProps: {},
    },
    state: {
      datePickerState: null!,
    },
    refs: {
      labelRef: () => {},
      errorMessageRef: () => {},
      fieldRef: React.createRef<HTMLDivElement>(),
    },
  });

export type PeriodPickerDateBaseProps<T extends DateValue = DateValue> = Omit<
  AriaDatePickerProps<T>,
  "granularity" | "label" | "errorMessage"
> & {
  /**
   * Granularity of the selected date (controlled)
   */
  granularity?: PeriodGranularity;
  /**
   * Granularity of the selected date (uncontrolled)
   */
  defaultGranularity?: PeriodGranularity;
  /**
   * Handler that is called when the granularity changes.
   */
  onGranularityChange?: (granularity: PeriodGranularity) => void;
  /**
   * The locale to display and edit the value according to.
   */
  locale: string;
  /**
   * The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
   */
  name?: string;
  /**
   * Describes the type of autocomplete functionality the input should provide if any. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete).
   */
  autoComplete?: string;
  /**
   * A PeriodPicker.Label, PeriodPicker.ErrorMessage or PeriodPicker.Input component.
   */
  children: React.ReactNode;
};

/**
 * PeriodPickerDateBase is a component which handles a single DateInput + Picker
 */
export const PeriodPickerDateBase = React.forwardRef(
  function PeriodPickerDateBase(
    props: PeriodPickerDateBaseProps<DateValue>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) {
    const { children } = props;

    const {
      granularity: granularityProp,
      defaultGranularity = "month",
      onGranularityChange,
      locale,
      maxValue,
      minValue,
      name,
      autoComplete,
      ...otherProps
    } = props;

    const [granularity, setGranularity] = useControlledState<PeriodGranularity>(
      granularityProp,
      defaultGranularity,
      (granularity) => {
        if (granularity && onGranularityChange) {
          onGranularityChange(granularity);
        }
      }
    );

    const granularityProps = onGranularityChange
      ? {
          value: "year" as const,
          isSelected: granularity === "year",
          onChange: (isSelected: boolean) => {
            setGranularity(isSelected ? "year" : "month");
          },
        }
      : {};

    const inputRef = React.useRef<HTMLDivElement>(null!);
    const fieldRef = React.useRef<HTMLDivElement>(null!);

    const [labelRef, label] = useSlot();
    const [errorMessageRef, errorMessage] = useSlot();

    const datePickerState = useDatePickerState({
      ...otherProps,
      maxValue,
      minValue,
      // @ts-ignore
      granularity,
    });

    const {
      fieldProps,
      buttonProps,
      dialogProps,
      labelProps,
      errorMessageProps,
    } = useDatePicker(
      {
        ...otherProps,
        maxValue,
        minValue,

        label,
        errorMessage,
        // @ts-ignore
        granularity,
      },
      datePickerState,
      inputRef
    );

    return (
      <PeriodPickerDateBaseContext.Provider
        value={{
          props: {
            locale,
            fieldProps,
            buttonProps,
            dialogProps,
            labelProps,
            errorMessageProps,
            granularityProps,
          },
          state: {
            datePickerState,
          },
          refs: {
            labelRef,
            errorMessageRef,
            fieldRef,
          },
        }}
      >
        <Field>
          <input
            type="hidden"
            name={name}
            value={String(datePickerState.value)}
            autoComplete={autoComplete}
          />

          {children}
        </Field>
      </PeriodPickerDateBaseContext.Provider>
    );
  }
);
