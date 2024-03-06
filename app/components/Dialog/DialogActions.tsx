import * as React from "react";
import { dialogActions } from "./DialogActions.css";

export type DialogActionsProps = {
  children: React.ReactNode;
};

export function DialogActions(props: DialogActionsProps) {
  const { children } = props;

  return (
    <div className={dialogActions.container}>
      <div className={dialogActions.actions}>{children}</div>
    </div>
  );
}
