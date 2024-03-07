import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type FlagSEProps = Omit<BaseProps, "children">;

export function FlagSE(props: FlagSEProps) {
  return (
    <Base {...props}>
      <path
        d="M18 15.333a.666.666 0 0 1-.667.667H2.667A.666.666 0 0 1 2 15.333V4.667C2 4.298 2.298 4 2.667 4h14.666c.369 0 .667.298.667.667v10.666Z"
        fill="#0A5189"
      />
      <path
        d="M18 8.667H8.667V4H6v4.667H2v2.666h4V16h2.667v-4.667H18V8.667Z"
        fill="#EFD358"
      />
    </Base>
  );
}
