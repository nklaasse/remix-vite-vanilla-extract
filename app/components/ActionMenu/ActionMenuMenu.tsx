import type { MenuProps } from "~/components/Menu";
import { Menu } from "~/components/Menu";
import { Popover } from "~/components/Popover";
import { Tray } from "~/components/Tray";
import { breakpoints } from "~/css";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import type { AriaMenuProps } from "@react-types/menu";
import * as React from "react";
import { ActionMenuContext, ElementTypeProvider } from "./ActionMenu";
import { actionMenuMenu } from "./ActionMenuMenu.css";

export type ActionMenuMenuContentProps<T> = Pick<
  MenuProps<T>,
  "items" | "children"
>;

const ActionMenuMenuContent = React.forwardRef(function ActionMenuMenuContent<
  T extends object
>(props: ActionMenuMenuContentProps<T>) {
  const { children, ...otherProps } = props;

  const context = React.useContext(ActionMenuContext);

  const { menuProps } = context.props;

  return (
    <Menu {...otherProps} {...menuProps}>
      {children}
    </Menu>
  );
});

export type ActionMenuMenuProps<T> = Pick<
  AriaMenuProps<T>,
  "items" | "children"
>;

/**
 * ActionMenuMenu determines if the menu should render in a tray or popover, and makes it's contents optionally scrollable
 */
export function ActionMenuMenu<T extends object>(
  props: ActionMenuMenuProps<T>
) {
  const { children, ...otherProps } = props;

  const context = React.useContext(ActionMenuContext);

  const { triggerIconRef } = context.refs;

  const isPopover = useMediaQuery(breakpoints.medium);

  const contents = (
    <div className={actionMenuMenu.container}>
      <ActionMenuMenuContent {...otherProps}>{children}</ActionMenuMenuContent>
    </div>
  );

  let content;

  if (isPopover) {
    content = (
      <Popover triggerRef={triggerIconRef} placement="bottom">
        {contents}
      </Popover>
    );
  } else {
    content = <Tray>{contents}</Tray>;
  }

  return <ElementTypeProvider type="menu">{content}</ElementTypeProvider>;
}
