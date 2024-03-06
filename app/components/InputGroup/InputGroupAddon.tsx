import { IconProvider } from "~/icons/IconProvider";
import * as React from "react";
import { inputGroupAddon } from "./InputGroupAddon.css";

type InputGroupAddonProps = {
  /**
   * A single item from ~/icons or a text string
   */
  children: React.ReactNode | string;
};

/**
 * An input group addon can be used to add a prefix / suffic to the input's.
 */
export const InputGroupAddon = React.forwardRef(function InputGroupAddon(
  props: InputGroupAddonProps,
  ref: React.ForwardedRef<HTMLSpanElement>
) {
  const { children, ...otherProps } = props;

  return (
    <span {...otherProps} className={inputGroupAddon.container} ref={ref}>
      <IconProvider aria-hidden>{children}</IconProvider>
    </span>
  );
});
