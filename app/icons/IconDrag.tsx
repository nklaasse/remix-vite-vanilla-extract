import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconDragProps = Omit<BaseProps, "children">;

export function IconDrag(props: IconDragProps) {
  return (
    <Base {...props}>
      <path
        d="M15 10a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM15 16a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM15 4a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM9 10a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM9 16a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM9 4a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"
        fill="currentColor"
      />
    </Base>
  );
}
