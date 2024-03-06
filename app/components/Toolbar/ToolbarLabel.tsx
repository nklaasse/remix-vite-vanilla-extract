import type { ActionGroupLabelProps } from "~/components/ActionGroup";
import { ActionGroup } from "~/components/ActionGroup";
import type { ButtonLabelProps } from "~/components/Button";
import { Button } from "~/components/Button";
import { useElementType } from "./Toolbar";
import { toolbarDefaultLabel } from "./ToolbarLabel.css";

export type ToolbarDefaultLabelProps = {
  children: React.ReactNode;
};

export function ToolbarDefaultLabel(props: ToolbarDefaultLabelProps) {
  const { children } = props;

  return <span className={toolbarDefaultLabel.container}>{children}</span>;
}

type ToolbarLabelProps =
  | ToolbarDefaultLabelProps
  | ButtonLabelProps
  | ActionGroupLabelProps;

export function ToolbarLabel(props: ToolbarLabelProps) {
  const { children } = props;

  const type = useElementType();

  switch (type) {
    case "toolbar":
      return <ToolbarDefaultLabel>{children}</ToolbarDefaultLabel>;
    case "button":
      return <Button.Label {...props} />;
    case "actions":
      return <ActionGroup.Label {...props} />;
    default:
      return null;
  }
}
