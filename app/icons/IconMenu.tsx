import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconMenuProps = Omit<BaseProps, "children">;

export function IconMenu(props: IconMenuProps) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M17 9H3c-.6 0-1 .4-1 1s.4 1 1 1h14c.6 0 1-.4 1-1s-.4-1-1-1ZM17 3H3c-.6 0-1 .4-1 1s.4 1 1 1h14c.6 0 1-.4 1-1s-.4-1-1-1ZM17 15H3c-.6 0-1 .4-1 1s.4 1 1 1h14c.6 0 1-.4 1-1s-.4-1-1-1Z"
      />
    </Base>
  );
}
