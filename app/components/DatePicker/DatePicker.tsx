import { Field } from "~/components/Field";
import { useSlot } from "~/hooks/useSlot";
import * as React from "react";
import type {
  AriaDatePickerProps,
  DatePickerAria,
  DateValue,
} from "react-aria";
import { useDatePicker } from "react-aria";
import { useLocale } from "react-aria";
import { useDatePickerState } from "react-stately";
import { DatePickerContextualHelp } from "./DatePickerContextualHelp";
import { DatePickerErrorMessage } from "./DatePickerErrorMessage";
import { DatePickerInput } from "./DatePickerInput";
import { DatePickerLabel } from "./DatePickerLabel";
import { DatePickerReset } from "./DatePickerReset";

type DatePickerContextValue = {
  props: {
    locale: string;
    minValue: AriaDatePickerProps<DateValue>["minValue"];
    maxValue: AriaDatePickerProps<DateValue>["maxValue"];
    groupProps: DatePickerAria["groupProps"];
    labelProps: DatePickerAria["labelProps"];
    fieldProps: DatePickerAria["fieldProps"];
    buttonProps: DatePickerAria["buttonProps"];
    dialogProps: DatePickerAria["dialogProps"];
    calendarProps: DatePickerAria["calendarProps"];
    errorMessageProps: DatePickerAria["errorMessageProps"];
  };
  state: {
    datePickerState: ReturnType<typeof useDatePickerState>;
  };
  refs: {
    labelRef: React.RefCallback<HTMLLabelElement>;
    errorMessageRef: React.RefCallback<HTMLDivElement>;
    datePickerRef: React.RefObject<HTMLDivElement>;
    fieldRef: React.RefObject<HTMLDivElement>;
  };
};

export const DatePickerContext = React.createContext<DatePickerContextValue>({
  props: {
    locale: "en-GB",
    minValue: undefined,
    maxValue: undefined,
    groupProps: {},
    labelProps: {},
    fieldProps: {},
    buttonProps: {},
    dialogProps: {},
    calendarProps: {},
    errorMessageProps: {},
  },
  state: {
    datePickerState: null!,
  },
  refs: {
    labelRef: () => {},
    errorMessageRef: () => {},
    datePickerRef: React.createRef<HTMLDivElement>(),
    fieldRef: React.createRef<HTMLDivElement>(),
  },
});

export type DatePickerProps = Omit<
  AriaDatePickerProps<DateValue>,
  "value" | "granularity" | "errorMessage" | "label"
> & {
  /** The locale to display and edit the value according to. */
  locale?: string;
  /**
   * The current value (controlled).
   */
  value?: DateValue | null;
  /**
   * The current value (uncontrolled).
   */
  defaultValue?: DateValue | null;
  /**
   * Specify the granularity of the date selection
   *
   * @default day
   */
  granularity?: "year" | "month" | "day";
  /**
   * The name of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname).
   */
  name?: string;
  /**
   * Describes the type of autocomplete functionality the input should provide if any. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete).
   */
  autoComplete?: string;
  /**
   * One or more React elements
   */
  children?: React.ReactNode;
};

const _DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  function DatePicker(props, ref) {
    const { locale: defaultLocale } = useLocale();

    const [labelRef, label] = useSlot();
    const [errorMessageRef, errorMessage] = useSlot();

    const {
      value,
      granularity = "day",
      minValue,
      maxValue,
      locale = defaultLocale,
      name,
      autoComplete,
      children,
      ...otherProps
    } = props;

    const datePickerRef = React.useRef<HTMLDivElement>(null);
    const fieldRef = React.useRef<HTMLDivElement>(null);

    const datePickerState = useDatePickerState({
      ...otherProps,
      // React stately accepts null values but is typed incorrectly
      value: value as DateValue,
      minValue,
      maxValue,
      // @ts-ignore
      granularity,
    });

    const {
      groupProps,
      labelProps,
      fieldProps,
      buttonProps,
      dialogProps,
      calendarProps,
      errorMessageProps,
    } = useDatePicker(
      {
        ...otherProps,
        label,
        errorMessage,
        // React aria accepts null values but is typed incorrectly
        value: value as DateValue,
        minValue,
        maxValue,
        // @ts-ignore
        granularity,
      },
      datePickerState,
      datePickerRef
    );

    return (
      <DatePickerContext.Provider
        value={{
          props: {
            locale,
            minValue,
            maxValue,
            groupProps,
            labelProps,
            fieldProps,
            buttonProps,
            dialogProps,
            calendarProps: {
              ...calendarProps,
              maxValue,
              minValue,
            },
            errorMessageProps,
          },
          state: {
            datePickerState,
          },
          refs: {
            labelRef,
            errorMessageRef,
            datePickerRef,
            fieldRef,
          },
        }}
      >
        <Field ref={ref}>
          <input
            type="hidden"
            name={name}
            value={String(datePickerState.value)}
            autoComplete={autoComplete}
          />
          {children}
        </Field>
      </DatePickerContext.Provider>
    );
  }
);

export const DatePicker = Object.assign(_DatePicker, {
  Label: DatePickerLabel,
  Input: DatePickerInput,
  ErrorMessage: DatePickerErrorMessage,
  Reset: DatePickerReset,
  ContextualHelp: DatePickerContextualHelp,
});
