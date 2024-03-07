import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconArrowInlineStartProps = Omit<BaseProps, "children">;

export function IconArrowInlineStart(props: IconArrowInlineStartProps) {
  return (
    <Base {...props}>
      <Base.LeftToRight>
        <path
          d="M17 9H5.414l3.293-3.293a1 1 0 0 0-1.414-1.414l-5 5a1 1 0 0 0 0 1.414l5 5a1 1 0 1 0 1.414-1.414L5.414 11H17a1 1 0 0 0 0-2Z"
          fill="currentColor"
        />
      </Base.LeftToRight>
      <Base.RightToLeft>
        <path
          d="M3 9h11.586l-3.293-3.293a1 1 0 0 1 1.414-1.414l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 1 1-1.414-1.414L14.586 11H3a1 1 0 0 1 0-2Z"
          fill="currentColor"
        />
      </Base.RightToLeft>
    </Base>
  );
}
