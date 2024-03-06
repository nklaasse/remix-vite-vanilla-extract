import * as React from "react";
import type { TextFieldProps as ReactAriaTextFieldProps } from "react-aria-components";
import { TextField as ReactAriaTextField } from "react-aria-components";
import { Field } from "../Field";
import { TextFieldContextualHelp } from "./TextFieldContextualHelp";
import { TextFieldErrorMessage } from "./TextFieldErrorMessage";
import { TextFieldInput } from "./TextFieldInput";
import { TextFieldLabel } from "./TextFieldLabel";
import { TextFieldReset } from "./TextFieldReset";

type TextFieldContextValue = {
  refs: {
    inputRef: React.RefObject<HTMLInputElement>;
  };
};

export const TextFieldContext = React.createContext<TextFieldContextValue>({
  refs: {
    inputRef: React.createRef<HTMLInputElement>(),
  },
});

export type TextFieldProps = Omit<ReactAriaTextFieldProps, "children"> & {
  children?: React.ReactNode;
};

/**
 * Component which allows custom text entries with a keyboard
 */
export function TextField(props: TextFieldProps) {
  const { children } = props;

  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <TextFieldContext.Provider
      value={{
        refs: {
          inputRef,
        },
      }}
    >
      <ReactAriaTextField {...props}>
        <Field>{children}</Field>
      </ReactAriaTextField>
    </TextFieldContext.Provider>
  );
}

TextField.Input = TextFieldInput;
TextField.Label = TextFieldLabel;
TextField.ErrorMessage = TextFieldErrorMessage;
TextField.Reset = TextFieldReset;
TextField.ContextualHelp = TextFieldContextualHelp;
