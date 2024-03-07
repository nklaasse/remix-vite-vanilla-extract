import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type FlagNLProps = Omit<BaseProps, "children">;

export function FlagNL(props: FlagNLProps) {
  return (
    <Base {...props}>
      <path
        d="M18 15.333a.666.666 0 0 1-.667.667H2.667A.666.666 0 0 1 2 15.333V12h16v3.333Z"
        fill="#21468C"
      />
      <path d="M18 8H2v4h16V8Z" fill="#E6E6E6" />
      <path
        d="M18 8H2V4.667C2 4.298 2.298 4 2.667 4h14.666c.369 0 .667.298.667.667V8Z"
        fill="#AE1C27"
      />
    </Base>
  );
}
