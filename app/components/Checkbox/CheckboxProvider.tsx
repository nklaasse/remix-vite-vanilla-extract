import * as React from "react";
import type { CheckboxProps as ReactAriaCheckboxProps } from "react-aria-components";

export const CheckboxContext = React.createContext<{
  slot: ReactAriaCheckboxProps["slot"];
}>({
  slot: null,
});

export type CheckboxProviderProps = {
  slot: ReactAriaCheckboxProps["slot"];
  children: React.ReactNode;
};

export function CheckboxProvider(props: CheckboxProviderProps) {
  const { slot, children } = props;

  return (
    <CheckboxContext.Provider value={{ slot }}>
      {children}
    </CheckboxContext.Provider>
  );
}
