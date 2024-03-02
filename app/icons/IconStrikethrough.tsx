import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconStrikethroughProps = Omit<BaseProps, "children">;

export function IconStrikethrough(props: IconStrikethroughProps) {
  return (
    <Base {...props}>
      <path
        d="M11 15.28V13H9v2.28a1 1 0 0 1-.684.948L6 17v1h8v-1l-2.316-.772a1 1 0 0 1-.684-.949ZM11 4h3.382a1 1 0 0 1 .894.553L16 6h1V2H3v4h1l.724-1.447A1 1 0 0 1 5.618 4H9v5h2V4ZM18 11V9H2v2h16Z"
        fill="currentColor"
      />
    </Base>
  );
}
