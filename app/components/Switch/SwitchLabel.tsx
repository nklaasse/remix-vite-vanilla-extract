import * as React from "react";
import { switchLabel } from "./SwitchLabel.css";

export type SwitchLabelProps = {
  children: React.ReactNode;
};

export function SwitchLabel(props: SwitchLabelProps) {
  const { children } = props;

  return <span className={switchLabel.container}>{children}</span>;
}
