import * as React from "react";
import { mergeProps } from "react-aria";
import type { PeriodPickerDateBaseProps } from "./_PeriodPickerDateBase";
import { ElementTypeProvider } from "./_PeriodPickerDateBase";
import { PeriodPickerDateBase } from "./_PeriodPickerDateBase";
import { PeriodPickerContext } from "./PeriodPickerContext";
import { periodPickerStartDate } from "./PeriodPickerStartDate.css";

export type PeriodPickerStartDateProps = Omit<
  PeriodPickerDateBaseProps,
  "locale"
>;

/**
 * Renders DateInput YYYY(-MM) for the start date of the period
 */
export function PeriodPickerStartDate(props: PeriodPickerStartDateProps) {
  const context = React.useContext(PeriodPickerContext);

  const { startFieldProps, locale } = context.props;

  return (
    <ElementTypeProvider type="date">
      <div className={periodPickerStartDate.container}>
        <PeriodPickerDateBase
          {...mergeProps(startFieldProps, props, {
            locale,
          })}
        />
      </div>
    </ElementTypeProvider>
  );
}
