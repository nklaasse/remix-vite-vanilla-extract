import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type FlagGRProps = Omit<BaseProps, "children">;

export function FlagGR(props: FlagGRProps) {
  return (
    <Base {...props}>
      <path
        fill="#010080"
        d="M18 15.33c0 .37-.3.67-.67.67H2.67a.67.67 0 0 1-.67-.67V4.67c0-.37.3-.67.67-.67h14.66c.37 0 .67.3.67.67v10.66Z"
      />
      <path
        fill="#E6E6E6"
        d="M18 5.33H8.67v1.34H18V5.33ZM18 8H8.67v1.33H18V8Z"
      />
      <path
        fill="#E6E6E6"
        d="M6 6.67V4H4.67v2.67H2V8h2.67v2.67H2V12h16v-1.33H6V8h2.67V6.67H6ZM18 13.33H2v1.34h16v-1.34Z"
      />
    </Base>
  );
}
