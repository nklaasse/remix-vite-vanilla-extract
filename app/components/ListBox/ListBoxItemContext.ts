import * as React from "react";

export type ListBoxItemContextValue = {
  props: {
    labelProps?: React.HTMLAttributes<HTMLElement>;
  };
};

export const ListBoxItemContext = React.createContext<ListBoxItemContextValue>({
  props: {
    labelProps: undefined,
  },
});
