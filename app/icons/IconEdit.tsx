import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconEditProps = Omit<BaseProps, "children">;

export function IconEdit(props: IconEditProps) {
  return (
    <Base {...props}>
      <Base.LeftToRight>
        <path
          d="m10.1 5.5-7.8 7.8c-.2.2-.3.4-.3.7v3c0 .6.4 1 1 1h3c.3 0 .5-.1.7-.3l7.8-7.8-4.4-4.4ZM17.7 5.3l-3-3c-.4-.4-1-.4-1.4 0l-1.8 1.8 4.4 4.4 1.8-1.8c.4-.4.4-1 0-1.4Z"
          fill="currentColor"
        />
      </Base.LeftToRight>
      <Base.RightToLeft>
        <path
          d="m9.9 5.5 7.8 7.8c.2.2.3.4.3.7v3c0 .6-.4 1-1 1h-3c-.3 0-.5-.1-.7-.3L5.5 9.9l4.4-4.4ZM2.3 5.3l3-3c.4-.4 1-.4 1.4 0l1.8 1.8-4.4 4.4-1.8-1.8c-.4-.4-.4-1 0-1.4Z"
          fill="currentColor"
        />
      </Base.RightToLeft>
    </Base>
  );
}
