import type { ActionMenuItemProps } from "~/components/ActionMenu";
import { ActionMenu } from "~/components/ActionMenu";
import type { ButtonProps } from "~/components/Button";
import { Button } from "~/components/Button";
import { Tooltip } from "~/components/Tooltip";
import * as React from "react";
import { mergeProps } from "react-aria";
import { ActionGroupContext, useElementType } from "./ActionGroup";

type ActionGroupButtonProps = Omit<
  ButtonProps,
  "size" | "variant" | "isDisabled"
> & {
  id: string;
};

function ActionGroupButton(props: ActionGroupButtonProps) {
  const { children, id, ...otherProps } = props;

  const context = React.useContext(ActionGroupContext);

  const { disabledKeys, onAction } = context.props;

  const onPress = () => {
    if (onAction) {
      onAction(id);
    }
  };

  let isDisabled = false;

  if (disabledKeys) {
    isDisabled = Array.from(disabledKeys).includes(id);
  }

  return (
    <Button
      {...mergeProps(otherProps, {
        onPress,
      })}
      size="compact"
      variant="tertiary"
      isDisabled={isDisabled}
    >
      {children}
    </Button>
  );
}

type ActionGroupTooltipProps = ActionGroupButtonProps;

function ActionGroupTooltip(props: ActionGroupTooltipProps) {
  return (
    <Tooltip.Trigger>
      <ActionGroupButton {...props} />
    </Tooltip.Trigger>
  );
}

type ActionGroupMenuItemProps<T> = ActionMenuItemProps<T>;

function ActionGroupMenuItem<T extends object>(
  props: ActionGroupMenuItemProps<T>
) {
  const { children, ...otherProps } = props;

  return <ActionMenu.Item {...otherProps}>{children}</ActionMenu.Item>;
}

export type ActionGroupItemProps<T> =
  | ActionGroupButtonProps
  | ActionGroupTooltipProps
  | ActionGroupMenuItemProps<T>;

export function ActionGroupItem<T extends object>(
  props: ActionGroupItemProps<T>
) {
  const type = useElementType();

  switch (type) {
    case "button":
      return <ActionGroupButton {...(props as ActionGroupButtonProps)} />;
    case "tooltip":
      return <ActionGroupTooltip {...(props as ActionGroupTooltipProps)} />;
    case "menu":
      return (
        <ActionGroupMenuItem<T> {...(props as ActionGroupMenuItemProps<T>)} />
      );
    default:
      return null;
  }
}
