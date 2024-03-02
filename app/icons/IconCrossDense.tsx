import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconCrossDenseProps = Omit<BaseProps, "children">;

export function IconCrossDense(props: IconCrossDenseProps) {
  return (
    <Base {...props}>
      <path
        d="M12.1 6.5 10 8.6 7.9 6.5 6.5 7.9 8.6 10l-2.1 2.1 1.4 1.4 2.1-2.1 2.1 2.1 1.4-1.4-2.1-2.1 2.1-2.1-1.4-1.4Z"
        fill="currentColor"
      />
    </Base>
  );
}
