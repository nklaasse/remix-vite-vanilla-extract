import type { ActionGroupIconProps } from "~/components/ActionGroup";
import { ActionGroup } from "~/components/ActionGroup";
import type { ButtonIconProps } from "~/components/Button";
import { Button } from "~/components/Button";
import { useElementType } from "./Toolbar";

export type ToolbarButtonIconProps = ButtonIconProps;

function ToolbarButtonIcon(props: ToolbarButtonIconProps) {
  const { children, ...otherProps } = props;

  return <Button.Icon {...otherProps}>{children}</Button.Icon>;
}

export type ToolbarIconProps = ToolbarButtonIconProps | ActionGroupIconProps;

export function ToolbarIcon(props: ToolbarIconProps) {
  const type = useElementType();

  switch (type) {
    case "button":
      return <ToolbarButtonIcon {...props} />;
    case "actions":
      return <ActionGroup.Icon {...props} />;
    default:
      return null;
  }
}
