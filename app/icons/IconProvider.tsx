import * as React from "react";
import type { BaseProps } from "./_Base";

type IconContextValue = Omit<BaseProps, "children">;

const IconContext = React.createContext<IconContextValue>({});

type ProviderProps = {
  children: React.ReactNode;
} & IconContextValue;

/**
 * Context provider which allows us the pass default props to all the
 * icons in the tree
 */
export function IconProvider(props: ProviderProps) {
  const { children, ...otherProps } = props;

  return (
    <IconContext.Provider value={otherProps}>{children}</IconContext.Provider>
  );
}

export const useIconProps = () => React.useContext(IconContext);
