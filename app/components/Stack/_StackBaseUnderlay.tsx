import classnames from "classnames";
import * as React from "react";
import { stackBaseUnderlay } from "./_StackBaseUnderlay.css";

export type StackBaseUnderlayProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "style" | "className"
> & {
  /**
   * The style of the underlay, it can be made blurred in case there is data which we want to partially hide
   * for a user.
   *
   * @default transparent
   */
  backdrop?: keyof typeof stackBaseUnderlay.variants.backdrop;
};

export function StackBaseUnderlay(props: StackBaseUnderlayProps) {
  const { backdrop = "transparent", ...otherProps } = props;

  return (
    <div
      {...otherProps}
      className={classnames(
        stackBaseUnderlay.container,
        stackBaseUnderlay.variants.backdrop[backdrop]
      )}
    />
  );
}
