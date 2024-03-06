import type { FieldLabelProps } from "~/components/Field";
import { Field } from "~/components/Field";
import * as React from "react";
import { LabelContext, useContextProps } from "react-aria-components";
import { useElementType } from "./TagGroup";
import { selectTagGroupLabel } from "./TagGroupLabel.css";

type RootTagGroupLabelProps = FieldLabelProps;

function RootTagGroupLabel(props: RootTagGroupLabelProps) {
  const { children } = props;

  const ref = React.useRef<HTMLLabelElement>(null);

  const labelProps = useContextProps(props, ref, LabelContext);

  return <Field.Label {...labelProps}>{children}</Field.Label>;
}

type SelectTagGroupLabelProps = {
  children: string;
};

function SelectTagGroupLabel(props: SelectTagGroupLabelProps) {
  const { children } = props;

  return <span className={selectTagGroupLabel.container}>{children}</span>;
}

export type TagGroupLabelProps =
  | RootTagGroupLabelProps
  | SelectTagGroupLabelProps;

export function TagGroupLabel(props: TagGroupLabelProps) {
  const type = useElementType();

  switch (type) {
    case "root":
      return <RootTagGroupLabel {...props} />;
    case "select":
      return <SelectTagGroupLabel {...props} />;
    default:
      return null;
  }
}
