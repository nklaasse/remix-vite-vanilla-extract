import * as React from "react";
import { StackModal } from "./StackModal";
import { StackScreen } from "./StackScreen";

export type StackProps = {
  /**
   * Any valid react element
   */
  children: React.ReactNode;
};

/**
 * Stack can be used to create the same effect as full screen modals on iOS devices
 */
export function Stack(props: StackProps) {
  const { children } = props;

  return <>{children}</>;
}

Stack.Screen = StackScreen;
Stack.Modal = StackModal;
