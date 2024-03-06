import * as React from "react";
import { formGroup } from "./FormGroup.css";

export type FormGroupProps = {
  /**
   * Any valid React children
   */
  children: React.ReactNode;
};

/**
 * Wrap multiple inputs which are displayed vertically on mobile and horizontally on desktop
 */
export function FormGroup(props: FormGroupProps) {
  const { children } = props;

  return <div className={formGroup.container}>{children}</div>;
}
