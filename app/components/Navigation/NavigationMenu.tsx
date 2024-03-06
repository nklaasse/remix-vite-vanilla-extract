import * as React from "react";
import type { TabListProps as ReactAriaTabListProps } from "react-aria-components";
import { TabList as ReactAriaTabList } from "react-aria-components";
import { NavigationContext, useElementType } from "./Navigation";
import { navigationMenuTabs } from "./NavigationMenu.css";

type NavigationMenuTabsProps<T> = Omit<ReactAriaTabListProps<T>, "orientation">;

function NavigationMenuTabs<T extends object>(
  props: NavigationMenuTabsProps<T>
) {
  const { children, ...otherProps } = props;

  const context = React.useContext(NavigationContext);

  const { railRef } = context.refs;

  return (
    <ReactAriaTabList
      {...otherProps}
      ref={railRef}
      className={navigationMenuTabs.container}
    >
      {children}
    </ReactAriaTabList>
  );
}

type NavigationMenuProps<T> = NavigationMenuTabsProps<T>;

export function NavigationMenu<T extends object>(
  props: NavigationMenuProps<T>
) {
  const type = useElementType();

  switch (type) {
    case "rail":
    case "bar":
      return <NavigationMenuTabs {...props} />;
    default:
      return null;
  }
}
