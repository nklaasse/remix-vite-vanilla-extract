import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconSectionsProps = Omit<BaseProps, "children">;

export function IconSections(props: IconSectionsProps) {
  return (
    <Base {...props}>
      <Base.LeftToRight>
        <path
          d="M8 2H3c-.6 0-1 .4-1 1v5c0 .6.4 1 1 1h5c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1ZM8 11H3c-.6 0-1 .4-1 1v5c0 .6.4 1 1 1h5c.6 0 1-.4 1-1v-5c0-.6-.4-1-1-1ZM18 3h-7v2h7V3ZM18 6h-7v2h7V6ZM18 12h-7v2h7v-2ZM18 15h-7v2h7v-2Z"
          fill="currentColor"
        />
      </Base.LeftToRight>
      <Base.RightToLeft>
        <path
          d="M12 2h5c.6 0 1 .4 1 1v5c0 .6-.4 1-1 1h-5c-.6 0-1-.4-1-1V3c0-.6.4-1 1-1ZM12 11h5c.6 0 1 .4 1 1v5c0 .6-.4 1-1 1h-5c-.6 0-1-.4-1-1v-5c0-.6.4-1 1-1ZM2 3h7v2H2V3ZM2 6h7v2H2V6ZM2 12h7v2H2v-2ZM2 15h7v2H2v-2Z"
          fill="currentColor"
        />
      </Base.RightToLeft>
    </Base>
  );
}
