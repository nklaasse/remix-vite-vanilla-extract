import classnames from "classnames";
import React from "react";
import { mergeProps, useFocusRing, useHover, useLink } from "react-aria";
import { Link as RouterLink } from "@remix-run/react";
import { anchor } from "./Anchor.css";

export type AnchorProps = {
  /**
   * Link content
   */
  to: string;
  target?: string;
  /**
   * Link content
   */
  children: React.ReactNode;
};

/**
 * Anchor returns a styled link / anchor element
 */
export const Anchor = function (props: AnchorProps) {
  const { children, to } = props;
  const isInternal = to.substring(0, 1) === "/";

  const ref = React.useRef<HTMLAnchorElement | null>(null);

  const { hoverProps, isHovered } = useHover({});
  const { focusProps, isFocusVisible } = useFocusRing({});
  const { linkProps, isPressed } = useLink({}, ref);

  return isInternal ? (
    <RouterLink
      ref={ref}
      {...mergeProps(linkProps, hoverProps, focusProps)}
      className={classnames(anchor.container, {
        [anchor.states.isHovered]: isHovered,
        [anchor.states.isFocusVisible]: isFocusVisible,
        [anchor.states.isPressed]: isPressed,
      })}
      to={to}
    >
      {children}
    </RouterLink>
  ) : (
    <a
      ref={ref}
      {...mergeProps(linkProps, hoverProps, focusProps)}
      className={classnames(anchor.container, {
        [anchor.states.isHovered]: isHovered,
        [anchor.states.isFocusVisible]: isFocusVisible,
        [anchor.states.isPressed]: isPressed,
      })}
      href={to}
    >
      {children}
    </a>
  );
};
