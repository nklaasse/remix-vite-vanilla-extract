import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconImageProps = Omit<BaseProps, "children">;

export function IconImage(props: IconImageProps) {
  return (
    <Base {...props}>
      <path
        d="M17 3H3c-.6 0-1 .4-1 1v12c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V4c0-.6-.4-1-1-1ZM8 6c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1Zm-4 8 2-4 3 2 3-4 4 6H4Z"
        fill="currentColor"
      />
    </Base>
  );
}
