import { IconProvider } from "~/icons/IconProvider";
import { mergeRefs } from "~/utils/mergeRefs";
import classNames from "classnames";
import * as React from "react";
import type { AriaButtonProps } from "react-aria";
import { mergeProps, useButton, useFocusRing, useHover } from "react-aria";
import { fieldAction } from "./_FieldAction.css";

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
 * FieldAction is a component which enhances the field with extra call to actions
 * like reset button, contextual help, etc.
 */
export const FieldAction = React.forwardRef<
  HTMLButtonElement,
  FieldActionProps
>(function FieldAction(
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
      className={classNames(fieldAction.container, {
        [fieldAction.states.isHovered]: isHovered,
        [fieldAction.states.isFocusVisible]: isFocusVisible,
        [fieldAction.states.isFocused]: isFocused,
        [fieldAction.states.isPressed]: isPressed,
      })}
    >
      <IconProvider aria-hidden>{children}</IconProvider>
    </button>
  );
});
