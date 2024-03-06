import classnames from "classnames";
import * as React from "react";
import type { ItemProps as ReactAriaItemProps } from "react-aria-components";
import { Item as ReactAriaItem } from "react-aria-components";
import { menuItem } from "./MenuItem.css";

/**
 * Context for the MenuItem
 */
export type MenuItemContextValue = {
  props: {
    labelProps: React.HTMLAttributes<HTMLElement>;
    descriptionProps: React.HTMLAttributes<HTMLElement>;
    menuItemProps: React.HTMLAttributes<HTMLElement>;
  };
  refs: {
    menuItemRef: React.RefObject<HTMLElement>;
  };
};

export const MenuItemContext = React.createContext<MenuItemContextValue>({
  props: {
    labelProps: {},
    descriptionProps: {},
    menuItemProps: {},
  },
  refs: {
    menuItemRef: React.createRef<HTMLDivElement>(),
  },
});

export type MenuItemProps<T> = ReactAriaItemProps<T>;

/**
 * MenuItem is used for internal rendering
 */
export function MenuItem<T extends object>(props: MenuItemProps<T>) {
  const { children, ...otherProps } = props;

  return (
    <ReactAriaItem
      {...otherProps}
      className={(props) =>
        classnames(menuItem.container, {
          [menuItem.states.isFocused]: props.isFocused,
          [menuItem.states.isPressed]: props.isPressed,
          [menuItem.states.isHovered]: props.isHovered,
          [menuItem.states.isDisabled]: props.isDisabled,
        })
      }
    >
      {children}
    </ReactAriaItem>
  );
}
