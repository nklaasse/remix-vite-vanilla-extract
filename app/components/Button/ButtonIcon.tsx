import { IconProvider } from "~/icons/IconProvider";
import * as React from "react";
import { buttonIcon } from "./ButtonIcon.css";

export type ButtonIconProps = {
  /**
   * A single item from ~/icons
   */
  children: React.ReactNode;
};

export const ButtonIcon = React.forwardRef(function ButtonIcon(
  props: ButtonIconProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { children } = props;

  return (
    <IconProvider aria-hidden>
      <div className={buttonIcon.container} ref={ref}>
        {children}
      </div>
    </IconProvider>
  );
});
