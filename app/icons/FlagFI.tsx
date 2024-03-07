import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type FlagFIProps = Omit<BaseProps, "children">;

export function FlagFI(props: FlagFIProps) {
  return (
    <Base {...props}>
      <path
        fill="#E6E6E6"
        d="M18 15.33c0 .37-.3.67-.67.67H2.67a.67.67 0 0 1-.67-.67V4.67c0-.37.3-.67.67-.67h14.66c.37 0 .67.3.67.67v10.66Z"
      />
      <path fill="#003680" d="M18 8.67H2v2.66h16V8.67Z" />
      <path fill="#003680" d="M8.67 4H6v12h2.67V4Z" />
    </Base>
  );
}
