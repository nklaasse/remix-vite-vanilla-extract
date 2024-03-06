import * as React from "react";
import { inputGroupTextArea } from "./InputGroupTextArea.css";

export type InputGroupTextAreaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 * InputGroupTextArea renders a editable textarea with which the user can interact
 */
export const InputGroupTextArea = React.forwardRef(function InputGroupTextArea(
  props: InputGroupTextAreaProps,
  ref: React.ForwardedRef<HTMLTextAreaElement>
) {
  return (
    <textarea
      {...props}
      className={inputGroupTextArea.container}
      ref={ref}
    ></textarea>
  );
});
