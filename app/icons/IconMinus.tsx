import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconMinusProps = Omit<BaseProps, "children">;

export function IconMinus(props: IconMinusProps) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M13.5 9H6.5C6.22386 9 6 9.22386 6 9.5V10.5C6 10.7761 6.22386 11 6.5 11H13.5C13.7761 11 14 10.7761 14 10.5V9.5C14 9.22386 13.7761 9 13.5 9Z"
      />
    </Base>
  );
}
