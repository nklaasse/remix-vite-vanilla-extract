import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconPlusDenseProps = Omit<BaseProps, "children">;

export function IconPlusDense(props: IconPlusDenseProps) {
  return (
    <Base {...props}>
      <path d="M11 6H9v3H6v2h3v3h2v-3h3V9h-3V6Z" fill="currentColor" />
    </Base>
  );
}
