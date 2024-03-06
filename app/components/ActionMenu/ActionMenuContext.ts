import * as React from "react";
import type { AriaButtonProps } from "react-aria";
import type { MenuTriggerState } from "react-stately";

export type ActionMenuContextValue = {
  refs: {
    menuTriggerRef: React.MutableRefObject<HTMLButtonElement>;
  };
  state: {
    menuState: MenuTriggerState;
  };
  props: {
    menuProps: React.HTMLAttributes<HTMLElement>;
    menuTriggerProps: AriaButtonProps<"button">;
  };
};

export const ActionMenuContext = React.createContext<ActionMenuContextValue>(
  null!
);
