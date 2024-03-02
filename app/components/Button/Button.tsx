import classnames from "classnames";
import * as React from "react";
import type {
  ButtonProps as ReactAriaButtonProps,
  LinkProps as ReactAriaLinkProps,
} from "react-aria-components";
import {
  Button as ReactAriaButton,
  Link as ReactAriaLink,
} from "react-aria-components";
import { button } from "./Button.css";
import { ButtonIcon } from "./ButtonIcon";
import { ButtonLabel } from "./ButtonLabel";

export type ButtonSize = "compact" | "default" | "intro";

type BaseButtonProps = {
  /**
   * Importance of the button in the flow of the user
   *
   * @default primary
   */
  variant?: keyof typeof button.variants.variants;
  /**
   * Size of the button
   *
   * @default default
   */
  size?: keyof typeof button.variants.sizes;
};

export type LinkButtonProps = BaseButtonProps &
  Omit<ReactAriaLinkProps, "children"> & {
    children?: React.ReactNode;
  };
export type ButtonProps = BaseButtonProps &
  Omit<ReactAriaButtonProps, "children"> & {
    children?: React.ReactNode;
  };

const isLinkButton = (
  props: ButtonProps | LinkButtonProps
): props is LinkButtonProps => {
  return (props as LinkButtonProps).href !== undefined;
};

const _Button = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ButtonProps | LinkButtonProps
>(function Button(props, ref) {
  const { size = "default", variant = "primary", children } = props;

  if (isLinkButton(props)) {
    return (
      <ReactAriaLink
        {...props}
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={(props) =>
          classnames(
            button.container,
            button.variants.sizes[size],
            button.variants.variants[variant],
            {
              [button.states.isHovered]: props.isHovered,
              [button.states.isFocused]: props.isFocused,
              [button.states.isPressed]: props.isPressed,
              [button.states.isFocusVisible]: props.isFocusVisible,
              [button.states.isDisabled]: props.isDisabled,
            }
          )
        }
      >
        {children}
      </ReactAriaLink>
    );
  } else {
    return (
      <ReactAriaButton
        {...props}
        ref={ref as React.Ref<HTMLButtonElement>}
        className={(props) =>
          classnames(
            button.container,
            button.variants.sizes[size],
            button.variants.variants[variant],
            {
              [button.states.isHovered]: props.isHovered,
              [button.states.isFocused]: props.isFocused,
              [button.states.isPressed]: props.isPressed,
              [button.states.isFocusVisible]: props.isFocusVisible,
              [button.states.isDisabled]: props.isDisabled,
            }
          )
        }
      >
        {children}
      </ReactAriaButton>
    );
  }
});

export const Button = Object.assign({}, _Button, {
  Icon: ButtonIcon,
  Label: ButtonLabel,
});
