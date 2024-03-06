import { useAlternativeScript } from "~/hooks/useAlternativeScript";
import type { DOMProps } from "~/utils/filterDOMProps";
import type { TextInputDOMProps } from "@react-types/shared";
import classnames from "classnames";
import * as React from "react";
import { inputGroupInput } from "./InputGroupInput.css";

export type InputGroupInputProps = TextInputDOMProps & DOMProps;

/**
 * InputGroupInput renders a editable input with which the user can interact
 */
export const InputGroupInput = React.forwardRef(function InputGroupInput(
  props: InputGroupInputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const script = useAlternativeScript(props);

  return (
    <input
      {...props}
      className={classnames(inputGroupInput.container, script)}
      ref={ref}
    />
  );
});
