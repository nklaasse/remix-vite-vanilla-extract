import { Field } from "~/components/Field";
import { InputGroup } from "~/components/InputGroup";
import { IconChevronBlockEnd } from "~/icons/IconChevronBlockEnd";
import { IconChevronBlockStart } from "~/icons/IconChevronBlockStart";
import classNames from "classnames";
import * as React from "react";
import type { ButtonProps as ReactAriaButtonProps } from "react-aria-components";
import {
  Button as ReactAriaButton,
  Group as ReactAriaGroup,
  InputContext as ReactAriaInputContext,
  useContextProps,
} from "react-aria-components";
import { numberFieldInput, stepper } from "./NumberFieldInput.css";

type StepperProps = Pick<ReactAriaButtonProps, "slot" | "children">;

function Stepper(props: StepperProps) {
  const { children, ...otherProps } = props;
  return (
    <ReactAriaButton
      className={(props) =>
        classNames(stepper.container, {
          [stepper.states.isHovered]: props.isHovered,
          [stepper.states.isFocused]: props.isFocused,
          [stepper.states.isFocusVisible]: props.isFocusVisible,
          [stepper.states.isPressed]: props.isPressed,
        })
      }
      {...otherProps}
    >
      {children}
    </ReactAriaButton>
  );
}

export function NumberFieldInput() {
  const ref = React.useRef<HTMLInputElement>(null);

  const [inputProps, inputRef] = useContextProps(
    {},
    ref,
    ReactAriaInputContext
  );

  return (
    <Field.Input>
      <ReactAriaGroup>
        <InputGroup>
          <InputGroup.Input {...inputProps} ref={inputRef} />
          <InputGroup.Addon>
            <div className={numberFieldInput.steppers}>
              <Stepper slot="increment">
                <IconChevronBlockStart />
              </Stepper>
              <Stepper slot="decrement">
                <IconChevronBlockEnd />
              </Stepper>
            </div>
          </InputGroup.Addon>
        </InputGroup>
      </ReactAriaGroup>
    </Field.Input>
  );
}
