import classNames from "classnames";
import * as React from "react";
import type { AriaToggleButtonProps } from "react-aria";
import {
  mergeProps,
  useFocusRing,
  useHover,
  useToggleButton,
} from "react-aria";
import { useToggleState } from "react-stately";
import { toggleButton } from "./ToggleButton.css";
import { ToggleButtonIcon } from "./ToggleButtonIcon";
import { ToggleButtonLabel } from "./ToggleButtonLabel";

export type ToggleButtonProps = AriaToggleButtonProps & {
  /**
   * A ToggleButton.Icon and ToggleButton.Label component
   */
  children: React.ReactNode;

  /**
   * Size of the button
   *
   * @default default
   */
  size?: keyof typeof toggleButton.variants.sizes;
};

export function ToggleButton(props: ToggleButtonProps) {
  const { children, size = "default" } = props;

  const ref = React.useRef<HTMLButtonElement>(null);

  const state = useToggleState(props);

  const { buttonProps, isPressed } = useToggleButton(props, state, ref);

  const { isFocusVisible, focusProps } = useFocusRing();
  const { hoverProps, isHovered } = useHover({});

  const isSelected = state.isSelected;

  return (
    <button
      {...mergeProps(buttonProps, hoverProps, focusProps)}
      className={classNames(
        toggleButton.container,
        toggleButton.variants.sizes[size],
        {
          [toggleButton.states.isHovered]: isHovered,
          [toggleButton.states.isFocusVisible]: isFocusVisible,
          [toggleButton.states.isPressed]: isPressed,
          [toggleButton.states.isSelected]: isSelected,
        }
      )}
    >
      {children}
    </button>
  );
}

ToggleButton.Label = ToggleButtonLabel;
ToggleButton.Icon = ToggleButtonIcon;
