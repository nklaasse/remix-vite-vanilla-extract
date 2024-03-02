import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconInfoProps = Omit<BaseProps, "children">;

export function IconInfo(props: IconInfoProps) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M10 2a8 8 0 1 0 8 8 8.024 8.024 0 0 0-8-8Zm0 14a6 6 0 1 1 6-6 6.018 6.018 0 0 1-6 6Z"
      />
      <path
        fill="currentColor"
        d="M10.5 9h-1a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5ZM10 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
      />
    </Base>
  );
}
