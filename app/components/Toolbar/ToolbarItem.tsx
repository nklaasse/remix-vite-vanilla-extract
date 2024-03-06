import type { ActionGroupItemProps } from "~/components/ActionGroup";
import { ActionGroup } from "~/components/ActionGroup";
import type { ButtonProps } from "~/components/Button";
import { Button } from "~/components/Button";
import { ElementTypeProvider, useElementType } from "./Toolbar";

type ToolbarButtonProps = Omit<ButtonProps, "size" | "variant"> & {
  /**
   * @default 'tertiary'
   */
  variant?: ButtonProps["variant"];
};

function ToolbarButton(props: ToolbarButtonProps) {
  const { children, variant = "tertiary", ...otherProps } = props;

  return (
    <ElementTypeProvider type="button">
      <Button {...otherProps} size="compact" variant={variant}>
        {children}
      </Button>
    </ElementTypeProvider>
  );
}

type ToolbarActionGroupItemProps<T> = ActionGroupItemProps<T>;

function ToolbarActionGroupItem<T extends object>(
  props: ToolbarActionGroupItemProps<T>
) {
  return <ActionGroup.Item {...props} />;
}

export type ToolbarItemProps<T> =
  | ToolbarButtonProps
  | ToolbarActionGroupItemProps<T>;

export function ToolbarItem<T extends object>(props: ToolbarItemProps<T>) {
  const type = useElementType();

  switch (type) {
    case "toolbar":
      return <ToolbarButton {...(props as ToolbarButtonProps)} />;
    case "actions":
      return (
        <ToolbarActionGroupItem
          {...(props as ToolbarActionGroupItemProps<T>)}
        />
      );
    default:
      return null;
  }
}
