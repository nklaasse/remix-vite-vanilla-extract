import React from "react";
import type { FieldErrorMessageProps } from "../Field";
import { Field } from "../Field";
import { PickerContext } from "./Picker";

export type PickerErrorMessageProps = FieldErrorMessageProps;

/**
 * Component that renders the errorMessage for a Picker, this is usually
 * used after the input has been validated.
 */
export function PickerErrorMessage(props: PickerErrorMessageProps) {
  const { children } = props;

  const context = React.useContext(PickerContext);

  const { errorMessageProps } = context.props;
  const { errorMessageRef } = context.refs;

  return (
    <Field.ErrorMessage {...errorMessageProps} ref={errorMessageRef}>
      {children}
    </Field.ErrorMessage>
  );
}
