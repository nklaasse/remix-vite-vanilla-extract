import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type FlagDKProps = Omit<BaseProps, "children">;

export function FlagDK(props: FlagDKProps) {
  return (
    <Base {...props}>
      <path
        d="M18 15.333a.666.666 0 0 1-.667.667H2.667A.666.666 0 0 1 2 15.333V4.667C2 4.298 2.298 4 2.667 4h14.666c.369 0 .667.298.667.667v10.666Z"
        fill="#D00C32"
      />
      <path d="M8.667 4H6v12h2.667V4Z" fill="#E6E6E6" />
      <path d="M18 8.667H2v2.666h16V8.667Z" fill="#E6E6E6" />
    </Base>
  );
}
