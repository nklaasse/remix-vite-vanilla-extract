import { Popover } from "~/components/Popover";
import { IconHelp } from "~/icons/IconHelp";
import { IconProvider } from "~/icons/IconProvider";
import { IconWarning } from "~/icons/IconWarning";
import { mergeRefs } from "~/utils/mergeRefs";
import classNames from "classnames";
import * as React from "react";
import type { AriaButtonProps } from "react-aria";
import {
  mergeProps,
  useButton,
  useFocusRing,
  useHover,
  useOverlayTrigger,
} from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import { action, contextualHelp } from "./ContextualHelp.css";

const icons = {
  help: IconHelp,
  info: IconWarning,
};

export type ContextualHelpProps = {
  /**
   * Indicates whether contents are informative or provides helpful guidance.
   *
   * @default 'help'
   */
  variant?: keyof typeof icons;
  /**
   * Any valid react children
   */
  children: React.ReactNode;
};

export type FieldActionProps = Omit<
  AriaButtonProps,
  "isDisabled" | "children"
> & {
  /**
   * A single item from ~/icons
   */
  children: React.ReactNode;
};

/**
 * @private
 *
 * Action is a component which enhances the field with extra call to actions
 * like reset button, contextual help, etc.
 */
export const Action = React.forwardRef<HTMLButtonElement, FieldActionProps>(
  function FieldAction(
    props: FieldActionProps,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) {
    const { children } = props;

    const defaultButtonRef = React.useRef<HTMLButtonElement>(null);

    const { hoverProps, isHovered } = useHover({});
    const { focusProps, isFocusVisible, isFocused } = useFocusRing({});

    const buttonRef = mergeRefs(defaultButtonRef, ref);

    const { buttonProps, isPressed } = useButton(props, defaultButtonRef);

    return (
      <button
        {...mergeProps(buttonProps, focusProps, hoverProps)}
        ref={buttonRef}
        className={classNames(action.container, {
          [action.states.isHovered]: isHovered,
          [action.states.isFocusVisible]: isFocusVisible,
          [action.states.isFocused]: isFocused,
          [action.states.isPressed]: isPressed,
        })}
      >
        <IconProvider aria-hidden>{children}</IconProvider>
      </button>
    );
  }
);

/**
 * FieldContextualHelp is a component which can provide additional information or helpful guidance to the user.
 */
export function ContextualHelp(props: ContextualHelpProps) {
  const { variant = "help", children } = props;

  const state = useOverlayTriggerState({});

  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const { triggerProps, overlayProps } = useOverlayTrigger(
    {
      type: "dialog",
    },
    state,
    triggerRef
  );

  let overlay;

  if (state.isOpen) {
    overlay = (
      <Popover.Provider
        value={{
          isOpen: state.isOpen,
          onOpenChange: state.setOpen,
        }}
      >
        <Popover {...overlayProps} triggerRef={triggerRef} placement="top">
          <div className={contextualHelp.container}>{children}</div>
        </Popover>
      </Popover.Provider>
    );
  }

  const Icon = icons[variant];

  return (
    <>
      <Action ref={triggerRef} {...triggerProps}>
        <Icon />
      </Action>

      {overlay}
    </>
  );
}
