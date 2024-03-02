import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconWarningProps = Omit<BaseProps, "children">;

export function IconWarning(props: IconWarningProps) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 14a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z"
      />
      <path
        fill="currentColor"
        d="M10.5 6h-1a.5.5 0 0 0-.5.5v4c0 .28.22.5.5.5h1a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5ZM10 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
      />
    </Base>
  );
}
