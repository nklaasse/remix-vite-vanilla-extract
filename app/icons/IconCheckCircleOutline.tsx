import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconCheckCircleOutlineProps = Omit<BaseProps, "children">;

export function IconCheckCircleOutline(props: IconCheckCircleOutlineProps) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M10 2a8 8 0 0 0 0 16 8 8 0 0 0 0-16Zm0 14a6 6 0 1 1 .01-12.01A6 6 0 0 1 10 16Z"
      />
      <path
        fill="currentColor"
        d="M9 13a1 1 0 0 1-.7-.3l-2-2a1 1 0 1 1 1.4-1.4L9 10.58l3.3-3.3a1 1 0 1 1 1.4 1.42l-4 4A1 1 0 0 1 9 13Z"
      />
    </Base>
  );
}
