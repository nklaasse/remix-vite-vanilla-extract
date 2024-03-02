import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconCheckCircleSolidProps = Omit<BaseProps, "children">;

export function IconCheckCircleSolid(props: IconCheckCircleSolidProps) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M10 2c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8Zm3.7 6.7-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 1 1 1.4-1.4L9 10.58l3.3-3.3a1 1 0 1 1 1.4 1.42Z"
      />
    </Base>
  );
}
