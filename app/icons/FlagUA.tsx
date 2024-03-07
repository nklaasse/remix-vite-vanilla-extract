import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type FlagUAProps = Omit<BaseProps, "children">;

export function FlagUA(props: FlagUAProps) {
  return (
    <Base {...props}>
      <path
        d="M18 10H2V4.667C2 4.298 2.298 4 2.667 4h14.666c.369 0 .667.298.667.667V10Z"
        fill="#3A75C3"
      />
      <path
        d="M18 15.333a.666.666 0 0 1-.667.667H2.667A.666.666 0 0 1 2 15.333V10h16v5.333Z"
        fill="#F9DD17"
      />
    </Base>
  );
}
