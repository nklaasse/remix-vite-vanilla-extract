import classNames from "classnames";
import * as React from "react";
import { mergeProps, useFocusRing, useHover } from "react-aria";
import { inputGroup } from "./InputGroup.css";
import { InputGroupAddon } from "./InputGroupAddon";
import { InputGroupButton } from "./InputGroupButton";
import { InputGroupInput } from "./InputGroupInput";
import { InputGroupTextArea } from "./InputGroupTextArea";
import { InputGroupValue } from "./InputGroupValue";

export type InputGroupStates = {
  /**
   * Is there a open dialog triggered by the input group
   *
   * @default false
   */
  isExpanded?: boolean;
  /**
   * Is the user didn't end the press event
   *
   * @default false
   */
  isPressed?: boolean;
  /**
   * Is the user want's to drop a file upon the input group
   *
   * @default false
   */
  isDropTarget?: boolean;
  /**
   * If the entered value is invalid
   *
   * @default false
   */
  isInvalid?: boolean;
  /**
   * If the input is disabled
   *
   * @default false
   */
  isDisabled?: boolean;
  /**
   * If the input is readonly
   *
   * @default false
   */
  isReadOnly?: boolean;
};

export type InputGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * One or multiple of InputGroup.Value, InputGroup.Input, InputGroup.Addon, InputGroup.Button
   */
  children: React.ReactNode;

  /**
   * Overwrite the default component UI states
   */
  states?: InputGroupStates;

  /**
   * Border style of the input group
   *
   * @default 'solid'
   */
  border?: keyof typeof inputGroup.variants.border;
};

/**
 * Easily extend form controls by adding text, buttons, or button groups on either side of textual inputs, custom selects, and custom file inputs.
 */
const _InputGroup = React.forwardRef(function InputGroup(
  props: InputGroupProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { children, states, border = "solid", ...otherProps } = props;

  const { hoverProps, isHovered } = useHover({});
  const { focusProps, isFocused, isFocusVisible } = useFocusRing({
    within: true,
  });

  const isExpanded = states?.isExpanded ?? props["aria-expanded"] === true;
  const isInvalid = states?.isInvalid ?? props["aria-invalid"] === true;

  const isPressed = states?.isPressed ?? false;
  const isDropTarget = states?.isDropTarget ?? false;

  const isDisabled = states?.isDisabled ?? props["aria-disabled"] === true;
  const isReadOnly = states?.isReadOnly ?? props["aria-readonly"] === true;

  return (
    <div
      {...mergeProps(otherProps, focusProps, hoverProps)}
      className={classNames(
        inputGroup.container,
        inputGroup.variants.border[border],
        {
          [inputGroup.states.isExpanded]: isExpanded,
          [inputGroup.states.isPressed]: isPressed,
          [inputGroup.states.isFocusVisible]: isFocusVisible,
          [inputGroup.states.isFocused]: isFocused,
          [inputGroup.states.isHovered]: isHovered,
          [inputGroup.states.isDropTarget]: isDropTarget,
          [inputGroup.states.isInvalid]: isInvalid,
          [inputGroup.states.isDisabled]: isDisabled,
          [inputGroup.states.isReadOnly]: isReadOnly,
        }
      )}
      ref={ref}
    >
      {children}
    </div>
  );
});

export const InputGroup = Object.assign(_InputGroup, {
  Addon: InputGroupAddon,
  Button: InputGroupButton,
  Value: InputGroupValue,
  Input: InputGroupInput,
  TextArea: InputGroupTextArea,
});
