import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconChevronBlockEndProps = Omit<BaseProps, "children">;

export function IconChevronBlockEnd(props: IconChevronBlockEndProps) {
  return (
    <Base {...props}>
      <path
        d="M10 13a1 1 0 0 1-.707-.293l-4-4a1 1 0 0 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 13Z"
        fill="currentColor"
      />
    </Base>
  );
}
