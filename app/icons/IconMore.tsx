import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconMoreProps = Omit<BaseProps, "children">;

export function IconMore(props: IconMoreProps) {
  return (
    <Base {...props}>
      <path
        d="M12 10a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM12 16a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM12 4a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"
        fill="currentColor"
      />
    </Base>
  );
}
