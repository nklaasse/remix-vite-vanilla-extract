import { useToastQueue } from "@react-stately/toast";
import React from "react";
import { ToastProviderContext } from "./ToastProvider";

export const useToastState = () => {
  const context = React.useContext(ToastProviderContext);

  return useToastQueue(context.state.queue);
};
