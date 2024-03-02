import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconBoldProps = Omit<BaseProps, "children">;

export function IconBold(props: IconBoldProps) {
  return (
    <Base {...props}>
      <path
        d="M13.56 9.316a3.483 3.483 0 0 0 1.418-3.207C14.782 4.305 13.143 3 11.33 3H4v1l1.447.724A1 1 0 0 1 6 5.618v8.764a1 1 0 0 1-.553.894L4 16v1h7.823c2.104 0 3.98-1.547 4.162-3.643a4.001 4.001 0 0 0-2.424-4.04ZM9 5h1a2 2 0 1 1 0 4H9V5Zm2 10H9v-4h2a2 2 0 1 1 0 4Z"
        fill="currentColor"
      />
    </Base>
  );
}
