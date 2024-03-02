import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconSocialLinkedinProps = Omit<BaseProps, "children">;

export function IconSocialLinkedin(props: IconSocialLinkedinProps) {
  return (
    <Base {...props}>
      <title>LinkedIn</title>
      <path
        fill="currentColor"
        d="M17.3 2H2.7c-.4 0-.7.3-.7.7v14.7c0 .3.3.6.7.6h14.7c.4 0 .7-.3.7-.7V2.7c-.1-.4-.4-.7-.8-.7ZM6.7 15.6H4.4V8h2.4v7.6h-.1ZM5.6 7c-.8 0-1.4-.7-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4-.1.7-.7 1.4-1.4 1.4Zm10 8.6h-2.4v-3.7c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.8H8.2V8h2.3v1c.3-.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v4.2h.1Z"
      />
    </Base>
  );
}
