import { IconProvider } from "~/icons/IconProvider";
import * as React from "react";
import { toggleButtonIcon } from "./ToggleButtonIcon.css";

export type ToggleButtonIconProps = {
  /**
   * A single item from ~/icons
   */
  children: React.ReactNode;
};

export const ToggleButtonIcon = React.forwardRef(function ToggleButtonIcon(
  props: ToggleButtonIconProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { children } = props;

  return (
    <IconProvider aria-hidden>
      <div className={toggleButtonIcon.container} ref={ref}>
        {children}
      </div>
    </IconProvider>
  );
});
