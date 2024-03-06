import * as React from "react";
import { dialogContent } from "./DialogContent.css";

export type DialogContentProps = {
  children: React.ReactNode;
};

/**
 * DialogContent contains all content which is used in the dialog
 */
export function DialogContent(props: DialogContentProps) {
  const { children } = props;

  return <div className={dialogContent.container}>{children}</div>;
}
