import React from "react";
import type { FieldErrorMessageProps } from "../Field";
import { Field } from "../Field";
import { DatePickerContext } from "./DatePicker";

export type DatePickerErrorMessageProps = FieldErrorMessageProps;

/**
 * Component that renders the errorMessage for a DatePicker, this is usually
 * used after the input has been validated.
 */
export function DatePickerErrorMessage(props: DatePickerErrorMessageProps) {
  const { children } = props;

  const context = React.useContext(DatePickerContext);

  const { errorMessageProps } = context.props;
  const { errorMessageRef } = context.refs;

  return (
    <Field.ErrorMessage {...errorMessageProps} ref={errorMessageRef}>
      {children}
    </Field.ErrorMessage>
  );
}
