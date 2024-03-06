import { Button } from "~/components/Button";
import type { MenuButtonProps } from "~/components/Menu";
import { IconMore } from "~/icons/IconMore";
import * as React from "react";
import { ActionMenuIcon } from "./ActionMenuIcon";

export type ActionMenuButtonProps = Omit<
  MenuButtonProps,
  "color" | "variant" | "size"
> & {
  /**
   * @default <IconMore />
   */
  children?: MenuButtonProps["children"];
};

/**
 * ActionMenuButton wraps the Button component and applies the right properties to act as a trigger
 */
export const ActionMenuButton = React.forwardRef(function ActionMenuButton(
  props: ActionMenuButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  let { children } = props;

  if (!children) {
    children = (
      <ActionMenuIcon>
        <IconMore />
      </ActionMenuIcon>
    );
  }

  return (
    <Button {...props} variant="tertiary" size="compact" ref={ref}>
      {children}
    </Button>
  );
});
