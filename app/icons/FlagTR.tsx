import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type FlagTRProps = Omit<BaseProps, "children">;

export function FlagTR(props: FlagTRProps) {
  return (
    <Base {...props}>
      <path
        d="M18 15.333a.666.666 0 0 1-.667.667H2.667A.666.666 0 0 1 2 15.333V4.667C2 4.298 2.298 4 2.667 4h14.666c.369 0 .667.298.667.667v10.666Z"
        fill="#E40A18"
      />
      <path
        d="M9.333 13.333a3.333 3.333 0 0 1 0-6.666c.419 0 .815.086 1.185.227a4 4 0 1 0 0 6.213c-.37.14-.766.226-1.185.226Z"
        fill="#fff"
      />
      <path
        d="m12.771 9.341-.615-1.334-.616 1.334h-1.403l1.026 1.061-.393 1.591 1.385-.787 1.386.787-.393-1.591 1.025-1.06h-1.402Z"
        fill="#fff"
      />
    </Base>
  );
}
