import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconMinProps = Omit<BaseProps, "children">;

export function IconMin(props: IconMinProps) {
  return (
    <Base {...props}>
      <path
        d="M17 9H3c-.6 0-1 .4-1 1s.4 1 1 1h14c.6 0 1-.4 1-1s-.4-1-1-1Z"
        fill="currentColor"
      />
    </Base>
  );
}
