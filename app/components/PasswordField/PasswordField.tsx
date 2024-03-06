import * as React from "react";
import type { TextFieldProps as ReactAriaTextFieldProps } from "react-aria-components";
import { TextField as ReactAriaTextField } from "react-aria-components";
import { Field } from "../Field";
import { PasswordFieldErrorMessage } from "./PasswordFieldErrorMessage";
import { PasswordFieldInput } from "./PasswordFieldInput";
import { PasswordFieldLabel } from "./PasswordFieldLabel";
import { PasswordFieldLink } from "./PasswordFieldLink";

export type PasswordFieldProps = Omit<
  ReactAriaTextFieldProps,
  "type" | "children"
> & {
  children?: React.ReactNode;
};

type PasswordFieldContextValue = {
  refs: {
    inputRef: React.RefObject<HTMLInputElement>;
  };
  state: {
    type: "password" | "text";
    setType: React.Dispatch<React.SetStateAction<"password" | "text">>;
  };
};

export const PasswordFieldContext =
  React.createContext<PasswordFieldContextValue>({
    refs: {
      inputRef: React.createRef<HTMLInputElement>(),
    },
    state: {
      type: "password",
      setType: () => {},
    },
  });

/**
 * Component which allows custom text entries with a keyboard
 */
export function PasswordField(props: PasswordFieldProps) {
  const { children, ...otherProps } = props;

  const inputRef = React.useRef<HTMLInputElement>(null!);

  const [type, setType] = React.useState<"password" | "text">("password");

  return (
    <PasswordFieldContext.Provider
      value={{
        refs: {
          inputRef,
        },
        state: {
          type,
          setType,
        },
      }}
    >
      <ReactAriaTextField {...otherProps} type={type}>
        <Field>{children}</Field>
      </ReactAriaTextField>
    </PasswordFieldContext.Provider>
  );
}

PasswordField.Input = PasswordFieldInput;
PasswordField.Label = PasswordFieldLabel;
PasswordField.ErrorMessage = PasswordFieldErrorMessage;
PasswordField.Link = PasswordFieldLink;
