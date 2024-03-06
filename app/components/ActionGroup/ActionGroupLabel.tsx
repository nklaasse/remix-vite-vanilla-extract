import type { ActionMenuLabelProps } from "~/components/ActionMenu";
import { ActionMenu } from "~/components/ActionMenu";
import { Button } from "~/components/Button";
import { Tooltip } from "~/components/Tooltip";
import { useElementType } from "./ActionGroup";

export type ActionGroupLabelProps = ActionMenuLabelProps;

/**
 * Optional label which render's the description of the action
 */

export function ActionGroupLabel(props: ActionGroupLabelProps) {
  const elementType = useElementType();

  switch (elementType) {
    case "menu":
      return <ActionMenu.Label {...props} />;
    case "button":
      return <Button.Label {...props} />;
    case "tooltip":
      return <Tooltip {...props} />;
    default:
      return null;
  }
}
