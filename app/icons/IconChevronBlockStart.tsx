import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconChevronBlockStartProps = Omit<BaseProps, "children">;

export function IconChevronBlockStart(props: IconChevronBlockStartProps) {
  return (
    <Base {...props}>
      <path
        d="M14 13a1 1 0 0 1-.707-.293L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4A1 1 0 0 1 14 13Z"
        fill="currentColor"
      />
    </Base>
  );
}
