import { createElementTypeContext } from "~/components/ElementType";
import type { MenuProps } from "~/components/Menu";
import { Menu } from "~/components/Menu";
import { Popover } from "~/components/Popover";
import { Tray } from "~/components/Tray";
import { breakpoints } from "~/css";
import { useMediaQuery } from "~/hooks/useMediaQuery";
import { useResizeObserver } from "~/hooks/useResizeObserver";
import { IconChevronBlockEnd } from "~/icons/IconChevronBlockEnd";
import classnames from "classnames";
import * as React from "react";
import type {
  Selection,
  TabListProps as ReactAriaTabListProps,
} from "react-aria-components";
import {
  TabList as ReactAriaTabList,
  TabListStateContext,
} from "react-aria-components";
import {
  Button as ReactAriaButton,
  MenuTrigger as ReactAriaMenuTrigger,
} from "react-aria-components";
import { tabPicker, tabsList } from "./TabsList.css";
import { tabsTab } from "./TabsTab.css";

export const { ElementTypeProvider, useElementType } = createElementTypeContext<
  "list" | "picker" | "menu"
>();

export type TabsListProps<T> = ReactAriaTabListProps<T>;

type TabPickerProps<T> = Pick<MenuProps<T>, "items" | "children"> & {
  "aria-hidden": boolean;
};

function TabPicker<T extends object>(props: TabPickerProps<T>) {
  const state = React.useContext(TabListStateContext);

  const { children, items, "aria-hidden": ariaHidden } = props;

  const isPopover = useMediaQuery(breakpoints.medium);

  const content = (
    <ElementTypeProvider type="menu">
      <Menu
        selectedKeys={[state?.selectedKey]}
        selectionMode="single"
        onSelectionChange={(keys: Selection) => {
          if (keys === "all" || keys.size === 0) {
            return;
          }

          state?.setSelectedKey(Array.from(keys)[0]);
        }}
        items={items}
      >
        {children}
      </Menu>
    </ElementTypeProvider>
  );

  const triggerRef = React.useRef<HTMLSpanElement>(null);

  const firstKey = state?.collection.getFirstKey();

  const renderedItem =
    state?.selectedKey || firstKey
      ? state?.collection.getItem((state?.selectedKey || firstKey) as React.Key)
      : null;

  return (
    <ReactAriaMenuTrigger>
      <ReactAriaButton
        aria-hidden={ariaHidden}
        className={(props) =>
          classnames(tabPicker.container, {
            [tabPicker.states.isSelected]: state?.selectedKey != null,
            [tabPicker.states.isFocusVisible]: props.isFocusVisible,
            [tabPicker.states.isFocused]: props.isFocused,
            [tabPicker.states.isHovered]: props.isHovered,
          })
        }
      >
        {renderedItem?.rendered}
        <span className={tabPicker.icon} ref={triggerRef}>
          <IconChevronBlockEnd />
        </span>
      </ReactAriaButton>
      {isPopover ? (
        <Popover
          shouldUpdatePosition={true}
          containerPadding={0}
          placement="bottom end"
          // Need to apply a offset of 5 because there is left over space at
          // the end of the trigger indicator. But we need to subtract 1 due to
          // the border around the popover
          crossOffset={4}
          triggerRef={triggerRef}
        >
          {content}
        </Popover>
      ) : (
        <Tray>{content}</Tray>
      )}
    </ReactAriaMenuTrigger>
  );
}

export function TabsList<T extends object>(props: TabsListProps<T>) {
  const { children, ...otherProps } = props;

  const contentRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  const [shouldCollapse, setShouldCollapse] = React.useState(false);

  const checkShouldCollapse = React.useCallback(() => {
    if (!listRef.current || !contentRef.current) {
      return;
    }

    const tabs = Array.from(
      listRef.current.querySelectorAll(`.${tabsTab.container}`)
    );

    const lastTab = tabs[tabs.length - 1];

    if (!lastTab) {
      return;
    }

    const { right: lastTabRight } = lastTab.getBoundingClientRect();
    const { right: listRight } = contentRef.current.getBoundingClientRect();

    setShouldCollapse(listRight < lastTabRight);
  }, [setShouldCollapse]);

  React.useEffect(() => {
    checkShouldCollapse();
  }, [children, checkShouldCollapse]);

  useResizeObserver({ ref: contentRef, onResize: checkShouldCollapse });

  const { items } = otherProps;

  return (
    <div
      className={classnames(tabsList.container, {
        [tabsList.states.isCollapsed]: shouldCollapse,
      })}
      ref={contentRef}
    >
      <ElementTypeProvider type="list">
        <ReactAriaTabList
          {...otherProps}
          className={tabsList.list}
          aria-hidden={shouldCollapse}
          ref={listRef}
        >
          {children}
        </ReactAriaTabList>
      </ElementTypeProvider>
      <ElementTypeProvider type="picker">
        <TabPicker items={items} aria-hidden={!shouldCollapse}>
          {children}
        </TabPicker>
      </ElementTypeProvider>
    </div>
  );
}
