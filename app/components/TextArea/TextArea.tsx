import * as React from "react";
import type { TextFieldProps as ReactAriaTextFieldProps } from "react-aria-components";
import { TextField as ReactAriaTextField } from "react-aria-components";
import { Field } from "../Field";
import { TextAreaContextualHelp } from "./TextAreaContextualHelp";
import { TextAreaErrorMessage } from "./TextAreaErrorMessage";
import { TextAreaLabel } from "./TextAreaLabel";
import { TextAreaReset } from "./TextAreaReset";
import { TextAreaTextArea } from "./TextAreaTextArea";

type TextAreaContextValue = {
  refs: {
    textAreaRef: React.RefObject<HTMLTextAreaElement>;
  };
};

export const TextAreaContext = React.createContext<TextAreaContextValue>({
  refs: {
    textAreaRef: React.createRef<HTMLTextAreaElement>(),
  },
});

export type TextAreaProps = Omit<
  ReactAriaTextFieldProps,
  "type" | "children"
> & {
  children?: React.ReactNode;
};

/**
 * Component which allows custom text entries with a keyboard
 */
export function TextArea(props: TextAreaProps) {
  const { children } = props;

  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  return (
    <TextAreaContext.Provider
      value={{
        refs: {
          textAreaRef,
        },
      }}
    >
      <ReactAriaTextField {...props}>
        <Field>{children}</Field>
      </ReactAriaTextField>
    </TextAreaContext.Provider>
  );
}

TextArea.TextArea = TextAreaTextArea;
TextArea.Label = TextAreaLabel;
TextArea.ErrorMessage = TextAreaErrorMessage;
TextArea.Reset = TextAreaReset;
TextArea.ContextualHelp = TextAreaContextualHelp;
