import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconAlignContentInlineEndProps = Omit<BaseProps, "children">;

export function IconAlignContentInlineEnd(
  props: IconAlignContentInlineEndProps
) {
  return (
    <Base {...props}>
      <Base.LeftToRight>
        <path
          d="M13.829 6.124A.5.5 0 0 0 13 6.5V9H3a1 1 0 0 0 0 2h10v2.5a.5.5 0 0 0 .829.376l4-3.5a.5.5 0 0 0 0-.752l-4-3.5ZM3 5h7a1 1 0 1 0 0-2H3a1 1 0 0 0 0 2ZM10 15H3a1 1 0 0 0 0 2h7a1 1 0 0 0 0-2Z"
          fill="currentColor"
        />
      </Base.LeftToRight>
      <Base.RightToLeft>
        <path
          d="M6.171 6.124A.5.5 0 0 1 7 6.5V9h10a1 1 0 1 1 0 2H7v2.5a.5.5 0 0 1-.829.376l-4-3.5a.5.5 0 0 1 0-.752l4-3.5ZM17 5h-7a1 1 0 0 1 0-2h7a1 1 0 1 1 0 2ZM10 15h7a1 1 0 0 1 0 2h-7a1 1 0 0 1 0-2Z"
          fill="currentColor"
        />
      </Base.RightToLeft>
    </Base>
  );
}
