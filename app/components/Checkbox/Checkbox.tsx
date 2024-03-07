import { IconCheckDense } from "~/icons/IconCheckDense";
import { IconMinDense } from "~/icons/IconMinDense";
import classnames from "classnames";
import * as React from "react";
import type { CheckboxProps as ReactAriaCheckboxProps } from "react-aria-components";
import { Checkbox as ReactAriaCheckbox } from "react-aria-components";
import { checkbox } from "./Checkbox.css";
import { CheckboxContext, CheckboxProvider } from "./CheckboxProvider";

export type CheckboxProps = Omit<
  ReactAriaCheckboxProps,
  "className" | "style" | "children"
> & {
  children?: React.ReactNode;
};

const _Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(props, _ref) {
    const { slot } = React.useContext(CheckboxContext);

    const { children, ...otherProps } = props;

    return (
      <ReactAriaCheckbox
        slot={slot}
        {...otherProps}
        className={(props) =>
          classnames(checkbox.container, {
            [checkbox.states.isHovered]: props.isHovered,
            [checkbox.states.isFocusVisible]: props.isFocusVisible,
            [checkbox.states.isFocused]: props.isFocused,
            [checkbox.states.isSelected]: props.isSelected,
            [checkbox.states.isIndeterminate]: props.isIndeterminate,
          })
        }
      >
        <div className={checkbox.indicator}>
          <div className={checkbox.checked}>
            <IconCheckDense aria-hidden />
          </div>
          <div className={checkbox.indeterminate}>
            <IconMinDense aria-hidden />
          </div>
        </div>

        {children ? <span className={checkbox.label}>{children}</span> : null}
      </ReactAriaCheckbox>
    );
  }
);

export const Checkbox = Object.assign(_Checkbox, {
  Provider: CheckboxProvider,
});
