import type { ButtonProps } from "~/components/Button";
import * as React from "react";

export type AlertDialogContextValue = {
  props: {
    titleProps: React.HTMLAttributes<HTMLElement>;
    cancelProps: ButtonProps;
    confirmProps: ButtonProps;
  };
};

export const AlertDialogContext = React.createContext<AlertDialogContextValue>(
  null!
);
