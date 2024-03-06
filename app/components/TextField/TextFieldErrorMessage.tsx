import React from "react";
import {
  TextContext as ReactAriaTextContext,
  useContextProps,
} from "react-aria-components";
import type { FieldErrorMessageProps } from "../Field";
import { Field } from "../Field";

export type TextFieldErrorMessageProps = FieldErrorMessageProps;

/**
 * Component that renders the errorMessage for a TextField, this is usually
 * used after the input has been validated.
 */
export function TextFieldErrorMessage(props: TextFieldErrorMessageProps) {
  const { children } = props;

  const ref = React.useRef<HTMLDivElement>(null);

  const [textProps, textRef] = useContextProps(
    { children, slot: "errorMessage" },
    ref,
    ReactAriaTextContext
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
