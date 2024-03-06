import { useAlternativeScript } from "~/hooks/useAlternativeScript";
import type { DOMProps } from "~/utils/filterDOMProps";
import { filterDOMProps } from "~/utils/filterDOMProps";
import classnames from "classnames";
import * as React from "react";
import { fieldValueLabel } from "./FieldValueLabel.css";

export type FieldValueLabelProps = {
  /**
   * The content to display as the label.
   */
  children: React.ReactNode;
} & DOMProps;

/**
 * FieldValueLabel can be optionally used to display the selected value in
 * a range select.
 */
export function FieldValueLabel(props: FieldValueLabelProps) {
  const { children } = props;

  const script = useAlternativeScript(props);

  return (
    <span
      className={classnames(fieldValueLabel.container, script)}
      {...filterDOMProps(props)}
    >
      {children}
    </span>
  );
}
