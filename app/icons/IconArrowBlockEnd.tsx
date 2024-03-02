import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconArrowBlockEndProps = Omit<BaseProps, "children">;

export function IconArrowBlockEnd(props: IconArrowBlockEndProps) {
  return (
    <Base {...props}>
      <path
        d="M15.707 11.293a1 1 0 0 0-1.414 0L11 14.586V3a1 1 0 0 0-2 0v11.586l-3.293-3.293a1 1 0 0 0-1.414 1.414l5 5a1 1 0 0 0 1.414 0l5-5a1 1 0 0 0 0-1.414Z"
        fill="currentColor"
      />
    </Base>
  );
}
