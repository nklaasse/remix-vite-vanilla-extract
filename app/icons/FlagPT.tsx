import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type FlagPTProps = Omit<BaseProps, "children">;

export function FlagPT(props: FlagPTProps) {
  return (
    <Base {...props}>
      <path
        d="M8 16H2.667A.666.666 0 0 1 2 15.333V4.667C2 4.298 2.298 4 2.667 4H8v12Z"
        fill="#060"
      />
      <path
        d="M18 15.333a.666.666 0 0 1-.667.667H8V4h9.333c.369 0 .667.298.667.667v10.666Z"
        fill="#FE0000"
      />
      <path d="M8 11.333a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill="#FAFB00" />
    </Base>
  );
}
