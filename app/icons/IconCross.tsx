import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconCrossProps = Omit<BaseProps, "children">;

export function IconCross(props: IconCrossProps) {
  return (
    <Base {...props}>
      <path
        d="M16.7 3.3c-.4-.4-1-.4-1.4 0L10 8.6 4.7 3.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4L8.6 10l-5.3 5.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3l5.3-5.3 5.3 5.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L11.4 10l5.3-5.3c.4-.4.4-1 0-1.4Z"
        fill="currentColor"
      />
    </Base>
  );
}
