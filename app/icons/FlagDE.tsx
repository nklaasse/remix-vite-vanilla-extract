import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type FlagDEProps = Omit<BaseProps, "children">;

export function FlagDE(props: FlagDEProps) {
  return (
    <Base {...props}>
      <path
        d="M18 8H2V4.667C2 4.298 2.298 4 2.667 4h14.666c.369 0 .667.298.667.667V8Z"
        fill="#000"
      />
      <path d="M18 8H2v4h16V8Z" fill="#E00" />
      <path
        d="M18 15.333a.666.666 0 0 1-.667.667H2.667A.666.666 0 0 1 2 15.333V12h16v3.333Z"
        fill="#FDCF00"
      />
    </Base>
  );
}
