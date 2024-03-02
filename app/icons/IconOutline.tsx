import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconOutlineProps = Omit<BaseProps, "children">;

export function IconOutline(props: IconOutlineProps) {
  return (
    <Base {...props}>
      <Base.LeftToRight>
        <path
          d="M7.829 3.124A.5.5 0 0 0 7 3.5V6a5 5 0 1 0 0 10h3a1 1 0 1 0 0-2H7a3 3 0 0 1 0-6v2.5a.5.5 0 0 0 .829.376l4-3.5a.5.5 0 0 0 0-.752l-4-3.5ZM17 14h-3a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2ZM17 10h-3a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2ZM14 8h3a1 1 0 1 0 0-2h-3a1 1 0 1 0 0 2Z"
          fill="currentColor"
        />
      </Base.LeftToRight>
      <Base.RightToLeft>
        <path
          d="M12.171 3.124A.5.5 0 0 1 13 3.5V6a5 5 0 1 1 0 10h-3a1 1 0 0 1 0-2h3a3 3 0 0 0 0-6v2.5a.5.5 0 0 1-.829.376l-4-3.5a.5.5 0 0 1 0-.752l4-3.5ZM3 14h3a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2ZM3 10h3a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2ZM6 8H3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Z"
          fill="currentColor"
        />
      </Base.RightToLeft>
    </Base>
  );
}
