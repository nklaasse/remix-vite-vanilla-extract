import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type FlagNOProps = Omit<BaseProps, "children">;

export function FlagNO(props: FlagNOProps) {
  return (
    <Base {...props}>
      <path
        d="M18 15.333a.666.666 0 0 1-.667.667H2.667A.666.666 0 0 1 2 15.333V4.667C2 4.298 2.298 4 2.667 4h14.666c.369 0 .667.298.667.667v10.666Z"
        fill="#EF2B2D"
      />
      <path
        d="M5.333 8H2v.667h4V4h-.667v4ZM2 12h3.333v4H6v-4.667H2V12ZM9.333 8V4h-.666v4.667H18V8H9.333ZM8.667 12v4h.666v-4H18v-.667H8.667V12Z"
        fill="#fff"
      />
      <path
        d="M18 8.667H8.667V4H6v4.667H2v2.666h4V16h2.667v-4.667H18V8.667Z"
        fill="#003680"
      />
    </Base>
  );
}
