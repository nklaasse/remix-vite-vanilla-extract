import type { CheckboxProps } from "~/components/Checkbox";
import { Checkbox } from "~/components/Checkbox";

export type TableCheckboxProps = Pick<CheckboxProps, "name">;

export function TableCheckbox(props: TableCheckboxProps) {
  return (
    <Checkbox.Provider slot="selection">
      <Checkbox {...props} />
    </Checkbox.Provider>
  );
}
