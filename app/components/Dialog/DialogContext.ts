import * as React from "react";
import type { ButtonProps } from "../Button";

export type DialogContextValue = {
  props: {
    titleProps: React.HTMLAttributes<HTMLElement>;
    closeProps: Pick<ButtonProps, "onPress">;
  };
};

export const DialogContext = React.createContext<DialogContextValue>(null!);
