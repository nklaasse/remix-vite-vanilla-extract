import classnames from "classnames";
import type {
  ItemProps as ReactAriaItemProps,
  TabProps as ReactAriaTabProps,
} from "react-aria-components";
import {
  Item as ReactAriaItem,
  Tab as ReactAriaTab,
} from "react-aria-components";
import { useElementType } from "./Navigation";
import {
  navigationMenuDrawerItem,
  navigationMenuTab,
} from "./NavigationMenuItem.css";

export type NavigationMenuTabProps = ReactAriaTabProps;

export function NavigationMenuTab(props: NavigationMenuTabProps) {
  const { children, ...otherProps } = props;

  return (
    <ReactAriaTab
      {...otherProps}
      className={(props) =>
        classnames(navigationMenuTab.container, {
          [navigationMenuTab.states.isHovered]: props.isHovered,
          [navigationMenuTab.states.isFocused]: props.isFocused,
          [navigationMenuTab.states.isPressed]: props.isPressed,
          [navigationMenuTab.states.isSelected]: props.isSelected,
          [navigationMenuTab.states.isFocusVisible]: props.isFocusVisible,
        })
      }
    >
      {children}
    </ReactAriaTab>
  );
}

type NavigationMenuMenuItemProps = ReactAriaItemProps;

function NavigationMenuMenuItem(props: NavigationMenuMenuItemProps) {
  const { children, ...otherProps } = props;

  return (
    <ReactAriaItem
      {...otherProps}
      className={(props) =>
        classnames(navigationMenuDrawerItem.container, {
          [navigationMenuDrawerItem.states.isHovered]: props.isHovered,
          [navigationMenuDrawerItem.states.isFocused]: props.isFocused,
          [navigationMenuDrawerItem.states.isPressed]: props.isPressed,
          [navigationMenuDrawerItem.states.isSelected]: props.isSelected,
          [navigationMenuDrawerItem.states.isFocusVisible]:
            props.isFocusVisible,
        })
      }
    >
      {children}
    </ReactAriaItem>
  );
}

type NavigationMenuItemProps = ReactAriaItemProps;

export function NavigationMenuItem(props: NavigationMenuItemProps) {
  const type = useElementType();

  switch (type) {
    case "rail":
    case "bar":
      return <NavigationMenuTab {...(props as NavigationMenuTabProps)} />;
    case "drawer":
      return <NavigationMenuMenuItem {...(props as NavigationMenuItemProps)} />;
    default:
      return null;
  }
}
