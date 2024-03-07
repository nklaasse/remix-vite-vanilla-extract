import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type FlagESProps = Omit<BaseProps, "children">;

export function FlagES(props: FlagESProps) {
  return (
    <Base {...props}>
      <path
        d="M17.5 7.5h-15V5c0-.345.28-.625.625-.625h13.75c.345 0 .625.28.625.625v2.5Z"
        fill="#C60B1E"
      />
      <path d="M17.5 7.5h-15v5h15v-5Z" fill="#FFC300" />
      <path
        d="M17.5 15c0 .345-.28.625-.625.625H3.125A.625.625 0 0 1 2.5 15v-2.5h15V15Z"
        fill="#C60B1E"
      />
      <path
        d="M6.875 8.75v-.625h-2.5v.625H5v.625h-.625v1.666l1.25.834 1.25-.834V9.375H6.25V8.75h.625Z"
        fill="#91443A"
      />
    </Base>
  );
}
