import * as React from "react";
import { fieldsetDescription } from "./FieldsetDescription.css";

export type FieldsetDescriptionProps = {
  children: React.ReactNode;
};

export function FieldsetDescription(props: FieldsetDescriptionProps) {
  const { children } = props;

  return <p className={fieldsetDescription.container}>{children}</p>;
}
