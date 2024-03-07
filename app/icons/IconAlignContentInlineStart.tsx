import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconAlignContentInlineStartProps = Omit<BaseProps, "children">;

export function IconAlignContentInlineStart(
  props: IconAlignContentInlineStartProps
) {
  return (
    <Base {...props}>
      <Base.LeftToRight>
        <path
          d="M17 9H7V6.5a.5.5 0 0 0-.829-.376l-4 3.5a.5.5 0 0 0 0 .752l4 3.5A.5.5 0 0 0 7 13.5V11h10a1 1 0 1 0 0-2ZM10 5h7a1 1 0 1 0 0-2h-7a1 1 0 0 0 0 2ZM17 15h-7a1 1 0 0 0 0 2h7a1 1 0 0 0 0-2Z"
          fill="currentColor"
        />
      </Base.LeftToRight>
      <Base.RightToLeft>
        <path
          d="M3 9h10V6.5a.5.5 0 0 1 .829-.376l4 3.5a.5.5 0 0 1 0 .752l-4 3.5A.5.5 0 0 1 13 13.5V11H3a1 1 0 0 1 0-2ZM10 5H3a1 1 0 0 1 0-2h7a1 1 0 1 1 0 2ZM3 15h7a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2Z"
          fill="currentColor"
        />
      </Base.RightToLeft>
    </Base>
  );
}
