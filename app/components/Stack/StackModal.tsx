import * as React from "react";
import { useOverlay } from "react-aria";
import type { OverlayTriggerState } from "react-stately";
import type { StackBaseProps } from "./_StackBase";
import { StackBase } from "./_StackBase";
import { StackBaseOverlay } from "./_StackBaseOverlay";
import type { StackBaseUnderlayProps } from "./_StackBaseUnderlay";
import { StackBaseUnderlay } from "./_StackBaseUnderlay";

export type StackModalProps = Omit<StackBaseProps, "type"> &
  Pick<StackBaseUnderlayProps, "backdrop"> & {
    state: OverlayTriggerState;
  };

/**
 * Renders the content full-screen in case of mobile (The same as Stack.Screen), on desktop / tablet it will be rendered as a mobile.
 * In case there are multiple open modal's it will render the parent screen on the top (background) of the current screen.
 */
export function StackModal(props: StackModalProps) {
  const { children, state, backdrop, ...otherProps } = props;

  const ref = React.useRef<HTMLDivElement>(null!);

  const { overlayProps, underlayProps } = useOverlay(
    {
      ...props,
      isOpen: state.isOpen,
      onClose: state.close,
    },
    ref
  );

  return (
    <StackBase {...otherProps} type="modal">
      <StackBaseUnderlay {...underlayProps} backdrop={backdrop} />
      <StackBaseOverlay {...overlayProps} ref={ref}>
        {children}
      </StackBaseOverlay>
    </StackBase>
  );
}
