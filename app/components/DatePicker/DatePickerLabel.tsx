import type { FieldLabelProps } from "~/components/Field";
import { Field } from "~/components/Field";
import React from "react";
import { DatePickerContext } from "./DatePicker";

export type DatePickerLabelProps = FieldLabelProps;

/**
 * Component that renders the Label for the DatePicker, in case you don't want to
 * use a label, supply the Input element with an aria-label attribute.
 */
export function DatePickerLabel(props: DatePickerLabelProps) {
  const { children } = props;

  const context = React.useContext(DatePickerContext);

  const { labelRef } = context.refs;
  const { labelProps } = context.props;

  return (
    <Field.Label ref={labelRef} {...labelProps}>
      {children}
    </Field.Label>
  );
}
