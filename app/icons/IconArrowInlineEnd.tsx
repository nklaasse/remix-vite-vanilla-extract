import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconArrowInlineEndProps = Omit<BaseProps, "children">;

export function IconArrowInlineEnd(props: IconArrowInlineEndProps) {
  return (
    <Base {...props}>
      <Base.LeftToRight>
        <path
          d="M12.707 4.293a1 1 0 0 0-1.414 1.414L14.586 9H3a1 1 0 0 0 0 2h11.586l-3.293 3.293a1 1 0 1 0 1.414 1.414l5-5a1 1 0 0 0 0-1.414l-5-5Z"
          fill="currentColor"
        />
      </Base.LeftToRight>
      <Base.RightToLeft>
        <path
          d="M7.293 4.293a1 1 0 0 1 1.414 1.414L5.414 9H17a1 1 0 1 1 0 2H5.414l3.293 3.293a1 1 0 1 1-1.414 1.414l-5-5a1 1 0 0 1 0-1.414l5-5Z"
          fill="currentColor"
        />
      </Base.RightToLeft>
    </Base>
  );
}
