import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type FlagARProps = Omit<BaseProps, "children">;

export function FlagAR(props: FlagARProps) {
  return (
    <Base {...props}>
      <path
        d="M18 8H2V4.667C2 4.298 2.298 4 2.667 4h14.666c.369 0 .667.298.667.667V8Z"
        fill="#7FA9CF"
      />
      <path d="M18 8H2v4h16V8Z" fill="#E6E6E6" />
      <path
        d="M18 15.333a.666.666 0 0 1-.667.667H2.667A.666.666 0 0 1 2 15.333V12h16v3.333Z"
        fill="#7FA9CF"
      />
      <path
        d="M10 8.667a1.333 1.333 0 1 0 0 2.666 1.333 1.333 0 0 0 0-2.666Z"
        fill="#EFD358"
      />
    </Base>
  );
}
