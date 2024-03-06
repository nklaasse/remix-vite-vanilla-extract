import * as React from "react";
import { alertDialogContent } from "./AlertDialogContent.css";

export type AlertDialogContentProps = {
  children: React.ReactNode;
};

/**
 * AlertDialogContent contains all content which is used in the dialog
 */
export function AlertDialogContent(props: AlertDialogContentProps) {
  const { children } = props;

  return <div className={alertDialogContent.container}>{children}</div>;
}
