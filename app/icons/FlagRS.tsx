import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type FlagRSProps = Omit<BaseProps, "children">;

export function FlagRS(props: FlagRSProps) {
  return (
    <Base {...props}>
      <path
        fill="#DD2026"
        d="M18 8H2V4.67c0-.37.3-.67.67-.67h14.66c.37 0 .67.3.67.67V8Z"
      />
      <path fill="#233E85" d="M18 8H2v4h16V8Z" />
      <path
        fill="#E6E6E6"
        d="M18 15.33c0 .37-.3.67-.67.67H2.67a.67.67 0 0 1-.67-.67V12h16v3.33Z"
      />
      <path fill="#EE1E2E" d="M8 8H4v4l2 1.33L8 12V8Z" />
      <path
        fill="#fff"
        d="M7.33 8.67H4.67v2h2.66v-2ZM6 12.67l1.33-1.34H4.67L6 12.67Z"
      />
      <path fill="#F5E303" d="M4.67 6.67v.66h.66V8h1.34v-.67h.66v-.66H4.67Z" />
    </Base>
  );
}
