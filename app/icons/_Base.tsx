import classNames from "classnames";
import * as React from "react";
import { base, ltr, rtl } from "./_Base.css";
import { useIconProps } from "./IconProvider";

export type BaseProps = {
  /**
   * A screen reader only label for the Icon.
   */
  "aria-label"?: string;
  /**
   * The content to display. Should be one or more svg elements
   */
  children: React.ReactNode;
  /**
   * Indicates whether the element is exposed to an accessibility API.
   */
  "aria-hidden"?: boolean | "false" | "true";
  /**
   * Optionally set an animation to the icon.
   *
   * @default still
   */
  animation?: keyof typeof base.variants.animations;
};

type RightToLeftProps = {
  /**
   * The content to display in rtl languages. Should be one or more svg elements
   */
  children: React.ReactNode;
};

/**
 * @private
 *
 * Wrapper which makes the content only visible on rtl languages
 */
function RightToLeft(props: RightToLeftProps) {
  const { children } = props;

  return <g className={rtl.container}>{children}</g>;
}

type LeftToRightProps = {
  /**
   * The content to display in ltr languages. Should be one or more svg elements
   */
  children: React.ReactNode;
};

/**
 * @private
 *
 * Wrapper which makes the content only visible on ltr languages
 */
function LeftToRight(props: LeftToRightProps) {
  const { children } = props;

  return <g className={ltr.container}>{children}</g>;
}

/**
 * @private
 *
 * Root element which all Icon's used in the application should be wrapped in
 * it determines the correct height / width
 */
export function Base(props: BaseProps) {
  const iconProps = useIconProps();

  const {
    children,
    animation = "still",
    "aria-label": ariaLabel,
    "aria-hidden": ariaHidden,
  } = { ...props, ...iconProps };

  return (
    <svg
      className={classNames(
        base.container,
        base.variants.animations[animation]
      )}
      viewBox="0 0 20 20"
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      role="img"
    >
      {children}
    </svg>
  );
}

Base.LeftToRight = LeftToRight;
Base.RightToLeft = RightToLeft;
