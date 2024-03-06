import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRefs } from "~/utils/mergeRefs";
import classNames from "classnames";
import * as React from "react";
import type { AriaToggleButtonProps } from "react-aria";
import {
  mergeProps,
  useFocus,
  useFocusable,
  useFocusManager,
  useFocusRing,
  useHover,
  useKeyboard,
  useLocale,
  useToggleButton,
} from "react-aria";
import { useToggleState } from "react-stately";
import { textEditorToggleButton } from "./_TextEditorToggleButton.css";
import { TextEditorToolbarContext } from "./TextEditorToolbar";

type TextEditorToggleButtonProps = AriaToggleButtonProps & {
  /**
   * Flag to keep the editor focused after the button is clicked,
   * this is usefull to prevent the keyboard from closing when the button is clicked
   *
   * @default true
   */
  keepEditorFocused?: boolean;
};

export const TextEditorToggleButton = React.forwardRef(
  function TextEditorToggleButton(
    props: TextEditorToggleButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) {
    const context = React.useContext(TextEditorToolbarContext);

    const { children, keepEditorFocused = true } = props;

    const { setFocusedElement, focusedElement } = context.state;

    const defaultButtonRef = React.useRef<HTMLButtonElement>(null);

    const buttonRef = mergeRefs(ref, defaultButtonRef);

    const state = useToggleState(props);

    const { buttonProps, isPressed } = useToggleButton(
      { ...props, excludeFromTabOrder: true },
      state,
      defaultButtonRef
    );

    // UI states
    const {
      focusProps: focusRingProps,
      isFocusVisible,
      isFocused,
    } = useFocusRing({});
    const { hoverProps, isHovered } = useHover({});

    // Manage the properties needed for a toolbar item
    const { direction } = useLocale();
    const focusManager = useFocusManager();

    const { keyboardProps } = useKeyboard({
      onKeyDown: (e) => {
        switch (e.key) {
          case "ArrowRight":
          case "ArrowDown": {
            e.preventDefault();

            if (direction === "ltr") {
              focusManager.focusNext({
                wrap: true,
              });
            } else {
              focusManager.focusPrevious({
                wrap: true,
              });
            }
            break;
          }
          case "ArrowLeft":
          case "ArrowUp": {
            e.preventDefault();

            if (direction === "ltr") {
              focusManager.focusPrevious({
                wrap: true,
              });
            } else {
              focusManager.focusNext({
                wrap: true,
              });
            }
            break;
          }
        }
      },
    });

    const { focusProps } = useFocus({
      onFocus: () => {
        if (defaultButtonRef) {
          setFocusedElement(defaultButtonRef);
        }
      },
    });

    const [editor] = useLexicalComposerContext();

    const { focusableProps } = useFocusable({}, defaultButtonRef);

    return (
      <button
        {...mergeProps(
          {
            ...buttonProps,
            onTouchStart: (e: React.TouchEvent<HTMLButtonElement>) => {
              e.preventDefault();

              buttonProps.onTouchStart?.(e);

              if (keepEditorFocused) {
                editor.focus();
              }
            },
            onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();

              buttonProps.onMouseDown?.(e);

              if (keepEditorFocused) {
                editor.focus();
              }
            },
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();

              buttonProps.onClick?.(e);

              if (keepEditorFocused) {
                editor.focus();
              }
            },
          },
          keyboardProps,
          hoverProps,
          focusProps,
          focusRingProps,
          focusableProps
        )}
        tabIndex={
          focusedElement === null || focusedElement === defaultButtonRef
            ? 0
            : -1
        }
        ref={buttonRef}
        className={classNames(textEditorToggleButton.container, {
          [textEditorToggleButton.states.isHovered]: isHovered,
          [textEditorToggleButton.states.isFocused]: isFocused,
          [textEditorToggleButton.states.isFocusVisible]: isFocusVisible,
          [textEditorToggleButton.states.isPressed]: isPressed,
          [textEditorToggleButton.states.isSelected]: state.isSelected,
        })}
      >
        {children}
      </button>
    );
  }
);
