import React from "react";
import type { FieldErrorMessageProps } from "../Field";
import { Field } from "../Field";
import { ComboBoxContext, useElementType } from "./ComboBox";

export type ComboBoxErrorMessageProps = FieldErrorMessageProps;

export function RootComboBoxErrorMessage(props: ComboBoxErrorMessageProps) {
  const { children } = props;

  const context = React.useContext(ComboBoxContext);

  const { errorMessageProps } = context.props;
  const { errorMessageRef } = context.refs;

  return (
    <Field.ErrorMessage {...errorMessageProps} ref={errorMessageRef}>
      {children}
    </Field.ErrorMessage>
  );
}

/**
 * Component that renders the errorMessage for a Picker, this is usually
 * used after the input has been validated.
 */
export function ComboBoxErrorMessage(props: ComboBoxErrorMessageProps) {
  const type = useElementType();

  switch (type) {
    case "root":
      return <RootComboBoxErrorMessage {...props} />;
    default:
      return null;
  }
}
