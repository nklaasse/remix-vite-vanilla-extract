import { Popover } from "~/components/Popover";
import { Tray } from "~/components/Tray";
import { breakpoints } from "~/css";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { useResizeObserver } from "~/hooks/useResizeObserver";
import * as React from "react";
import type {
  MenuProps as ReactAriaMenuProps,
  PopoverProps as ReactAriaPopoverProps,
} from "react-aria-components";
import {
  Menu as ReactAriaMenu,
  useContextProps,
  Collection as ReactAriaCollection,
  PopoverContext as ReactAriaPopoverContext,
} from "react-aria-components";
import { createElementTypeContext } from "../ElementType";
import { menu, menuContent } from "./Menu.css";
import { MenuBadge } from "./MenuBadge";
import { MenuButton } from "./MenuButton";
import { MenuDescription } from "./MenuDescription";
import { MenuHeader } from "./MenuHeader";
import { MenuIcon } from "./MenuIcon";
import { MenuIndicator } from "./MenuIndicator";
import { MenuItem } from "./MenuItem";
import { MenuLabel } from "./MenuLabel";
import { MenuSection } from "./MenuSection";
import { MenuSeparator } from "./MenuSeparator";
import { MenuTrigger, MenuTriggerContext } from "./MenuTrigger";

export const { ElementTypeProvider, useElementType } = createElementTypeContext<
  "trigger" | "menu"
>();

export type MenuContentProps<T> = ReactAriaMenuProps<T>;

const MenuContent = React.forwardRef(function MenuContent<T extends object>(
  props: MenuContentProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { children, ...otherProps } = props;

  return (
    <ReactAriaMenu {...otherProps} ref={ref} className={menuContent.container}>
      {children}
    </ReactAriaMenu>
  );
});

type MenuOverlayProps<T> = ReactAriaMenuProps<T>;

function MenuOverlay<T extends object>(props: MenuOverlayProps<T>) {
  const { children, ...otherProps } = props;

  const ref = React.useRef<HTMLDivElement>(null!);

  const context = React.useContext(MenuTriggerContext);
  const { triggerIconRef } = context.refs;

  const [popoverProps, popoverRef] = useContextProps(
    {},
    ref,
    ReactAriaPopoverContext
  );

  const defaultTriggerRef = React.useRef<HTMLDivElement>(null!);

  const { triggerRef } = popoverProps as ReactAriaPopoverProps;

  const isPopover = useMediaQuery(breakpoints.medium);

  // Watch the width of the trigger so we can apply it as a min-width to the
  // Popover, so that it looks nice when the content is smaller than the trigger
  const [triggerWidth, setTriggerWidth] = React.useState(0);

  const onResize = React.useCallback(() => {
    if (isPopover && triggerRef?.current) {
      const { width } = triggerRef.current.getBoundingClientRect();

      // Subtract 2px because we apply a border around the arrow, which add's 2 pixels
      // to the rendered result
      setTriggerWidth(width - 2);
    }
  }, [triggerRef, setTriggerWidth, isPopover]);

  useResizeObserver({
    ref: triggerRef || defaultTriggerRef,
    onResize: onResize,
  });

  const content = <MenuContent {...otherProps}>{children}</MenuContent>;

  // Determine if the Menu should be rendered in a Popover or Tray
  if (isPopover) {
    return (
      <Popover
        triggerRef={triggerIconRef}
        shouldUpdatePosition={true}
        containerPadding={0}
        placement="bottom end"
        // Need to apply a offset of 5 because there is left over space at
        // the end of the trigger indicator. But we need to subtract 1 due to
        // the border around the popover
        crossOffset={4}
        ref={popoverRef}
      >
        <div
          style={{
            width: `${triggerWidth}px`,
          }}
          className={menu.container}
        >
          {content}
        </div>
      </Popover>
    );
  } else {
    return <Tray>{content}</Tray>;
  }
}

export type MenuProps<T> = ReactAriaMenuProps<T>;

/**
 * Menu determines if the menu should render in a tray or popover, and makes it's contents optionally scrollable
 */
export function Menu<T extends object>(props: MenuProps<T>) {
  const { children, ...otherProps } = props;

  const type = useElementType();

  let content = children;

  // Determine if the Menu is rendered inside of a MenuTrigger
  // If it is, we need to render the MenuContent inside of a Popover or Tray
  // If it is not we can just render the MenuContent as a standalone component
  if (type === "trigger") {
    content = <MenuOverlay {...otherProps}>{content}</MenuOverlay>;
  } else {
    content = <MenuContent {...otherProps}>{content}</MenuContent>;
  }

  return <ElementTypeProvider type="menu">{content}</ElementTypeProvider>;
}

Menu.Trigger = MenuTrigger;
Menu.Button = MenuButton;
Menu.Icon = MenuIcon;
Menu.Label = MenuLabel;
Menu.Description = MenuDescription;
Menu.Indicator = MenuIndicator;
Menu.Badge = MenuBadge;
Menu.Item = MenuItem;
Menu.Section = MenuSection;
Menu.Header = MenuHeader;
Menu.Separator = MenuSeparator;
Menu.Collection = ReactAriaCollection;
