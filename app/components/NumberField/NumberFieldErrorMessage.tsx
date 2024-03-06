import React from "react";
import { TextContext, useContextProps } from "react-aria-components";
import type { FieldErrorMessageProps } from "../Field";
import { Field } from "../Field";

export type NumberFieldErrorMessageProps = FieldErrorMessageProps;

/**
 * Component that renders the errorMessage for a NumberField, this is usually
 * used after the input has been validated.
 */
export function NumberFieldErrorMessage(props: NumberFieldErrorMessageProps) {
  const { children } = props;

  const ref = React.useRef<HTMLDivElement>(null);

  const [textProps, textRef] = useContextProps(
    { children, slot: "errorMessage" },
    ref,
    TextContext
  );

  return (
    <Field.ErrorMessage
      {...textProps}
      ref={textRef as React.RefObject<HTMLDivElement>}
    >
      {children}
    </Field.ErrorMessage>
  );
}
