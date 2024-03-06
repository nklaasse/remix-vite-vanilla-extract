import * as React from "react";
import type { StackBaseProps } from "./_StackBase";
import { StackBase } from "./_StackBase";
import { StackBaseOverlay } from "./_StackBaseOverlay";
import { StackBaseUnderlay } from "./_StackBaseUnderlay";

export type StackScreenProps = Omit<StackBaseProps, "type">;

/**
 * Renders the contents always full-screen, in case there is another screen above it in the tree
 * it will render the parent screen on the top (background) of the current screen.
 */
export function StackScreen(props: StackScreenProps) {
  const { children } = props;

  return (
    <StackBase type="screen">
      <StackBaseUnderlay />
      <StackBaseOverlay>{children}</StackBaseOverlay>
    </StackBase>
  );
}
