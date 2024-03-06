import { Stack } from "~/components/Stack";
import { ToastProvider } from "~/components/Toast";
import { modes, utils } from "~/css";
import { assignVars } from "@vanilla-extract/css";
import { setElementVars } from "@vanilla-extract/dynamic";
import * as React from "react";
import { ModalProvider } from "react-aria";

export type ProviderProps = {
  children: React.ReactNode;
};

type VirtualKeyboard = {
  overlaysContent: boolean;
  boundingRect: {
    height: number;
  };
  addEventListener: (type: string, listener: () => void) => void;
  removeEventListener: (type: string, listener: () => void) => void;
};

const virtualKeyboard =
  "virtualKeyboard" in window.navigator
    ? (window.navigator.virtualKeyboard as VirtualKeyboard)
    : null;
const visualViewport =
  "visualViewport" in window ? window.visualViewport : null;

export function Provider(props: ProviderProps) {
  const { children } = props;
  /**
   * Calculate the safe area (Real screen size minus the software keyboard (iOS)),
   * those values are used to display elements above the software keyboard.
   */
  React.useEffect(() => {
    function update() {
      let top = 0;
      let bottom = 0;

      if (virtualKeyboard && virtualKeyboard.overlaysContent) {
        bottom = virtualKeyboard.boundingRect.height;
      } else if (visualViewport) {
        top = Math.max(0, visualViewport.offsetTop);
        bottom = Math.max(
          0,
          document.documentElement.clientHeight -
            window.visualViewport!.height -
            window.visualViewport!.offsetTop
        );
      }

      setElementVars(
        document.body,
        assignVars(utils.safeArea, {
          top: top + "px",
          bottom: bottom + "px",
        })
      );
    }

    if (virtualKeyboard) {
      virtualKeyboard.addEventListener("geometrychange", update);

      return () => {
        virtualKeyboard.removeEventListener("geometrychange", update);
      };
    }

    if (visualViewport) {
      visualViewport.addEventListener("resize", update);

      return () => {
        visualViewport.removeEventListener("resize", update);
      };
    }
  }, []);

  /**
   * Set default color's for the app
   *
   * NOTE: This is in the provider due to us not having full controll
   * over the app rendering, and overlays / portal's depending on those values.
   */
  React.useEffect(() => {
    document.body.classList.add(modes.light);

    return () => {
      document.body.classList.remove(modes.light);
    };
  }, []);

  return (
    <Stack>
      <ToastProvider>
        <ModalProvider>{children}</ModalProvider>
      </ToastProvider>
    </Stack>
  );
}
