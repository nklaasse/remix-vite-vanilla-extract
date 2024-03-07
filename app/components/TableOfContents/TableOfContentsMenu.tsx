import {
  useTreeState,
  type Node,
  type TreeState,
  useToggleState,
} from "react-stately";
import * as React from "react";
import { treeNode, treeBranch, toggle } from "./TableOfContentsMenu.css";
import classnames from "classnames";
import type { AriaToggleButtonProps, AriaMenuOptions } from "react-aria";
import {
  useMenu,
  useMenuItem,
  mergeProps,
  useKeyboard,
  useHover,
  useFocusRing,
  useToggleButton,
} from "react-aria";
import type { CollectionChildren, Expandable } from "@react-types/shared";
import { useControlledState } from "~/hooks/useControlledState";
import { mergeRefs } from "~/utils/mergeRefs";
import { IconChevronBlockEnd } from "~/icons/IconChevronBlockEnd";

export type ToggleProps = Omit<
  AriaToggleButtonProps,
  "isDisabled" | "children"
>;

/**
 * @private
 *
 * Action is a component which enhances the field with extra call to actions
 * like reset button, contextual help, etc.
 */
export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  function Toggle(props, ref) {
    const defaultButtonRef = React.useRef<HTMLButtonElement>(null);

    const { hoverProps, isHovered } = useHover({});
    const { focusProps, isFocused } = useFocusRing({});

    const buttonRef = mergeRefs(defaultButtonRef, ref);

    const state = useToggleState(props);

    const { buttonProps, isPressed } = useToggleButton(
      {
        excludeFromTabOrder: true,
        ...props,
      },
      state,
      defaultButtonRef
    );

    return (
      <button
        {...mergeProps(buttonProps, focusProps, hoverProps)}
        ref={buttonRef}
        className={classnames(toggle.container, {
          [toggle.states.isHovered]: isHovered,
          [toggle.states.isFocused]: isFocused,
          [toggle.states.isPressed]: isPressed,
          [toggle.states.isSelected]: state.isSelected,
        })}
      >
        <span className={toggle.icon}>
          <IconChevronBlockEnd aria-hidden />
        </span>
      </button>
    );
  }
);

type ExpandableState = {
  open: (key: React.Key) => void;
  close: (key: React.Key) => void;
  toggle: (key: React.Key) => void;
};

type TreeNodeProps = React.HTMLAttributes<HTMLAnchorElement> & {
  item: Node<unknown>;
  state: TreeState<unknown>;
  expandableState: ExpandableState;
};

function TreeNode(props: TreeNodeProps) {
  const { item, state: treeState, expandableState } = props;

  const { hasChildNodes } = item;

  const ref = React.useRef<HTMLLIElement>(null);

  const isExpanded = treeState.expandedKeys.has(item.key);

  const { menuItemProps, labelProps, isSelected, isPressed, isFocused } =
    useMenuItem(
      {
        key: item.key,
      },
      treeState,
      ref
    );

  const { keyboardProps } = useKeyboard({
    onKeyDown: (event) => {
      if (event.code === "ArrowRight") {
        if (hasChildNodes) {
          expandableState.open(item.key);
        }
      } else if (event.code === "ArrowLeft") {
        if (hasChildNodes) {
          expandableState.close(item.key);
        }
      } else if (event.code === "Space") {
        expandableState.toggle(item.key);
      } else {
        event.continuePropagation();
      }
    },
  });

  const { hoverProps, isHovered } = useHover({});

  return (
    <li
      {...mergeProps(keyboardProps, hoverProps, menuItemProps)}
      role="menuitem"
      aria-expanded={isExpanded}
      aria-haspopup={hasChildNodes}
      className={classnames(treeNode.container, {
        [treeNode.states.isSelected]: isSelected,
        [treeNode.states.isExpanded]: isExpanded,
        [treeNode.states.isPressed]: isPressed,
        [treeNode.states.isFocused]: isFocused,
        [treeNode.states.isHovered]: isHovered,
      })}
      ref={ref}
    >
      <a
        className={treeNode.link}
        href={`#${item.key}`}
        tabIndex={-1}
        {...labelProps}
      >
        {hasChildNodes ? (
          <div className={treeNode.indicator}>
            {hasChildNodes ? (
              <Toggle
                isSelected={isExpanded}
                onChange={(isSelected) => {
                  if (isSelected) {
                    expandableState.open(item.key);
                  } else {
                    expandableState.close(item.key);
                  }
                }}
              />
            ) : undefined}
          </div>
        ) : null}

        {item.rendered}
      </a>

      {isExpanded && hasChildNodes ? (
        <TreeBranch
          items={Array.from(item.childNodes)}
          state={treeState}
          expandableState={expandableState}
        />
      ) : null}
    </li>
  );
}

type TreeBranchProps = {
  items: Array<Node<unknown>>;
  state: TreeState<unknown>;
  expandableState: ExpandableState;
} & React.DOMAttributes<HTMLUListElement>;

const TreeBranch = React.forwardRef<HTMLUListElement, TreeBranchProps>(
  function TreeBranch(props, ref) {
    const { items, state, expandableState, ...otherProps } = props;

    return (
      <ul ref={ref} className={treeBranch.container} {...otherProps}>
        {items.map((item) => (
          <TreeNode
            key={item.key}
            item={item}
            state={state}
            expandableState={expandableState}
          />
        ))}
      </ul>
    );
  }
);

type TableOfContentsMenuProps<T> = AriaMenuOptions<T> &
  Expandable & {
    children: CollectionChildren<T>;
  };

export function TableOfContentsMenu<T extends object>(
  props: TableOfContentsMenuProps<T>
) {
  const [expandedKeys, setExpandedKeys] = useControlledState(
    React.useMemo(
      () => (props.expandedKeys ? new Set(props.expandedKeys) : undefined),
      [props.expandedKeys]
    ),
    React.useMemo(
      () =>
        props.defaultExpandedKeys
          ? new Set(props.defaultExpandedKeys)
          : undefined,
      [props.defaultExpandedKeys]
    ),
    props.onExpandedChange
  );

  const state = useTreeState({
    ...props,
    selectionMode: "multiple",
    expandedKeys,
  });

  const expandableState = React.useMemo<ExpandableState>(
    () => ({
      open: (key) => {
        setExpandedKeys((keys = new Set()) => {
          if (keys.has(key)) {
            return keys;
          }

          keys.add(key);

          return new Set(keys);
        });
      },
      close: (key) => {
        setExpandedKeys((keys = new Set()) => {
          if (!keys.has(key)) {
            return keys;
          }

          keys.delete(key);

          return new Set(keys);
        });
      },
      toggle: (key) => {
        setExpandedKeys((keys = new Set()) => {
          if (keys.has(key)) {
            keys.delete(key);
          } else {
            keys.add(key);
          }

          return new Set(keys);
        });
      },
    }),
    [setExpandedKeys]
  );

  const ref = React.useRef<HTMLUListElement>(null);

  const { menuProps } = useMenu(props, state, ref);

  return (
    <TreeBranch
      {...menuProps}
      ref={ref}
      items={Array.from(state.collection)}
      state={state}
      expandableState={expandableState}
    />
  );
}
