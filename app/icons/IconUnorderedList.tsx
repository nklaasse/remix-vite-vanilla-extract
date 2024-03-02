import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconUnorderedListProps = Omit<BaseProps, "children">;

export function IconUnorderedList(props: IconUnorderedListProps) {
  return (
    <Base {...props}>
      <Base.LeftToRight>
        <path
          d="M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM4 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM4 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM18 3H8v2h10V3ZM18 9H8v2h10V9ZM18 15H8v2h10v-2Z"
          fill="currentColor"
        />
      </Base.LeftToRight>
      <Base.RightToLeft>
        <path
          d="M16 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM16 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM16 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM2 17h10v-2H2v2ZM2 11h10V9H2v2ZM2 5h10V3H2v2Z"
          fill="currentColor"
        />
      </Base.RightToLeft>
    </Base>
  );
}
