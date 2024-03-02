import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconMinDenseProps = Omit<BaseProps, "children">;

export function IconMinDense(props: IconMinDenseProps) {
  return (
    <Base {...props}>
      <path d="M14 9H6v2h8V9Z" fill="currentColor" />
    </Base>
  );
}
