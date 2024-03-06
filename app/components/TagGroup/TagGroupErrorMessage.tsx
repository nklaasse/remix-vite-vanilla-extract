import React from "react";
import { TextContext, useContextProps } from "react-aria-components";
import type { FieldErrorMessageProps } from "../Field";
import { Field } from "../Field";

export type TagGroupErrorMessageProps = FieldErrorMessageProps;

/**
 * Component that renders the errorMessage for a ErrorMessage, this is usually
 * used after the input has been validated.
 */
export function TagGroupErrorMessage(props: TagGroupErrorMessageProps) {
  const { children } = props;

  const ref = React.useRef<HTMLDivElement>(null);

  const textProps = useContextProps(
    { children, slot: "errorMessage" },
    ref,
    TextContext
  );

  return (
    <Field.ErrorMessage {...textProps} ref={ref}>
      {children}
    </Field.ErrorMessage>
  );
}
