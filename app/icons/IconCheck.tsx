import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconCheckProps = Omit<BaseProps, "children">;

export function IconCheck(props: IconCheckProps) {
  return (
    <Base {...props}>
      <path
        d="M16.3 4.3 7 13.6l-3.3-3.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0Z"
        fill="currentColor"
      />
    </Base>
  );
}
