import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconUnlinkProps = Omit<BaseProps, "children">;

export function IconUnlink(props: IconUnlinkProps) {
  return (
    <Base {...props}>
      <path
        d="m15.4 11.7 1.2-1.2C17.5 9.6 18 8.3 18 7c0-1.3-.5-2.6-1.5-3.5-.9-1-2.2-1.5-3.5-1.5-1.3 0-2.6.5-3.5 1.5L8.3 4.6c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0l1.2-1.2c1.1-1.1 3.1-1.1 4.2 0 .6.6.9 1.4.9 2.2 0 .8-.3 1.6-.9 2.1L14 10.3c-.4.4-.4 1 0 1.4.2.2.5.3.7.3.2 0 .5-.1.7-.3ZM10.3 14l-1.2 1.2c-1.1 1.1-3.1 1.1-4.2 0-.6-.6-.9-1.4-.9-2.2 0-.8.3-1.6.9-2.1L6 9.7c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L3.5 9.5C2.5 10.4 2 11.7 2 13c0 1.3.5 2.6 1.5 3.5.9 1 2.2 1.5 3.5 1.5 1.3 0 2.6-.5 3.5-1.5l1.2-1.2c.4-.4.4-1 0-1.4-.4-.4-1-.3-1.4.1Z"
        fill="currentColor"
      />
      <path
        d="m11.4 7.2-4.2 4.2c-.4.4-.4 1 0 1.4.2.2.5.3.7.3.2 0 .5-.1.7-.3l4.2-4.2c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0ZM4.3 5.7c.2.2.4.3.7.3.3 0 .5-.1.7-.3.4-.4.4-1 0-1.4l-2-2c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l2 2ZM15.7 14.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l2 2c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4l-2-2Z"
        fill="currentColor"
      />
    </Base>
  );
}