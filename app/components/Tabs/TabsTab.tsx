import type { MenuItemProps } from "~/components/Menu";
import { Menu } from "~/components/Menu";
import classnames from "classnames";
import type { TabProps as ReactAriaTabProps } from "react-aria-components";
import { Tab as ReactAriaTab } from "react-aria-components";
import { useElementType } from "./TabsList";
import { tabsTab } from "./TabsTab.css";

type TabsTabMenuItemProps<T> = MenuItemProps<T>;

function TabsTabMenuItem<T extends object>(props: TabsTabMenuItemProps<T>) {
  const { children, ...otherProps } = props;

  return <Menu.Item {...otherProps}>{children}</Menu.Item>;
}

type TabsTabDefaultProps = Omit<ReactAriaTabProps, "children"> & {
  children?: React.ReactNode;
};

function TabsTabDefault(props: TabsTabDefaultProps) {
  const { children, ...otherProps } = props;

  return (
    <ReactAriaTab
      {...otherProps}
      className={(props) =>
        classnames(tabsTab.container, {
          [tabsTab.states.isSelected]: props.isSelected,
          [tabsTab.states.isHovered]: props.isHovered,
          [tabsTab.states.isFocused]: props.isFocused,
          [tabsTab.states.isFocusVisible]: props.isFocusVisible,
        })
      }
    >
      {children}
    </ReactAriaTab>
  );
}

export type TabsTabProps = TabsTabMenuItemProps<object> | TabsTabDefaultProps;

export function TabsTab(props: TabsTabProps) {
  const { children, ...otherProps } = props;

  const type = useElementType();

  switch (type) {
    case "menu":
      return (
        <TabsTabMenuItem {...(otherProps as TabsTabMenuItemProps<object>)}>
          {children as TabsTabMenuItemProps<object>["children"]}
        </TabsTabMenuItem>
      );
    case "list":
      return (
        <TabsTabDefault {...(otherProps as TabsTabDefaultProps)}>
          {children as TabsTabDefaultProps["children"]}
        </TabsTabDefault>
      );
    default:
      return null;
  }
}
