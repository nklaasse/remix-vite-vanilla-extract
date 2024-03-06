import React from "react";
import type { FieldErrorMessageProps } from "../Field";
import { Field } from "../Field";
import { SwatchesContext } from "./Swatches";

export type SwatchesErrorMessageProps = FieldErrorMessageProps;

/**
 * Component that renders the errorMessage for a Swatches, this is usually
 * used after the input has been validated.
 */
export function SwatchesErrorMessage(props: SwatchesErrorMessageProps) {
  const { children } = props;

  const context = React.useContext(SwatchesContext);

  const { errorMessageProps } = context.props;
  const { errorMessageRef } = context.refs;

  return (
    <Field.ErrorMessage {...errorMessageProps} ref={errorMessageRef}>
      {children}
    </Field.ErrorMessage>
  );
}
