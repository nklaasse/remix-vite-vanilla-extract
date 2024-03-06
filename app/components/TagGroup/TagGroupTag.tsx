import classNames from "classnames";
import * as React from "react";
import type { TagProps as ReactAriaTagProps } from "react-aria-components";
import {
  Input as ReactAriaInput,
  Tag as ReactAriaTag,
} from "react-aria-components";
import { tagGroupTag } from "./TagGroupTag.css";

export type TagGroupTagProps = Omit<ReactAriaTagProps, "children"> & {
  children?: React.ReactNode;
};

export function TagGroupTag(props: TagGroupTagProps) {
  const { children, ...otherProps } = props;

  return (
    <ReactAriaTag
      {...otherProps}
      className={(props) =>
        classNames(tagGroupTag.container, {
          [tagGroupTag.states.isHovered]: props.isHovered,
          [tagGroupTag.states.isFocused]: props.isFocused,
          [tagGroupTag.states.isFocusVisible]: props.isFocusVisible,
          [tagGroupTag.states.isSelected]: props.isSelected,
          [tagGroupTag.states.isPressed]: props.isPressed,
        })
      }
    >
      {({ isSelected }) => (
        <div className={tagGroupTag.tag}>
          {isSelected ? <ReactAriaInput value={props.id} /> : null}
          {children}
        </div>
      )}
    </ReactAriaTag>
  );
}
