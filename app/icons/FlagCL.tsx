import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type FlagCLProps = Omit<BaseProps, "children">;

export function FlagCL(props: FlagCLProps) {
  return (
    <Base {...props}>
      <path
        d="M18 15.333a.666.666 0 0 1-.667.667H2.667A.666.666 0 0 1 2 15.333V10h16v5.333Z"
        fill="#D52A20"
      />
      <path d="M8 10H2V4.667C2 4.298 2.298 4 2.667 4H8v6Z" fill="#003AB5" />
      <path
        d="M6.395 6.538h-.983L5 5.643l-.413.895h-.982l.718.742-.266 1.077L5 7.822l.943.535-.266-1.077.718-.742Z"
        fill="#fff"
      />
      <path d="M18 10H8V4h9.333c.369 0 .667.298.667.667V10Z" fill="#E6E6E6" />
    </Base>
  );
}
