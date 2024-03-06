import { ToastQueue } from "@react-stately/toast";
import React from "react";
import type { ToastContentType } from "./Toast";

type ToastProviderContextValue = {
  state: {
    queue: ToastQueue<ToastContentType>;
  };
};

export const ToastProviderContext =
  React.createContext<ToastProviderContextValue>(null!);

type ToastProviderProps = {
  children: React.ReactNode;
};

const toastQueue = new ToastQueue<ToastContentType>({
  maxVisibleToasts: 5,
});

/**
 * Component which will manage the state for the toast queue
 */
export function ToastProvider(props: ToastProviderProps) {
  const { children } = props;

  return (
    <ToastProviderContext.Provider
      value={{
        state: {
          queue: toastQueue,
        },
      }}
    >
      {children}
    </ToastProviderContext.Provider>
  );
}
