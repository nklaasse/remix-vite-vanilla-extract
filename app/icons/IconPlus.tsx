import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconPlusProps = Omit<BaseProps, "children">;

export function IconPlus(props: IconPlusProps) {
  return (
    <Base {...props}>
      <path
        d="M17 9h-6V3c0-.6-.4-1-1-1s-1 .4-1 1v6H3c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1v-6h6c.6 0 1-.4 1-1s-.4-1-1-1Z"
        fill="currentColor"
      />
    </Base>
  );
}
