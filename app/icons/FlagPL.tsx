import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type FlagPLProps = Omit<BaseProps, "children">;

export function FlagPL(props: FlagPLProps) {
  return (
    <Base {...props}>
      <path
        d="M18 15.333a.666.666 0 0 1-.667.667H2.667A.666.666 0 0 1 2 15.333V10h16v5.333Z"
        fill="#DD153C"
      />
      <path
        d="M18 10H2V4.667C2 4.298 2.298 4 2.667 4h14.666c.369 0 .667.298.667.667V10Z"
        fill="#E6E6E6"
      />
    </Base>
  );
}
