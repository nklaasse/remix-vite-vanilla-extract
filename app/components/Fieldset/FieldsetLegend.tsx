import { useAlternativeScript } from "~/hooks/useAlternativeScript";
import type { DOMProps } from "~/utils/filterDOMProps";
import { filterDOMProps } from "~/utils/filterDOMProps";
import classname from "classnames";
import * as React from "react";
import { fieldsetLegend } from "./FieldsetLegend.css";

export type FieldsetLegendProps = {
  children: React.ReactNode;
} & DOMProps;

export function FieldsetLegend(props: FieldsetLegendProps) {
  const { children } = props;

  const script = useAlternativeScript(props);

  return (
    <legend
      {...filterDOMProps(props)}
      className={classname(fieldsetLegend.container, script)}
    >
      {children}
    </legend>
  );
}
