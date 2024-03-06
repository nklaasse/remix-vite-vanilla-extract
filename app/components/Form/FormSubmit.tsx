import type { ButtonLabelProps, ButtonProps } from "../Button";
import { Button } from "../Button";
import { formSubmit } from "./FormSubmit.css";

export type FormSubmitProps = Omit<ButtonProps, "type" | "color" | "type"> &
  Pick<ButtonLabelProps, "children">;

/**
 * The FormSubmit components add a Submit handler to the form
 */
export function FormSubmit(props: FormSubmitProps) {
  const { children, ...otherProps } = props;

  return (
    <div className={formSubmit.container}>
      <Button {...otherProps} type="submit">
        <Button.Label>{children}</Button.Label>
      </Button>
    </div>
  );
}
