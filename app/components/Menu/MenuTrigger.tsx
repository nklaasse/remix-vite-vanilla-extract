import * as React from "react";
import type { AriaMenuOptions, AriaMenuTriggerProps } from "react-aria";
import { MenuTrigger as ReactAriaMenuTrigger } from "react-aria-components";
import { ElementTypeProvider } from "./Menu";

/**
 * Context for the MenuTrigger component
 */
export type MenuTriggerContextValue = {
  refs: {
    triggerIconRef: React.MutableRefObject<HTMLDivElement>;
  };
};

export const MenuTriggerContext = React.createContext<MenuTriggerContextValue>(
  null!
);

export type MenuTriggerProps<T> = AriaMenuTriggerProps &
  AriaMenuOptions<T> & {
    /**
     * A MenuButton and Menu component
     */
    children: React.ReactNode;
  };

/**
 * MenuTrigger is a component which can display a list of actions or options that a user can choose.
 */
export function MenuTrigger<T>(props: MenuTriggerProps<T>) {
  const { children } = props;

  const triggerIconRef = React.useRef<HTMLDivElement>(null!);

  return (
    <MenuTriggerContext.Provider
      value={{
        refs: {
          triggerIconRef,
        },
      }}
    >
      <ReactAriaMenuTrigger>
        <ElementTypeProvider type="trigger">{children}</ElementTypeProvider>
      </ReactAriaMenuTrigger>
    </MenuTriggerContext.Provider>
  );
}
