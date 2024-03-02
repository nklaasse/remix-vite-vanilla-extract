import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconRenameProps = Omit<BaseProps, "children">;

export function IconRename(props: IconRenameProps) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M17 16c-1.103 0-2-.897-2-2h1c.552 0 1-.448 1-1s-.448-1-1-1h-1V6c0-1.103.897-2 2-2 .552 0 1-.448 1-1s-.448-1-1-1c-1.2 0-2.266.542-3 1.382C13.266 2.542 12.2 2 11 2c-.552 0-1 .448-1 1s.448 1 1 1c1.103 0 2 .897 2 2v6h-1c-.552 0-1 .448-1 1s.448 1 1 1h1c0 1.103-.897 2-2 2-.552 0-1 .448-1 1s.448 1 1 1c1.2 0 2.266-.542 3-1.382.734.84 1.8 1.382 3 1.382.552 0 1-.448 1-1s-.448-1-1-1Z"
      />
      <path
        fill="currentColor"
        d="M8 12H4V8h6c.552 0 1-.448 1-1s-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h5c.552 0 1-.448 1-1s-.448-1-1-1Z"
      />
    </Base>
  );
}
