import React from "react";
import type { FieldErrorMessageProps } from "../Field";
import { Field } from "../Field";
import { PeriodPickerDateBaseContext } from "./_PeriodPickerDateBase";

export type PeriodPickerErrorMessageProps = FieldErrorMessageProps;

/**
 * Component that renders the errorMessage for a PeriodPicker.EndDate or PeriodPicker.StartDate field, this is usually
 * used after the input has been validated.
 */
export function PeriodPickerErrorMessage(props: PeriodPickerErrorMessageProps) {
  const { children } = props;

  const context = React.useContext(PeriodPickerDateBaseContext);

  const { errorMessageProps } = context.props;
  const { errorMessageRef } = context.refs;

  return (
    <Field.ErrorMessage {...errorMessageProps} ref={errorMessageRef}>
      {children}
    </Field.ErrorMessage>
  );
}
