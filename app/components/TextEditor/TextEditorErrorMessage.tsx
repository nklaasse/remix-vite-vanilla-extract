import React from "react";
import type { FieldErrorMessageProps } from "../Field";
import { Field } from "../Field";
import { TextEditorContext } from "./TextEditor";

export type TextEditorErrorMessageProps = FieldErrorMessageProps;

/**
 * Component that renders the errorMessage for a TextEditor, this is usually
 * used after the input has been validated.
 */
export function TextEditorErrorMessage(props: TextEditorErrorMessageProps) {
  const { children } = props;

  const context = React.useContext(TextEditorContext);

  const { errorMessageProps } = context.props;
  const { errorMessageRef } = context.refs;

  return (
    <Field.ErrorMessage {...errorMessageProps} ref={errorMessageRef}>
      {children}
    </Field.ErrorMessage>
  );
}
