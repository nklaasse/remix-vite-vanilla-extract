import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconHelpProps = Omit<BaseProps, "children">;

export function IconHelp(props: IconHelpProps) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 14a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z"
      />
      <path
        fill="currentColor"
        d="M10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM10 12a1 1 0 0 1-1-1 3.06 3.06 0 0 1 1.32-2.43c.5-.42.62-.57.62-.9 0-.19 0-.67-.94-.67-.47.04-.92.23-1.26.56a1 1 0 1 1-1.37-1.45 4.08 4.08 0 0 1 3.7-1 2.68 2.68 0 0 1 1.5 3.93c-.23.42-.55.78-.95 1.05-.5.43-.62.57-.62.91a1 1 0 0 1-1 1Z"
      />
    </Base>
  );
}
