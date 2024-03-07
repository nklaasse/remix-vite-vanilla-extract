import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconHomeProps = Omit<BaseProps, "children">;

export function IconHome(props: IconHomeProps) {
  return (
    <Base {...props}>
      <path
        fill="currentColor"
        d="M10.64 2.2325c-.371-.31-.909-.31-1.28 0l-6 5c-.228.19-.36.471-.36.768v9c0 .552.448 1 1 1h4v-4c0-.552.448-1 1-1h2c.552 0 1 .448 1 1v4h4c.552 0 1-.448 1-1v-9c0-.297-.132-.578-.36-.768l-6-5Z"
      />
    </Base>
  );
}
