import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconItalicProps = Omit<BaseProps, "children">;

export function IconItalic(props: IconItalicProps) {
  return (
    <Base {...props}>
      <path
        d="M14 4V2H8v2h1.27a.5.5 0 0 1 .496.57l-1.51 10.571a1 1 0 0 1-.99.859H6v2h6v-2h-1.27a.5.5 0 0 1-.496-.57l1.51-10.571a1 1 0 0 1 .99-.859H14Z"
        fill="currentColor"
      />
    </Base>
  );
}
