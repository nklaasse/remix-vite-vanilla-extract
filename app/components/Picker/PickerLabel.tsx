import type { FieldLabelProps } from "~/components/Field";
import { Field } from "~/components/Field";
import type { ListBoxLabelProps } from "~/components/ListBox";
import { ListBox } from "~/components/ListBox";
import * as React from "react";
import { PickerContext, useElementType } from "./Picker";

type RootLabelProps = FieldLabelProps;

function RootLabel(props: RootLabelProps) {
  const { children } = props;

  const context = React.useContext(PickerContext);

  const { labelRef } = context.refs;
  const { labelProps } = context.props;

  return (
    <Field.Label {...labelProps} ref={labelRef}>
      {children}
    </Field.Label>
  );
}

type SelectLabelProps = ListBoxLabelProps;

function SelectLabel(props: SelectLabelProps) {
  return <ListBox.Label {...props} />;
}

type PickerLabelProps = RootLabelProps | SelectLabelProps;

/**
 * Picker label is used to render a label, it can be used inside
 * the Picker.Select or Picker itself. In case it's used inside the
 * Picker.Select it will render a ListBox.Label, otherwise it will
 * render a Field.Label.
 */
export function PickerLabel(props: PickerLabelProps) {
  const type = useElementType();

  switch (type) {
    case "root":
      return <RootLabel {...props} />;
    case "select":
      return <SelectLabel {...props} />;
  }
}
