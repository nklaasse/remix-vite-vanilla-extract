import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconStarProps = Omit<BaseProps, "children">;

export function IconStar(props: IconStarProps) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="m17.1446 7.05025-4.316-.627-1.931-3.911c-.338-.683-1.45602-.683-1.79402 0l-1.93 3.911-4.317.627c-.817.119-1.148 1.127-.554 1.707l3.124 3.04405-.737 4.299c-.139.814.717 1.439 1.451 1.054l3.86002-2.0291 3.861 2.0301c.728.381 1.591-.234 1.451-1.054l-.737-4.2991 3.124-3.04395c.593-.581.262-1.589-.555-1.708Z"
      />
    </Base>
  );
}
