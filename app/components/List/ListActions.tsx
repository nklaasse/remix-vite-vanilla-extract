import * as React from "react";
import { listActions } from "./ListActions.css";

export type ListActionsProps = {
  children: React.ReactNode;
};

export function ListActions(props: ListActionsProps) {
  const { children } = props;

  return <div className={listActions.container}>{children}</div>;
}
