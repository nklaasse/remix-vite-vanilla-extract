import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type FlagBGProps = Omit<BaseProps, "children">;

export function FlagBG(props: FlagBGProps) {
  return (
    <Base {...props}>
      <path
        fill="#E6E6E6"
        d="M18 8H2V4.67c0-.37.3-.67.67-.67h14.66c.37 0 .67.3.67.67V8Z"
      />
      <path fill="#00976E" d="M18 8H2v4h16V8Z" />
      <path
        fill="#D72612"
        d="M18 15.33c0 .37-.3.67-.67.67H2.67a.67.67 0 0 1-.67-.67V12h16v3.33Z"
      />
    </Base>
  );
}
