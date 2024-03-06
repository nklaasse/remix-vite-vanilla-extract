import * as React from "react";

export type AccordionItemContextValue = {
  refs: {
    buttonRef: React.RefObject<HTMLButtonElement>;
  };
  state: {
    isExpanded: boolean;
  };
  props: {
    buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    regionProps?: React.DOMAttributes<HTMLDivElement>;
  };
};

export const AccordionItemContext =
  React.createContext<AccordionItemContextValue>(null!);
