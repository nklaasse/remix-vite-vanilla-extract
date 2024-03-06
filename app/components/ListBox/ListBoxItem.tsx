import { IconCheck } from "~/icons/IconCheck";
import classNames from "classnames";
import * as React from "react";
import { mergeProps, useHover, useOption } from "react-aria";
import type { ListState, Node } from "react-stately";
import { listBoxItem } from "./ListBoxItem.css";
import { ListBoxItemContext } from "./ListBoxItemContext";

export type ListBoxItemProps<T> = {
  item: Node<T>;
  state: ListState<T>;
};

/**
 * PickerItem is used for internal state management
 */
export function ListBoxItem<T>(props: ListBoxItemProps<T>) {
  const { item, state } = props;

  const ref = React.useRef<HTMLLIElement>(null!);

  const { optionProps, labelProps, isSelected, isFocused, isPressed } =
    useOption(
      {
        "aria-label": item["aria-label"],
        key: item.key,
      },
      state,
      ref
    );

  const { isHovered, hoverProps } = useHover({});

  return (
    <ListBoxItemContext.Provider
      value={{
        props: {
          labelProps,
        },
      }}
    >
      <li
        {...mergeProps(hoverProps, optionProps)}
        className={classNames(listBoxItem.container, {
          [listBoxItem.states.isFocused]: isFocused,
          [listBoxItem.states.isPressed]: isPressed,
          [listBoxItem.states.isHovered]: isHovered,
          [listBoxItem.states.isSelected]: isSelected,
        })}
        data-selected={isSelected}
        data-focused={isFocused}
        ref={ref}
      >
        <span className={listBoxItem.content}>{item.rendered}</span>
        <div className={listBoxItem.indicator}>
          <IconCheck />
        </div>
      </li>
    </ListBoxItemContext.Provider>
  );
}
