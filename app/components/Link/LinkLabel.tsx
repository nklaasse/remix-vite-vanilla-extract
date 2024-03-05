import * as React from "react";
import { linkLabel } from "./LinkLabel.css";

export type LinkLabelProps = {
  children: React.ReactNode;
};

export function LinkLabel(props: LinkLabelProps) {
  const { children } = props;

  return <span className={linkLabel.container}>{children}</span>;
}
