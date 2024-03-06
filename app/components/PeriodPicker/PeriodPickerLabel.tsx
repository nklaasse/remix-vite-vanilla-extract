import React from "react";
import type { FieldLabelProps } from "../Field";
import { Field } from "../Field";
import type { TextFieldLabelProps } from "../TextField";
import { TextField } from "../TextField";
import {
  PeriodPickerDateBaseContext,
  useElementType,
} from "./_PeriodPickerDateBase";

export type PeriodPickerDateLabelProps = FieldLabelProps;

/**
 * Component that renders the Label for the for a PeriodPicker.EndDate or PeriodPicker.StartDate field,
 * in case you don't want to use a label, provide the PeriodPicker.EndDate or PeriodPicker.StartDate element
 * with an aria-label attribute.
 */
export function PeriodPickerDateLabel(props: PeriodPickerDateLabelProps) {
  const { children } = props;

  const context = React.useContext(PeriodPickerDateBaseContext);

  const { labelRef } = context.refs;
  const { labelProps } = context.props;

  return (
    <Field.Label ref={labelRef} {...labelProps}>
      {children}
    </Field.Label>
  );
}

type PeriodPickerPresentLabelProps = TextFieldLabelProps;

export function PeriodPickerPresentLabel(props: PeriodPickerPresentLabelProps) {
  const { children } = props;

  return <TextField.Label>{children}</TextField.Label>;
}

type PeriodPickerInputProps =
  | PeriodPickerDateLabelProps
  | PeriodPickerPresentLabelProps;

export function PeriodPickerLabel(props: PeriodPickerInputProps) {
  const type = useElementType();

  switch (type) {
    case "date":
      return <PeriodPickerDateLabel {...props} />;
    case "present":
      return <PeriodPickerPresentLabel {...props} />;
  }
}
