import { Field } from "~/components/Field";
import type { InputGroupInputProps } from "~/components/InputGroup";
import { InputGroup } from "~/components/InputGroup";
import { mergeRefs } from "~/utils/mergeRefs";
import * as React from "react";
import { mergeProps } from "react-aria";
import {
  InputContext as ReactAriaInputContext,
  useContextProps,
} from "react-aria-components";
import { TextFieldContext } from "./TextField";

type TextFieldInputProps = Pick<InputGroupInputProps, "placeholder" | "lang">;

/**
 * Component that renders the input for the TextField.
 */
export const TextFieldInput = React.forwardRef<
  HTMLInputElement,
  TextFieldInputProps
>(function TextFieldInput(props, ref) {
  const context = React.useContext(TextFieldContext);

  const { inputRef: contextInputRef } = context.refs;

  const defaultInputRef = React.useRef<HTMLInputElement>(null);

  const [inputProps, reactAriaInputRef] = useContextProps(
    {},
    defaultInputRef,
    ReactAriaInputContext
  );

  const inputRef = mergeRefs(contextInputRef, reactAriaInputRef, ref);

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
        <InputGroup.Input {...mergeProps(inputProps, props)} ref={inputRef} />
      </InputGroup>
    </Field.Input>
  );
});
