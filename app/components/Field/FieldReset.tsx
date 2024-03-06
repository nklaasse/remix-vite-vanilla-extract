import { IconReset } from "~/icons/IconReset";
import { useIntl } from "react-intl";
import type { FieldActionProps } from "./_FieldAction";
import { FieldAction } from "./_FieldAction";
import { fieldReset } from "./FieldReset.css";

export type FieldResetProps = Omit<FieldActionProps, "children">;

/**
 * FieldReset is a button which can be optionally used to reset the value of an input
 */
export function FieldReset(props: FieldResetProps) {
  const intl = useIntl();

  const label = intl.formatMessage({
    id: "components.fieldReset.fieldResetTooltip",
    description: "Accessible label for the reset button",
    defaultMessage: "Reset",
  });

  return (
    <div className={fieldReset.container}>
      <FieldAction {...props} aria-label={label}>
        <IconReset />
      </FieldAction>
    </div>
  );
}
