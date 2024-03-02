import * as React from "react";
import type { BaseProps } from "./_Base";
import { Base } from "./_Base";

export type IconSocialFacebookProps = Omit<BaseProps, "children">;

export function IconSocialFacebook(props: IconSocialFacebookProps) {
  return (
    <Base {...props}>
      <title>Facebook</title>
      <path
        fill="currentColor"
        d="M8.023 18 8 11H5V8h3V6c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V8H15l-1 3h-2.72v7H8.023Z"
      />
    </Base>
  );
}
