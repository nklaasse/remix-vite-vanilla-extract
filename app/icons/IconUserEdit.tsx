import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconUserEditProps = Omit<BaseProps, "children">;

export function IconUserEdit(props: IconUserEditProps) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M10 10c2.2091 0 4-1.79086 4-4s-1.7909-4-4-4C7.79086 2 6 3.79086 6 6s1.79086 4 4 4ZM9 15.171l3.054-3.054C11.414 12.046 10.732 12 10 12c-3.192 0-5.539.795-6.837 1.382C2.45 13.705 2 14.417 2 15.2V18h7v-2.829ZM13 18h-2v-2l5-5 2 2-5 5Z"
      />
    </Base>
  );
}
