import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconCheckDenseProps = Omit<BaseProps, "children">;

export function IconCheckDense(props: IconCheckDenseProps) {
  return (
    <Base {...props}>
      <path
        d="M14.4 8 13 6.6l-4 4-2-2L5.6 10 9 13.4 14.4 8Z"
        fill="currentColor"
      />
    </Base>
  );
}
