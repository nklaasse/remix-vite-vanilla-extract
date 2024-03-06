import type { ButtonLabelProps, ButtonProps } from "~/components/Button";
import { Button } from "~/components/Button";
import { formReset } from "./FormReset.css";

export type FormResetProps = Omit<ButtonProps, "color" | "variant" | "Icon"> &
  Pick<ButtonLabelProps, "children"> & {
    /**
     * The behaviour of the button when used in a HTML form
     *
     * @default reset
     */
    type?: ButtonProps["type"];
  };

/**
 * The FormReset provides a secondary action to a Form component,
 * by default it act's as a reset button which clears the form's contents.
 */
export function FormReset(props: FormResetProps) {
  const { type = "reset", children, ...otherProps } = props;

  return (
    <div className={formReset.container}>
      <Button {...otherProps} type={type} variant="secondary">
        <Button.Label>{children}</Button.Label>
      </Button>
    </div>
  );
}
