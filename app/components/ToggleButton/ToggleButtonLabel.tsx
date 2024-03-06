import { useAlternativeScript } from "~/hooks/useAlternativeScript";
import type { DOMProps } from "~/utils/filterDOMProps";
import { filterDOMProps } from "~/utils/filterDOMProps";
import classnames from "classnames";
import * as React from "react";
import { toggleButtonLabel } from "./ToggleButtonLabel.css";

export type ToggleButtonLabelProps = {
  children: React.ReactNode;
} & DOMProps;

export function ToggleButtonLabel(props: ToggleButtonLabelProps) {
  const { children } = props;

  const script = useAlternativeScript(props);

  return (
    <span
      className={classnames(toggleButtonLabel.container, script)}
      {...filterDOMProps(props)}
    >
      {children}
    </span>
  );
}
