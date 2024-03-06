import { createElementTypeContext } from "~/components/ElementType";
import type { MenuProps } from "~/components/Menu";
import * as React from "react";
import type { MenuTriggerProps as ReactAriaMenuTriggerProps } from "react-aria-components";
import { MenuTrigger as ReactAriaMenuTrigger } from "react-aria-components";
import { ActionMenuButton } from "./ActionMenuButton";
import { ActionMenuIcon } from "./ActionMenuIcon";
import { ActionMenuItem } from "./ActionMenuItem";
import { ActionMenuLabel } from "./ActionMenuLabel";
import { ActionMenuMenu } from "./ActionMenuMenu";
import { ActionMenuSeparator } from "./ActionMenuSeparator";

export const { ElementTypeProvider, useElementType } = createElementTypeContext<
  "trigger" | "menu"
>();

type ActionMenuContextValue = {
  props: {
    menuProps: Pick<
      MenuProps<unknown>,
      | "disabledKeys"
      | "onAction"
      | "selectionMode"
      | "selectedKeys"
      | "defaultSelectedKeys"
      | "onSelectionChange"
      | "disallowEmptySelection"
    >;
  };
  refs: {
    triggerIconRef: React.RefObject<HTMLDivElement>;
  };
};

export const ActionMenuContext = React.createContext<ActionMenuContextValue>({
  props: {
    menuProps: {
      disabledKeys: [],
      onAction: () => {},
    },
  },
  refs: {
    triggerIconRef: React.createRef<HTMLDivElement>(),
  },
});

export type ActionMenuProps = Pick<ReactAriaMenuTriggerProps, "trigger"> &
  ActionMenuContextValue["props"]["menuProps"] & {
    children: React.ReactNode;
  };

/**
 * Action menu is a component which can be used for simple "More actions" use cases
 */
export function ActionMenu(props: ActionMenuProps) {
  const { children, trigger, ...menuProps } = props;

  const triggerIconRef = React.useRef<HTMLDivElement>(null);

  return (
    <ActionMenuContext.Provider
      value={{
        props: {
          menuProps,
        },
        refs: {
          triggerIconRef,
        },
      }}
    >
      <ElementTypeProvider type="trigger">
        <ReactAriaMenuTrigger trigger={trigger}>
          {children}
        </ReactAriaMenuTrigger>
      </ElementTypeProvider>
    </ActionMenuContext.Provider>
  );
}

ActionMenu.Button = ActionMenuButton;
ActionMenu.Menu = ActionMenuMenu;
ActionMenu.Item = ActionMenuItem;
ActionMenu.Label = ActionMenuLabel;
ActionMenu.Icon = ActionMenuIcon;
ActionMenu.Separator = ActionMenuSeparator;
