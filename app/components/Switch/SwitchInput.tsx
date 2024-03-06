import { IconCheckDense } from "~/icons/IconCheckDense";
import classnames from "classnames";
import { useHover } from "react-aria";
import { switchInput } from "./SwitchInput.css";

export function SwitchInput() {
  const { hoverProps, isHovered } = useHover({});

  return (
    <div
      className={classnames(switchInput.container, {
        [switchInput.states.isHovered]: isHovered,
      })}
      {...hoverProps}
    >
      <div className={switchInput.indicator}>
        <IconCheckDense aria-hidden />
      </div>
    </div>
  );
}
