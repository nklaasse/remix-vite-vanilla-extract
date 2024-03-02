import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconDeleteProps = Omit<BaseProps, "children">;

export function IconDelete(props: IconDeleteProps) {
  return (
    <Base {...props}>
      <path
        d="M4 8v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8H4ZM14 5V3c0-.6-.4-1-1-1H7c-.6 0-1 .4-1 1v2H2v2h16V5h-4Zm-2 0H8V4h4v1Z"
        fill="currentColor"
      />
    </Base>
  );
}
