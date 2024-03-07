import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconZoomInProps = Omit<BaseProps, "children">;

export function IconZoomIn(props: IconZoomInProps) {
  return (
    <Base {...props}>
      <path
        fill="#000"
        d="M11.55 8.05h-1.5v-1.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.5h-1.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1.5v1.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1.5h1.5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5Z"
      />
      <path
        fill="#000"
        d="M15.05 12.64a7.03 7.03 0 1 0-2.41 2.41l2.7 2.71a1 1 0 0 0 1.42 0l1-1a1 1 0 0 0 0-1.41l-2.7-2.71Zm-6 1.41a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z"
      />
    </Base>
  );
}
