import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconDuplicateProps = Omit<BaseProps, "children">;

export function IconDuplicate(props: IconDuplicateProps) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M12 6H4c-.6 0-1 .4-1 1v10c0 .6.4 1 1 1h8c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1Z"
      />
      <path fill="currentColor" d="M16 2H6v2h9v11h2V3c0-.6-.4-1-1-1Z" />
    </Base>
  );
}
