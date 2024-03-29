import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type FlagUKProps = Omit<BaseProps, "children">;

export function FlagUK(props: FlagUKProps) {
  return (
    <Base {...props}>
      <path
        d="M17.333 4H2.667A.667.667 0 0 0 2 4.667v10.666a.667.667 0 0 0 .667.667h14.666a.666.666 0 0 0 .667-.667V4.667A.666.666 0 0 0 17.333 4Z"
        fill="#002781"
      />
      <path
        d="M18 4.667A.666.666 0 0 0 17.333 4h-1.72l-4.28 3.292V4H8.667v3.292L4.387 4h-1.72A.667.667 0 0 0 2 4.667v.862l4.08 3.138H2v2.666h4.08L2 14.472v.861a.667.667 0 0 0 .667.667h1.72l4.28-3.292V16h2.666v-3.292L15.613 16h1.72a.666.666 0 0 0 .667-.667v-.861l-4.08-3.139H18V8.667h-4.08L18 5.529v-.862Z"
        fill="#E6E6E6"
      />
      <path
        d="M18 9.333h-7.333V4H9.333v5.333H2v1.334h7.333V16h1.334v-5.333H18V9.333Z"
        fill="#D10D24"
      />
      <path
        d="m8.667 11.241-6.14 4.744a.68.68 0 0 0 .14.015h.795l5.205-4.022v-.737ZM11.333 8.759l6.14-4.744a.686.686 0 0 0-.14-.015h-.795l-5.205 4.022v.737ZM8.002 8.667l-5.797-4.48a.663.663 0 0 0-.205.48v.1l5.048 3.9h.954ZM11.998 11.333l5.797 4.48a.664.664 0 0 0 .205-.48v-.1l-5.048-3.9h-.954Z"
        fill="#D10D24"
      />
    </Base>
  );
}
