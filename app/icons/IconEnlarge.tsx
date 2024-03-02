import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconEnlargeProps = Omit<BaseProps, "children">;

export function IconEnlarge(props: IconEnlargeProps) {
  return (
    <Base {...props}>
      <Base.LeftToRight>
        <path
          d="M16 3h-6a1 1 0 0 0 0 2h3.586L5 13.586V10a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1h6a1 1 0 0 0 0-2H6.414L15 6.414V10a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1Z"
          fill="currentColor"
        />
      </Base.LeftToRight>
      <Base.RightToLeft>
        <path
          d="M4 3h6a1 1 0 1 1 0 2H6.414L15 13.586V10a1 1 0 0 1 2 0v6a1 1 0 0 1-1 1h-6a1 1 0 0 1 0-2h3.586L5 6.414V10a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1Z"
          fill="currentColor"
        />
      </Base.RightToLeft>
    </Base>
  );
}
