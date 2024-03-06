import React from "react";
import type { FieldErrorMessageProps } from "../Field";
import { Field } from "../Field";
import { TemplateSelectContext } from "./TemplateSelect";

export type TemplateSelectErrorMessageProps = FieldErrorMessageProps;

/**
 * Component that renders the errorMessage for a TemplateSelect, this is usually
 * used after the input has been validated.
 */
export function TemplateSelectErrorMessage(
  props: TemplateSelectErrorMessageProps
) {
  const { children } = props;

  const context = React.useContext(TemplateSelectContext);

  const { errorMessageProps } = context.props;
  const { errorMessageRef } = context.refs;

  return (
    <Field.ErrorMessage {...errorMessageProps} ref={errorMessageRef}>
      {children}
    </Field.ErrorMessage>
  );
}
