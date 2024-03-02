import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconChevronInlineStartProps = Omit<BaseProps, "children">;

export function IconChevronInlineStart(props: IconChevronInlineStartProps) {
  return (
    <Base {...props}>
      <Base.LeftToRight>
        <path
          d="M12 15a1 1 0 0 1-.707-.293l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 1 1 1.414 1.414L9.414 10l3.293 3.293A1 1 0 0 1 12 15Z"
          fill="currentColor"
        />
      </Base.LeftToRight>
      <Base.RightToLeft>
        <path
          d="M8 15a1 1 0 0 0 .707-.293l4-4a1 1 0 0 0 0-1.414l-4-4a1 1 0 1 0-1.414 1.414L10.586 10l-3.293 3.293A1 1 0 0 0 8 15Z"
          fill="c"
        />
      </Base.RightToLeft>
    </Base>
  );
}
