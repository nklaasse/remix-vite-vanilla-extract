import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type FlagMXProps = Omit<BaseProps, "children">;

export function FlagMX(props: FlagMXProps) {
  return (
    <Base {...props}>
      <path d="M12.667 4.167H7.333v12h5.334v-12Z" fill="#E6E6E6" />
      <path
        d="M18 15.5a.667.667 0 0 1-.667.667h-4.666v-12h4.666c.369 0 .667.298.667.666V15.5Z"
        fill="#D30F25"
      />
      <path
        d="M7.333 16.167H2.667A.667.667 0 0 1 2 15.5V4.833c0-.368.298-.666.667-.666h4.666v12Z"
        fill="#006847"
      />
      <path
        d="M10 8.167a2 2 0 1 0 .001 4.001A2 2 0 0 0 10 8.167Zm0 3.333a1.333 1.333 0 1 1 0-2.667 1.333 1.333 0 0 1 0 2.667Z"
        fill="#6B422E"
      />
    </Base>
  );
}
