import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconGlobeProps = Omit<BaseProps, "children">;

export function IconGlobe(props: IconGlobeProps) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M10 2c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8Zm5.9 7H14c-.1-1.5-.4-2.9-.8-4.1 1.4.9 2.4 2.4 2.7 4.1ZM10 16c-.6 0-1.8-1.9-2-5h4c-.2 3.1-1.4 5-2 5ZM8 9c.2-3.1 1.3-5 2-5s1.8 1.9 2 5H8ZM6.9 4.9C6.4 6.1 6.1 7.5 6 9H4.1c.3-1.7 1.3-3.2 2.8-4.1ZM4.1 11H6c.1 1.5.4 2.9.8 4.1-1.4-.9-2.4-2.4-2.7-4.1Zm9 4.1c.5-1.2.7-2.6.8-4.1h1.9c-.2 1.7-1.2 3.2-2.7 4.1Z"
      />
    </Base>
  );
}
