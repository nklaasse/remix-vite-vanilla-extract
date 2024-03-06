import React from "react";
import type { FieldErrorMessageProps } from "../Field";
import { Field } from "../Field";
import { RangeButtonGroupContext } from "./RangeButtonGroup";

export type RangeButtonGroupErrorMessageProps = FieldErrorMessageProps;

/**
 * Component that renders the errorMessage for a RangeButtonGroup, this is usually
 * used after the input has been validated.
 */
export function RangeButtonGroupErrorMessage(
  props: RangeButtonGroupErrorMessageProps
) {
  const { children } = props;

  const context = React.useContext(RangeButtonGroupContext);

  const { errorMessageProps } = context.props;
  const { errorMessageRef } = context.refs;

  return (
    <Field.ErrorMessage {...errorMessageProps} ref={errorMessageRef}>
      {children}
    </Field.ErrorMessage>
  );
}
