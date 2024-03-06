import React from "react";
import { alertDialogActions } from "./AlertDialogActions.css";

export type AlertDialogActionsProps = {
  /**
   * AlertDialogCancel and AlertDialogConfirm components
   */
  children: React.ReactNode;
};

/**
 * AlertDialogActions is used to place the actions the user can take
 */
export function AlertDialogActions(props: AlertDialogActionsProps) {
  const { children } = props;

  return <div className={alertDialogActions.container}>{children}</div>;
}
