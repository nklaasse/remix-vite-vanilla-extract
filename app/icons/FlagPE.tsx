import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type FlagPEProps = Omit<BaseProps, "children">;

export function FlagPE(props: FlagPEProps) {
  return (
    <Base {...props}>
      <path d="M12.667 4H7.333v12h5.334V4Z" fill="#E6E6E6" />
      <path
        d="M18 15.333a.666.666 0 0 1-.667.667h-4.666V4h4.666c.369 0 .667.298.667.667v10.666ZM7.333 16H2.667A.666.666 0 0 1 2 15.333V4.667C2 4.298 2.298 4 2.667 4h4.666v12Z"
        fill="#D90E2B"
      />
    </Base>
  );
}
