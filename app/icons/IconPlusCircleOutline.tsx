import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconPlusCircleOutlineProps = Omit<BaseProps, "children">;

export function IconPlusCircleOutline(props: IconPlusCircleOutlineProps) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M10 2c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8Zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6Z"
      />
      <path
        fill="currentColor"
        d="M13.5 9H11V6.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V9H6.5a.5.5 0 0 0-.5.5v1c0 .28.22.5.5.5H9v2.5c0 .28.22.5.5.5h1a.5.5 0 0 0 .5-.5V11h2.5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5Z"
      />
    </Base>
  );
}
