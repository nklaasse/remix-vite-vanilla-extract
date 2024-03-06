import type { FieldLabelProps } from "~/components/Field";
import { Field } from "~/components/Field";
import type { ListBoxLabelProps } from "~/components/ListBox";
import { ListBox } from "~/components/ListBox";
import * as React from "react";
import type { TextFieldLabelProps } from "../TextField";
import { TextField } from "../TextField";
import { ComboBoxContext, useElementType } from "./ComboBox";

type RootLabelProps = Pick<FieldLabelProps, "children">;

function RootLabel(props: RootLabelProps) {
  const { children } = props;

  const context = React.useContext(ComboBoxContext);

  const { labelRef } = context.refs;
  const { labelProps } = context.props;

  return (
    <Field.Label {...labelProps} ref={labelRef}>
      {children}
    </Field.Label>
  );
}

type SelectLabelProps = Pick<ListBoxLabelProps, "children" | "UNSAFE_style">;

function SelectLabel(props: SelectLabelProps) {
  const { children } = props;

  return <ListBox.Label>{children}</ListBox.Label>;
}

type InputLabelProps = Pick<TextFieldLabelProps, "children">;

function InputLabel(props: InputLabelProps) {
  const { children } = props;

  return <TextField.Label>{children}</TextField.Label>;
}

export type ComboBoxLabelProps = RootLabelProps | SelectLabelProps;

/**
 * ComboBox label is used to render a label, it can be used inside
 * the ComboBox.Select or ComboBox itself. In case it's used inside the
 * ComboBox.Select it will render a ListBox.Label, otherwise it will
 * render a Field.Label.
 */
export function ComboBoxLabel(props: ComboBoxLabelProps) {
  const { children } = props;

  const type = useElementType();

  switch (type) {
    case "root":
      return <RootLabel>{children}</RootLabel>;
    case "select":
      return <SelectLabel>{children}</SelectLabel>;
    case "input":
      return <InputLabel>{children}</InputLabel>;
  }
}
