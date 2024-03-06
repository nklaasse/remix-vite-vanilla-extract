import * as React from "react";
import { fieldsetFields } from "./FieldsetFields.css";

export type FieldsetFieldsProps = {
  children: React.ReactNode;
};

export function FieldsetFields(props: FieldsetFieldsProps) {
  const { children } = props;

  return <div className={fieldsetFields.container}>{children}</div>;
}
