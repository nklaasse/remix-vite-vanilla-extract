import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconArchiveProps = Omit<BaseProps, "children">;

export function IconArchive(props: IconArchiveProps) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M17 2H3c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Zm-1 2v9h-3c-.6 0-1 .4-1 1v1H8v-1c0-.6-.4-1-1-1H4V4h12Z"
      />
      <path fill="currentColor" d="M14 6H6v2h8V6ZM14 9H6v2h8V9Z" />
    </Base>
  );
}
