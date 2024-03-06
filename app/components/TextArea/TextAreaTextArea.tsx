import { Field } from "~/components/Field";
import type { InputGroupTextAreaProps } from "~/components/InputGroup";
import { InputGroup } from "~/components/InputGroup";
import { mergeRefs } from "~/utils/mergeRefs";
import * as React from "react";
import { mergeProps } from "react-aria";
import {
  TextAreaContext as ReactAriaTextAreaContext,
  useContextProps,
} from "react-aria-components";
import { TextAreaContext } from "./TextArea";

type TextAreaTextAreaProps = Pick<
  InputGroupTextAreaProps,
  "placeholder" | "lang" | "rows"
>;

/**
 * Component that renders the input for the TextArea.
 */
export const TextAreaTextArea = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaTextAreaProps
>(function TextAreaInput(props, ref) {
  const context = React.useContext(TextAreaContext);

  const { textAreaRef: contextTextAreaRef } = context.refs;

  const defaultTextAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const [inputProps, reactAriaTextAreaRef] = useContextProps(
    {},
    defaultTextAreaRef,
    ReactAriaTextAreaContext
  );

  const textAreaRef = mergeRefs(reactAriaTextAreaRef, contextTextAreaRef, ref);

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
        <InputGroup.TextArea
          {...mergeProps(inputProps, props)}
          ref={textAreaRef}
        />
      </InputGroup>
    </Field.Input>
  );
});
