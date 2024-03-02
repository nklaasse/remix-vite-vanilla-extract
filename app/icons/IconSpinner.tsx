import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconSpinnerProps = Omit<BaseProps, "children">;

export function IconSpinner(props: IconSpinnerProps) {
  return (
    <Base {...props} animation="rotate">
      <path
        opacity=".4"
        d="M10 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8Zm0-14a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z"
        fill="currentColor"
      />
      <path
        d="M18 10h-2a6.006 6.006 0 0 0-6-6V2a8.009 8.009 0 0 1 8 8Z"
        fill="currentColor"
      />
    </Base>
  );
}
