import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconDesignProps = Omit<BaseProps, "children">;

export function IconDesign(props: IconDesignProps) {
  return (
    <Base {...props}>
      <path
        d="m4.2 7.6 3.4-3.4-1.9-1.9c-.4-.4-1-.4-1.4 0l-2 2c-.4.4-.4 1 0 1.4l1.9 1.9ZM15.8 12.4l-3.4 3.4 1.9 1.9c.2.2.4.3.7.3h3v-3c0-.3-.1-.5-.3-.7l-1.9-1.9ZM17.7 6.3l-4-4c-.4-.4-1-.4-1.4 0L11 3.6l1.7 1.7-1.4 1.4L9.6 5 8 6.6l1.7 1.7-1.4 1.4L6.6 8 5 9.6l1.7 1.7-1.4 1.4L3.6 11l-1.3 1.3c-.4.4-.4 1 0 1.4l4 4c.4.4 1 .4 1.4 0l10-10c.4-.4.4-1 0-1.4Z"
        fill="currentColor"
      />
    </Base>
  );
}
