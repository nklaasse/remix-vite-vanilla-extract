import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconUnderlineProps = Omit<BaseProps, "children">;

export function IconUnderline(props: IconUnderlineProps) {
  return (
    <Base {...props}>
      <path
        d="M18 16H2v2h16v-2ZM17 2h-6v1l1.447.724a1 1 0 0 1 .553.894v4.264c0 1.45-.978 2.783-2.402 3.06A3.005 3.005 0 0 1 7 9V4.618a1 1 0 0 1 .553-.894L9 3V2H3v1l1.447.724A1 1 0 0 1 5 4.618v4.159c0 2.61 1.903 4.945 4.5 5.199A5.006 5.006 0 0 0 15 9V4.618a1 1 0 0 1 .553-.894L17 3V2Z"
        fill="currentColor"
      />
    </Base>
  );
}
