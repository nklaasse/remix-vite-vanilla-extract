import { Field } from "~/components/Field";
import * as React from "react";
import type { NumberFieldProps as ReactAriaNumberFieldProps } from "react-aria-components";
import { NumberField as ReactAriaNumberField } from "react-aria-components";
import { NumberFieldErrorMessage } from "./NumberFieldErrorMessage";
import { NumberFieldInput } from "./NumberFieldInput";
import { NumberFieldLabel } from "./NumberFieldLabel";

export type NumberFieldProps = Omit<ReactAriaNumberFieldProps, "children"> & {
  children?: React.ReactNode;
};

export function NumberField(props: NumberFieldProps) {
  const { children } = props;

  return (
    <ReactAriaNumberField {...props}>
      <Field>{children}</Field>
    </ReactAriaNumberField>
  );
}

NumberField.Label = NumberFieldLabel;
NumberField.Input = NumberFieldInput;
NumberField.ErrorMessage = NumberFieldErrorMessage;
