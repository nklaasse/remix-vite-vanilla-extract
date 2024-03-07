import * as React from "react";
import { mergeProps } from "react-aria";
import { TextField } from "../TextField";
import type { PeriodPickerDateBaseProps } from "./_PeriodPickerDateBase";
import {
  ElementTypeProvider,
  PeriodPickerDateBase,
} from "./_PeriodPickerDateBase";
import { PeriodPickerContext } from "./PeriodPickerContext";
import { periodPickerEndDate } from "./PeriodPickerEndDate.css";

export type PeriodPickerEndDateProps = Omit<
  PeriodPickerDateBaseProps,
  "locale"
> & {
  children: React.ReactNode;
};

/**
 * Renders DateInput YYYY(-MM) for the end date of the period, in case the period doesn't end
 * it does render a placeholder with the value of PeriodPicker.Switch
 */
export function PeriodPickerEndDate(props: PeriodPickerEndDateProps) {
  const { children } = props;

  const context = React.useContext(PeriodPickerContext);

  const { endFieldProps, locale } = context.props;
  const { endDateIsCurrent } = context.state;

  return (
    <div className={periodPickerEndDate.container}>
      {endDateIsCurrent != null ? (
        <ElementTypeProvider type="present">
          <TextField value={endDateIsCurrent} isReadOnly>
            {children}
          </TextField>
        </ElementTypeProvider>
      ) : (
        <ElementTypeProvider type="date">
          <PeriodPickerDateBase
            {...mergeProps(endFieldProps, props, {
              locale,
            })}
          >
            {children}
          </PeriodPickerDateBase>
        </ElementTypeProvider>
      )}
    </div>
  );
}
