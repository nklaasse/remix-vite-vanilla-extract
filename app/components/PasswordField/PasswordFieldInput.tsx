import { Field } from "~/components/Field";
import type { InputGroupInputProps } from "~/components/InputGroup";
import { InputGroup } from "~/components/InputGroup";
import { IconHide } from "~/icons/IconHide";
import { IconShow } from "~/icons/IconShow";
import { mergeRefs } from "~/utils/mergeRefs";
import * as React from "react";
import { mergeProps, useToggleButton } from "react-aria";
import {
  InputContext as ReactAriaInputContext,
  useContextProps,
} from "react-aria-components";
import type { ToggleState } from "react-stately";
import { useToggleState } from "react-stately";
import { Tooltip } from "../Tooltip";
import { PasswordFieldContext } from "./PasswordField";

type PasswordInputToggleProps = {
  state: ToggleState;
};

/**
 * @private
 *
 * Component which renders a toggle button for the password input
 * to show or hide the password, it's a separate component because
 * otherwise the Tooltip wouldn't work.
 */
function PasswordInputToggle(props: PasswordInputToggleProps) {
  const { state } = props;

  const ref = React.useRef<HTMLButtonElement>(null);

  const { buttonProps } = useToggleButton({}, state, ref);

  return (
    <InputGroup.Addon {...buttonProps} ref={ref}>
      {state.isSelected ? <IconHide /> : <IconShow />}
    </InputGroup.Addon>
  );
}

type PasswordFieldInputProps = Pick<
  InputGroupInputProps,
  "placeholder" | "lang"
>;

/**
 * Component that renders the input for the TextField.
 */
export const PasswordFieldInput = React.forwardRef<
  HTMLInputElement,
  PasswordFieldInputProps
>(function PasswordFieldInput(props, ref) {
  const context = React.useContext(PasswordFieldContext);

  const { inputRef: contextInputRef } = context.refs;
  const { type, setType } = context.state;

  const defaultInputRef = React.useRef<HTMLInputElement>(null);

  const [inputProps, reactAriaInputRef] = useContextProps(
    {},
    defaultInputRef,
    ReactAriaInputContext
  );

  const inputRef = mergeRefs(contextInputRef, reactAriaInputRef, ref);

  const state = useToggleState({
    isSelected: type === "text",
    onChange: (isSelected: boolean) => {
      setType(isSelected ? "text" : "password");
    },
  });

  const {
    "aria-invalid": isInvalid,
    disabled: isDisabled,
    readOnly: isReadOnly,
  } = inputProps as unknown as {
    "aria-invalid": boolean;
    disabled: boolean;
    readOnly: boolean;
  };

  return (
    <Field.Input>
      <InputGroup
        states={{
          isInvalid,
          isDisabled,
          isReadOnly,
        }}
      >
        <InputGroup.Input
          {...mergeProps(inputProps, props)}
          type={type}
          ref={inputRef}
        />
        <Tooltip.Trigger>
          <Tooltip>
            {state.isSelected ? "Hide password" : "Show password"}
          </Tooltip>
          <PasswordInputToggle state={state} />
        </Tooltip.Trigger>
      </InputGroup>
    </Field.Input>
  );
});
