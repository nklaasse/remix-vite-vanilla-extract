import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconCheckCircleProps = Omit<BaseProps, "children">;

export function IconCheckCircle(props: IconCheckCircleProps) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M7.7 9.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l2 2c.2.2.4.3.7.3.3 0 .5-.1.7-.3l7-7c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L9 10.6 7.7 9.3Z"
      />

      <path
        fill="currentColor"
        d="M9 18c3.9 0 7-3.1 7-7 0-.6-.4-1-1-1s-1 .4-1 1c0 2.8-2.2 5-5 5s-5-2.2-5-5 2.2-5 5-5c.6 0 1.1.1 1.7.3.5.2 1.1-.1 1.3-.6.2-.5-.1-1.1-.6-1.3C10.6 4.1 9.8 4 9 4c-3.9 0-7 3.1-7 7s3.1 7 7 7Z"
      />
    </Base>
  );
}
