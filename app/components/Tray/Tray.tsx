import { Button } from "~/components/Button";
import { IconCross } from "~/icons/IconCross";
import { mergeRefs } from "~/utils/mergeRefs";
import * as React from "react";
import type { ModalOverlayProps as ReactAriaModalOverlayProps } from "react-aria-components";
import {
  Modal as ReactAriaModal,
  ModalContext as ReactAriaModalContext,
  ModalOverlay as ReactAriaModalOverlay,
} from "react-aria-components";
import { Layer, useLayerIndex } from "../Layer";
import { tray } from "./Tray.css";

export type TrayProps = Omit<
  ReactAriaModalOverlayProps,
  "isOpen" | "defaultOpen" | "onOpenChange" | "children"
> & {
  children?: React.ReactNode;
};

/**
 * Tray elements render a sheet on the bottom of a device, it can be used as a alternative for popovers on mobile
 */
const _Tray = React.forwardRef(function Tray(
  props: TrayProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { children, ...otherProps } = props;

  const defaultOverlayRef = React.useRef<HTMLDivElement>(null);
  const overlayRef = mergeRefs(defaultOverlayRef, ref);
  const index = useLayerIndex("tray");

  return (
    <Layer index={index}>
      <ReactAriaModalOverlay>
        <ReactAriaModal
          {...otherProps}
          className={tray.container}
          style={{
            zIndex: index,
          }}
        >
          {({ state }) => (
            <>
              <div className={tray.underlay} />
              <div className={tray.overlay}>
                <div className={tray.close}>
                  <Button
                    variant="tertiary"
                    size="compact"
                    excludeFromTabOrder
                    onPress={state.close}
                  >
                    <Button.Icon>
                      <IconCross />
                    </Button.Icon>
                  </Button>
                </div>
                <div className={tray.content} ref={overlayRef}>
                  {children}
                </div>
              </div>
            </>
          )}
        </ReactAriaModal>
      </ReactAriaModalOverlay>
    </Layer>
  );
});

type ProviderProps = {
  value: Pick<ReactAriaModalOverlayProps, "isOpen" | "onOpenChange">;
  children: React.ReactNode;
};

/**
 * We introduced the Provider component to make it easy to intergrate the Tray component with components
 * which are not yet build using the React Aria components.
 */
function Provider(props: ProviderProps) {
  const { children, value } = props;
  return (
    <ReactAriaModalContext.Provider value={value}>
      {children}
    </ReactAriaModalContext.Provider>
  );
}

export const Tray = Object.assign(_Tray, {
  Provider,
});
