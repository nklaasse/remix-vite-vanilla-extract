import * as React from "react";
import type {} from "react-aria-components";
import { Separator as ReactAriaSeparator } from "react-aria-components";
import { menuSeparator } from "./MenuSeparator.css";

export function MenuSeparator() {
  return (
    <ReactAriaSeparator
      orientation="horizontal"
      className={menuSeparator.container}
    />
  );
}
