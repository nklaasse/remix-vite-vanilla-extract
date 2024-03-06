import * as React from "react";

export type ActionMenuItemContextValue = {
  props: {
    labelProps?: React.HTMLAttributes<HTMLElement>;
  };
};

export const ActionMenuItemContext =
  React.createContext<ActionMenuItemContextValue>({
    props: {
      labelProps: undefined,
    },
  });
