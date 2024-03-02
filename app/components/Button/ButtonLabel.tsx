import { useAlternativeScript } from "~/hooks/useAlternativeScript";
import type { DOMProps } from "~/utils/filterDOMProps";
import { filterDOMProps } from "~/utils/filterDOMProps";
import classnames from "classnames";
import * as React from "react";
import { buttonLabel } from "./ButtonLabel.css";

export type ButtonLabelProps = {
  children: React.ReactNode;
} & DOMProps;

export function ButtonLabel(props: ButtonLabelProps) {
  const { children } = props;

  const script = useAlternativeScript(props);

  return (
    <span
      className={classnames(buttonLabel.container, script)}
      {...filterDOMProps(props)}
    >
      {children}
    </span>
  );
}
