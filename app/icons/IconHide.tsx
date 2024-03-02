import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconHideProps = Omit<BaseProps, "children">;

export function IconHide(props: IconHideProps) {
  return (
    <Base {...props}>
      <path
        d="m16.6 7.6-8.2 8.2c.5.1 1.1.2 1.6.2 3.6 0 6.4-3.1 7.6-4.9.5-.7.5-1.6 0-2.3-.2-.3-.6-.7-1-1.2ZM16.3 2.3 13.6 5c-1.1-.6-2.3-1-3.6-1-3.6 0-6.4 3.1-7.6 4.9-.5.7-.5 1.6 0 2.2.5.8 1.4 1.8 2.4 2.7l-2.5 2.5c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3l14-14c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0Zm-9 9c-.2-.4-.3-.8-.3-1.3 0-1.7 1.3-3 3-3 .5 0 .9.1 1.3.3l-4 4Z"
        fill="currentColor"
      />
    </Base>
  );
}
