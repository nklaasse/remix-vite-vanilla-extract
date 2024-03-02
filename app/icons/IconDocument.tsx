import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconDocumentProps = Omit<BaseProps, "children">;

export function IconDocument(props: IconDocumentProps) {
  return (
    <Base {...props}>
      <path
        d="M16 2H4c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h8l5-5V3c0-.6-.4-1-1-1ZM5 4h10v8h-4v4H5V4Z"
        fill="currentColor"
      />
    </Base>
  );
}
