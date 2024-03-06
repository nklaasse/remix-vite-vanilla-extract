import { useControlledState } from "~/hooks/useControlledState";
import { IconEdit } from "~/icons/IconEdit";
import classNames from "classnames";
import * as React from "react";
import type { AriaTextFieldOptions } from "react-aria";
import { mergeProps, useFocusRing, useHover, useTextField } from "react-aria";
import { inlineEditable } from "./InlineEditable.css";

export type InlineEditableProps = Omit<
  AriaTextFieldOptions<"textarea">,
  "description" | "errorMessage" | "label"
>;

export function InlineEditable(props: InlineEditableProps) {
  const { value, defaultValue, onChange, ...otherProps } = props;

  const ref = React.useRef<HTMLTextAreaElement>(null);

  const [inputValue, setInputValue] = useControlledState(
    value,
    defaultValue,
    onChange
  );

  const { hoverProps, isHovered } = useHover({});
  const { isFocused, isFocusVisible, focusProps } = useFocusRing({
    within: true,
    isTextInput: true,
  });

  const { inputProps } = useTextField(
    {
      ...otherProps,
      value,
      onChange: setInputValue,
      inputElementType: "textarea",
      onKeyDown: (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
        }
      },
    },
    ref
  );

  return (
    <div
      className={classNames(inlineEditable.container, {
        [inlineEditable.states.isHovered]: isHovered,
        [inlineEditable.states.isFocused]: isFocused,
        [inlineEditable.states.isFocusVisible]: isFocusVisible,
      })}
      data-value={inputValue}
      {...mergeProps(hoverProps, focusProps)}
    >
      <div
        className={inlineEditable.sizer}
        data-value={inputValue}
        data-placeholder={props.placeholder}
      />

      <textarea className={inlineEditable.textarea} {...inputProps} ref={ref} />

      <span className={inlineEditable.indicator}>
        <span className={inlineEditable.indicatorIcon}>
          <IconEdit />
        </span>
      </span>
    </div>
  );
}
