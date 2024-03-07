import { IconChevronBlockEnd } from "~/icons/IconChevronBlockEnd";
import * as React from "react";
import type { ButtonProps } from "../Button";
import { Button } from "../Button";
import { MenuTriggerContext } from "./MenuTrigger";

export type MenuButtonProps = Omit<ButtonProps, "color" | "variant" | "size">;

/**
 * MenuButton wraps the Button component and applies the right properties to act as a trigger
 */
export const MenuButton = React.forwardRef(function MenuButton(
  props: MenuButtonProps,
  _ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { children } = props;

  const context = React.useContext(MenuTriggerContext);

  const { triggerIconRef } = context.refs;

  return (
    <Button variant="tertiary" size="compact">
      {children}
      <Button.Icon ref={triggerIconRef}>
        <IconChevronBlockEnd />
      </Button.Icon>
    </Button>
  );
});
