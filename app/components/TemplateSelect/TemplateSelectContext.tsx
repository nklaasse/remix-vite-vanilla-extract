import * as React from "react";
import type { RadioGroupState } from "react-stately";

export type TemplateSelectContextValue = {
  state: {
    radioGroupState: RadioGroupState;
  };
};

export const TemplateSelectContext =
  React.createContext<TemplateSelectContextValue>(null!);
