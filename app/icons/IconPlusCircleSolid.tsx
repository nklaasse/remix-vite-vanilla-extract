import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconPlusCircleSolidProps = Omit<BaseProps, "children">;

export function IconPlusCircleSolid(props: IconPlusCircleSolidProps) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M10 2c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8Zm4 8.5a.5.5 0 0 1-.5.5H11v2.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5V11H6.5a.5.5 0 0 1-.5-.5v-1c0-.28.22-.5.5-.5H9V6.5c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5V9h2.5c.28 0 .5.22.5.5v1Z"
      />
    </Base>
  );
}
