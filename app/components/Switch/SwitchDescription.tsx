import * as React from "react";
import { switchDescription } from "./SwitchDescription.css";

export type SwitchDescriptionProps = {
  children: React.ReactNode;
};

export function SwitchDescription(props: SwitchDescriptionProps) {
  const { children } = props;

  return <span className={switchDescription.container}>{children}</span>;
}
