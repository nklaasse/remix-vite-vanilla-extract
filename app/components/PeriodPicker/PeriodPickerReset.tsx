import * as React from "react";
import { mergeProps } from "react-aria";
import type { FieldResetProps } from "../Field";
import { Field } from "../Field";
import { PeriodPickerDateBaseContext } from "./_PeriodPickerDateBase";
import { editableSegment } from "./PeriodPickerInput.css";

export type PeriodPickerResetProps = FieldResetProps;

/**
 * Component that renders a reset button for the PeriodPicker.StartDate or PeriodPicker.EndDate.
 */
export function PeriodPickerReset(props: PeriodPickerResetProps) {
  const context = React.useContext(PeriodPickerDateBaseContext);

  const { fieldRef } = context.refs;

  const onPressEnd = React.useCallback(() => {
    const firstFocusableChild = fieldRef.current?.querySelector(
      `.${editableSegment.container}[tabindex]:not([tabindex="-1"])`
    );

    if (firstFocusableChild instanceof HTMLElement) {
      firstFocusableChild.focus();
    }
  }, [fieldRef]);

  return (
    <Field.Reset
      {...mergeProps(props, {
        onPressEnd,
      })}
    />
  );
}
