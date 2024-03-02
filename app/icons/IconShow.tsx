import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconShowProps = Omit<BaseProps, "children">;

export function IconShow(props: IconShowProps) {
  return (
    <Base {...props}>
      <path
        d="M10 16c3.6 0 6.4-3.1 7.6-4.9.5-.7.5-1.6 0-2.3C16.4 7.1 13.6 4 10 4 6.4 4 3.6 7.1 2.4 8.9c-.5.7-.5 1.6 0 2.2 1.2 1.8 4 4.9 7.6 4.9Zm0-9c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3Z"
        fill="currentColor"
      />
    </Base>
  );
}
