import { IconProvider } from "~/icons/IconProvider";
import * as React from "react";
import { linkIcon } from "./LinkIcon.css";

export type LinkIconProps = {
  children: React.ReactNode;
};

export function LinkIcon(props: LinkIconProps) {
  const { children } = props;

  return (
    <span className={linkIcon.container}>
      <span className={linkIcon.icon}>
        <IconProvider aria-hidden>{children}</IconProvider>
      </span>
    </span>
  );
}
