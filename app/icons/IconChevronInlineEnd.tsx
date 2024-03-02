import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconChevronInlineEndProps = Omit<BaseProps, "children">;

export function IconChevronInlineEnd(props: IconChevronInlineEndProps) {
  return (
    <Base {...props}>
      <Base.LeftToRight>
        <path
          d="M8 15a1 1 0 0 1-.707-1.707L10.586 10 7.293 6.707a1 1 0 0 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4A1 1 0 0 1 8 15Z"
          fill="currentColor"
        />
      </Base.LeftToRight>
      <Base.RightToLeft>
        <path
          d="M12 15a1 1 0 0 0 .707-1.707L9.414 10l3.293-3.293a1 1 0 0 0-1.414-1.414l-4 4a1 1 0 0 0 0 1.414l4 4A1 1 0 0 0 12 15Z"
          fill="currentColor"
        />
      </Base.RightToLeft>
    </Base>
  );
}
