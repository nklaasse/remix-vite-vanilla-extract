import { filterDOMProps } from "~/utils/filterDOMProps";
import * as React from "react";
import { form } from "./Form.css";
import { FormActions } from "./FormActions";
import { FormGroup } from "./FormGroup";
import { FormReset } from "./FormReset";
import { FormSubmit } from "./FormSubmit";

export type FormProps = {
  /**
   * Any valid React children
   */
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

/**
 * The Form component is used to display forms on the page. This doesn't render the
 * Form component itself due to it also being used to render small part's of forms
 */
export function Form(props: FormProps) {
  const { children } = props;

  return (
    <div {...filterDOMProps(props)} className={form.container}>
      {children}
    </div>
  );
}

Form.Group = FormGroup;
Form.Actions = FormActions;
Form.Reset = FormReset;
Form.Submit = FormSubmit;
