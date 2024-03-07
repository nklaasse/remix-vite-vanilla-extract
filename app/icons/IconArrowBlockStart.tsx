import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconArrowBlockStartProps = Omit<BaseProps, "children">;

export function IconArrowBlockStart(props: IconArrowBlockStartProps) {
  return (
    <Base {...props}>
      <path
        d="m15.707 7.293-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L9 5.414V17a1 1 0 1 0 2 0V5.414l3.293 3.293a1 1 0 0 0 1.414-1.414Z"
        fill="currentColor"
      />
    </Base>
  );
}
