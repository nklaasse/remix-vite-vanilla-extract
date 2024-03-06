import * as React from "react";
import { fieldsetActions } from "./FieldsetActions.css";

export type FieldsetActionsProps = {
  children: React.ReactNode;
};

export function FieldsetActions(props: FieldsetActionsProps) {
  const { children } = props;

  return <div className={fieldsetActions.container}>{children}</div>;
}
