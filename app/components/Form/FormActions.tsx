import * as React from "react";
import { formActions } from "./FormActions.css";

export type FormActionsProps = {
  /**
   * A <Form.Save /> and optional <Form.Reset component />
   */
  children: React.ReactNode;
};

/**
 * FormActions is a component which is used to add the Reset / Submit
 * buttons to the bottom of the form.
 */
export function FormActions(props: FormActionsProps) {
  const { children } = props;

  return <div className={formActions.container}>{children}</div>;
}
