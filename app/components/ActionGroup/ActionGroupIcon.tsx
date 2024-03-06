import type { ActionMenuIconProps } from "../ActionMenu";
import { ActionMenu } from "../ActionMenu";
import { Button } from "../Button";
import { useElementType } from "./ActionGroup";

export type ActionGroupIconProps = ActionMenuIconProps;

/**
 * Icon which represent's the rendered Action
 */
export function ActionGroupIcon(props: ActionGroupIconProps) {
  const elementType = useElementType();

  switch (elementType) {
    case "button":
    case "tooltip":
      return <Button.Icon {...props} />;
    case "menu":
      return <ActionMenu.Icon {...props} />;
    default:
      return null;
  }
}
