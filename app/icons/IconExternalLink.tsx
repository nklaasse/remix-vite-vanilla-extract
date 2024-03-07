import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconExternalLinkProps = Omit<BaseProps, "children">;

export function IconExternalLink(props: IconExternalLinkProps) {
  return (
    <Base {...props}>
      <Base.LeftToRight>
        <path
          fill="currentColor"
          d="M13.829 2.124A.5.5 0 0 0 13 2.5V5a5.006 5.006 0 0 0-5 5 1 1 0 1 0 2 0 3 3 0 0 1 3-3v2.5a.5.5 0 0 0 .829.376l4-3.5a.5.5 0 0 0 0-.752l-4-3.5Z"
        />
        <path
          fill="currentColor"
          d="M15 12a1 1 0 0 0-1 1v2H4V7h2a1 1 0 0 0 0-2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2a1 1 0 0 0-1-1Z"
        />
      </Base.LeftToRight>
      <Base.RightToLeft>
        <path
          fill="currentColor"
          d="M6.171 2.124A.5.5 0 0 1 7 2.5V5a5.006 5.006 0 0 1 5 5 1 1 0 0 1-2 0 3 3 0 0 0-3-3v2.5a.5.5 0 0 1-.829.376l-4-3.5a.5.5 0 0 1 0-.752l4-3.5Z"
        />
        <path
          fill="currentColor"
          d="M5 12a1 1 0 0 1 1 1v2h10V7h-2a1 1 0 1 1 0-2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a1 1 0 0 1 1-1Z"
        />
      </Base.RightToLeft>
    </Base>
  );
}
