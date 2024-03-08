import { parseDate } from "@internationalized/date";
import { Field } from "~/components/Field";
import { IconMinDense } from "~/icons/IconMinDense";
import * as React from "react";
import { useDateRangePicker, useLocale } from "react-aria";
import { useDateRangePickerState } from "react-stately";
import { periodPicker } from "./PeriodPicker.css";
import { PeriodPickerContext } from "./PeriodPickerContext";
import { PeriodPickerContextualHelp } from "./PeriodPickerContextualHelp";
import { PeriodPickerCurrent } from "./PeriodPickerCurrent";
import { PeriodPickerEndDate } from "./PeriodPickerEndDate";
import { PeriodPickerErrorMessage } from "./PeriodPickerErrorMessage";
import { PeriodPickerInput } from "./PeriodPickerInput";
import { PeriodPickerLabel } from "./PeriodPickerLabel";
import { PeriodPickerReset } from "./PeriodPickerReset";
import { PeriodPickerStartDate } from "./PeriodPickerStartDate";

export type PeriodPickerProps = {
  /**
   * The error message to render
   */
  errorMessage?: React.ReactNode;
  /**
   * A PeriodPicker.StartDate, PeriodPicker.EndDate and PeriodPicker.Current component
   */
  children: React.ReactNode;
  /**
   * The locale to display and edit the value according to.
   */
  locale?: string;
};

export function PeriodPicker(props: PeriodPickerProps) {
  const { locale: defaultLocale } = useLocale();

  const { errorMessage, children, locale = defaultLocale } = props;

  const [endDateIsCurrent, setEndDateIsCurrent] = React.useState<string | null>(
    null
  );

  /**
   * Get the min and maxValue for the period select
   */
  const minValue = parseDate("1960-01-01");
  const maxValue = parseDate("2030-12-31");

  /**
   * Get the state manegement for both the date pickers (start / end)
   */
  const state = useDateRangePickerState({
    ...props,
    maxValue,
    minValue,
    // @ts-expect-error: React stately accepts null values but is typed incorrectly
    granularity: "month",
  });
  const ref = React.useRef<HTMLDivElement>(null);
  const { groupProps, startFieldProps, endFieldProps, errorMessageProps } =
    useDateRangePicker(
      {
        ...props,
        minValue,
        maxValue,
        // @ts-expect-error: React aria accepts null values but is typed incorrectly
        granularity: "month",
      },
      state,
      ref
    );

  return (
    <PeriodPickerContext.Provider
      value={{
        props: { startFieldProps, endFieldProps, locale },
        state: { setEndDateIsCurrent, endDateIsCurrent },
      }}
    >
      <Field>
        <Field.Input>
          <div {...groupProps} className={periodPicker.container} ref={ref}>
            {children}
            <div className={periodPicker.delimiter}>
              <IconMinDense aria-hidden />
            </div>
          </div>
        </Field.Input>
        <Field.ErrorMessage {...errorMessageProps}>
          {errorMessage}
        </Field.ErrorMessage>
      </Field>
    </PeriodPickerContext.Provider>
  );
}

PeriodPicker.EndDate = PeriodPickerEndDate;
PeriodPicker.StartDate = PeriodPickerStartDate;
PeriodPicker.Current = PeriodPickerCurrent;
PeriodPicker.Label = PeriodPickerLabel;
PeriodPicker.ErrorMessage = PeriodPickerErrorMessage;
PeriodPicker.Reset = PeriodPickerReset;
PeriodPicker.ContextualHelp = PeriodPickerContextualHelp;
PeriodPicker.Input = PeriodPickerInput;
