import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type FlagIDProps = Omit<BaseProps, "children">;

export function FlagID(props: FlagIDProps) {
  return (
    <Base {...props}>
      <path
        fill="#E6E6E6"
        d="M18 15.33c0 .37-.3.67-.67.67H2.67a.67.67 0 0 1-.67-.67V10h16v5.33Z"
      />
      <path
        fill="#CC162C"
        d="M18 10H2V4.67c0-.37.3-.67.67-.67h14.66c.37 0 .67.3.67.67V10Z"
      />
    </Base>
  );
}
