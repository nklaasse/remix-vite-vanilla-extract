import { createContext } from "react";
import type { PressProps } from "react-aria";

export type DisclosureContextValue = {
  state: {
    isExpanded: boolean;
  };
  props: {
    buttonProps: {
      id: string;
      "aria-controls": string;
      "aria-expanded": boolean;
      "onPress": PressProps["onPress"];
    };
    panelProps: {
      id: string;
      "aria-labelledby": string;
    };
  };
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const DisclosureContext = createContext<DisclosureContextValue>(null!);
