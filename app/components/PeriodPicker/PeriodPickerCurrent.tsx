import type { CheckboxProps } from "~/components/Checkbox";
import { Checkbox } from "~/components/Checkbox";
import { useControlledState } from "~/hooks/useControlledState";
import * as React from "react";
import { PeriodPickerContext } from "./PeriodPickerContext";
import { periodPickerCurrent } from "./PeriodPickerCurrent.css";

export type PeriodPickerCurrentProps = CheckboxProps & {
  label: string;
};

/**
 * Be able to toggle the Period to be still ongoing
 */
export function PeriodPickerCurrent(props: PeriodPickerCurrentProps) {
  const { label, ...otherProps } = props;

  const context = React.useContext(PeriodPickerContext);

  const { setEndDateIsCurrent } = context.state;

  const [isSelected, setIsSelected] = useControlledState<boolean>(
    props.isSelected,
    props.defaultSelected,
    props.onChange
  );

  React.useEffect(() => {
    setEndDateIsCurrent(isSelected ? props.value || null : null);
  }, [isSelected, props.value, setEndDateIsCurrent]);

  return (
    <div className={periodPickerCurrent.container}>
      <Checkbox
        {...otherProps}
        isSelected={isSelected}
        onChange={setIsSelected}
      >
        {label}
      </Checkbox>
    </div>
  );
}
