import * as React from "react";
import { filterDOMProps } from "../../utils/filterDOMProps";
import { fieldset } from "./Fieldset.css";
import { FieldsetActions } from "./FieldsetActions";
import { FieldsetDescription } from "./FieldsetDescription";
import { FieldsetFields } from "./FieldsetFields";
import { FieldsetLegend } from "./FieldsetLegend";

export type FieldsetProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export function Fieldset(props: FieldsetProps) {
  const { children } = props;

  return (
    <fieldset {...filterDOMProps(props)} className={fieldset.container}>
      <div className={fieldset.content}>{children}</div>
    </fieldset>
  );
}

Fieldset.Actions = FieldsetActions;
Fieldset.Description = FieldsetDescription;
Fieldset.Fields = FieldsetFields;
Fieldset.Legend = FieldsetLegend;
