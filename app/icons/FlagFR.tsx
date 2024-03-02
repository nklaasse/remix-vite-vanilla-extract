import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type FlagFRProps = Omit<BaseProps, "children">;

export function FlagFR(props: FlagFRProps) {
  return (
    <Base {...props}>
      <path
        d="M7.333 16H2.667A.666.666 0 0 1 2 15.333V4.667C2 4.298 2.298 4 2.667 4h4.666v12Z"
        fill="#01209F"
      />
      <path
        d="M18 15.333a.666.666 0 0 1-.667.667h-4.666V4h4.666c.369 0 .667.298.667.667v10.666Z"
        fill="#EF4234"
      />
      <path d="M12.667 4H7.333v12h5.334V4Z" fill="#E6E6E6" />
    </Base>
  );
}
