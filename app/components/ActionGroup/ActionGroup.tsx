import { ActionMenu } from "~/components/ActionMenu";
import { createElementTypeContext } from "~/components/ElementType";
import { useResizeObserver } from "~/hooks/useResizeObserver";
import type { AriaActionGroupProps } from "@react-aria/actiongroup";
import { createFocusManager } from "@react-aria/focus";
import classnames from "classnames";
import * as React from "react";
import { flushSync } from "react-dom";
import type { Node } from "react-stately";
import { actionGroup } from "./ActionGroup.css";
import { ActionGroupIcon } from "./ActionGroupIcon";
import { ActionGroupItem } from "./ActionGroupItem";
import { ActionGroupLabel } from "./ActionGroupLabel";

export const { ElementTypeProvider, useElementType } = createElementTypeContext<
  "button" | "menu" | "tooltip"
>();

type ActionGroupContextValue = {
  props: {
    disabledKeys?: Iterable<React.Key>;
    onAction?: (key: React.Key) => void;
  };
};

export const ActionGroupContext = React.createContext<ActionGroupContextValue>(
  null!
);

type ActionGroupItemContextValue = {
  props: {
    item: Node<unknown>;
    onAction?: AriaActionGroupProps<unknown>["onAction"];
  };
};

export const ActionGroupItemContext =
  React.createContext<ActionGroupItemContextValue>(null!);

export type ActionGroupProps<T extends object> = (
  | {
      children: (item: T) => React.ReactNode;

      items: Iterable<T>;
    }
  | {
      children: React.ReactNode;

      items?: Iterable<T>;
    }
) & {
  /**
   * Invoked when an action is taken on a child. Especially useful when selectionMode is none. The sole argument key is the key for the item.
   */
  onAction?: (key: React.Key) => void;
  /**
   * A list of keys to disable.
   */
  disabledKeys?: Iterable<React.Key>;
  /**
   * The number of visible items to show before collapsing into a menu.
   */
  maxVisibleItems?: number;
  /**
   * @default 'start'
   */
  align?: keyof typeof actionGroup.variants.align;
  /**
   * @default 'show'
   */
  label?: "show" | "hide";
};

/**
 * ActionGroup is a grouping of one or multiple button's which are related to each other
 */
export function ActionGroup<T extends object>(props: ActionGroupProps<T>) {
  const {
    align = "start",
    label = "show",
    maxVisibleItems,
    disabledKeys,
    onAction,
  } = props;

  const children = React.useMemo(() => {
    if (typeof props.children === "function" && props.items) {
      return React.Children.toArray(
        Array.from(props.items).map(
          props.children as (item: T) => React.ReactNode
        )
      );
    }

    return React.Children.toArray(props.children as React.ReactNode);
  }, [props.children, props.items]);

  const [visibleItems, setVisibleItems] = React.useState(
    React.Children.count(children)
  );

  React.useEffect(() => {
    setVisibleItems(React.Children.count(children));
  }, [children]);

  const wrapperRef = React.useRef<HTMLDivElement>(null!);
  const ref = React.useRef<HTMLDivElement>(null!);

  const focusManager = createFocusManager(wrapperRef);

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (!(e.target instanceof Element && e.currentTarget.contains(e.target))) {
      return;
    }

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        focusManager.focusNext({ wrap: true });
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        focusManager.focusPrevious({ wrap: true });
        break;
    }
  };

  /**
   * Calculate how many item's should be visible, every element rendered is a
   * Button component, so we can assume they will always be of the same height / width
   */
  const calculateVisibleItems = React.useCallback(() => {
    if (!ref.current) {
      return null;
    }

    flushSync(() => {
      setVisibleItems(React.Children.count(children));
    });

    wrapperRef.current.classList.add(actionGroup.states.isCollapsed);

    const items = Array.from(ref.current.children) as HTMLDivElement[];

    if (items.length >= 1) {
      const { scrollWidth, offsetWidth } = ref.current;

      if (scrollWidth <= offsetWidth) {
        if (maxVisibleItems && items.length > maxVisibleItems) {
          setVisibleItems(maxVisibleItems);
        } else {
          wrapperRef.current.classList.remove(actionGroup.states.isCollapsed);
          setVisibleItems(items.length);
        }
        return;
      }

      let remainingWidth = scrollWidth;

      for (let i = items.length; i > 0; i--) {
        if (remainingWidth <= offsetWidth) {
          setVisibleItems(Math.min(i, maxVisibleItems ?? i));
          return;
        }

        remainingWidth -= items[i - 1].offsetWidth;
      }
      setVisibleItems(0);
    }
  }, [children, maxVisibleItems]);

  React.useLayoutEffect(() => {
    calculateVisibleItems();
  }, [calculateVisibleItems]);

  useResizeObserver({
    onResize: React.useCallback(() => {
      calculateVisibleItems();
    }, [calculateVisibleItems]),
    ref: wrapperRef,
  });

  const visibleMenuItems = Array.from(children).slice(0, visibleItems);
  const collapsedMenuItems = Array.from(children).slice(
    visibleItems,
    children.length
  ) as React.ReactElement[];

  return (
    <ActionGroupContext.Provider
      value={{
        props: {
          disabledKeys,
          onAction,
        },
      }}
    >
      <ElementTypeProvider type={label === "show" ? "button" : "tooltip"}>
        <div
          role="presentation"
          className={classnames(
            actionGroup.container,
            actionGroup.variants.align[align],
            {
              [actionGroup.states.isCollapsed]: collapsedMenuItems.length > 0,
            }
          )}
          ref={wrapperRef}
          onKeyDown={onKeyDown}
        >
          <div className={actionGroup.items} ref={ref}>
            {React.Children.map(visibleMenuItems, (child) => (
              <div className={actionGroup.item}>{child}</div>
            ))}
          </div>
          <div className={actionGroup.menu}>
            <ElementTypeProvider type="menu">
              <ActionMenu disabledKeys={disabledKeys} onAction={onAction}>
                <ActionMenu.Button />
                <ActionMenu.Menu>{collapsedMenuItems}</ActionMenu.Menu>
              </ActionMenu>
            </ElementTypeProvider>
          </div>
        </div>
      </ElementTypeProvider>
    </ActionGroupContext.Provider>
  );
}

ActionGroup.Item = ActionGroupItem;
ActionGroup.Label = ActionGroupLabel;
ActionGroup.Icon = ActionGroupIcon;
