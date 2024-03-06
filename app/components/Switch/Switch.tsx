import classnames from "classnames";
import type { SwitchProps as ReactAriaSwitchProps } from "react-aria-components";
import { Switch as ReactAriaSwitch } from "react-aria-components";
import { _switch } from "./Switch.css";
import { SwitchDescription } from "./SwitchDescription";
import { SwitchInput } from "./SwitchInput";
import { SwitchLabel } from "./SwitchLabel";

export type SwitchProps = ReactAriaSwitchProps;

export function Switch(props: SwitchProps) {
  const { children } = props;

  return (
    <ReactAriaSwitch
      {...props}
      className={(props) =>
        classnames(_switch.container, {
          [_switch.states.isFocused]: props.isFocused,
          [_switch.states.isFocusVisible]: props.isFocusVisible,
          [_switch.states.isSelected]: props.isSelected,
        })
      }
    >
      {children}
    </ReactAriaSwitch>
  );
}

Switch.Label = SwitchLabel;
Switch.Description = SwitchDescription;
Switch.Input = SwitchInput;
