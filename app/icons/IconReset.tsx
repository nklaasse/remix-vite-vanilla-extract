import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconResetProps = Omit<BaseProps, "children">;

export function IconReset(props: IconResetProps) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M4.765 11.692a1 1 0 0 0-1.9.616 7.47 7.47 0 0 0 .716 1.567 1 1 0 1 0 1.711-1.034 5.516 5.516 0 0 1-.527-1.149ZM9.91 15.5a5.455 5.455 0 0 1-2.3-.545 1 1 0 1 0-.871 1.8c.98.475 2.052.73 3.141.745h.02a1 1 0 0 0 .015-2H9.91ZM16 12.7a1 1 0 0 0-1.383.294 5.568 5.568 0 0 1-1.686 1.662A1 1 0 1 0 14 16.348a7.564 7.564 0 0 0 2.3-2.265A1 1 0 0 0 16 12.7ZM10 2.5a7.511 7.511 0 0 0-4.077 1.213L4.436 2.155a.5.5 0 0 0-.849.234L2.263 8.194a.5.5 0 0 0 .579.606l5.831-1.088a.5.5 0 0 0 .269-.837l-1.6-1.681A5.49 5.49 0 0 1 15.5 10a1 1 0 0 0 2 0A7.508 7.508 0 0 0 10 2.5Z"
      />
    </Base>
  );
}
