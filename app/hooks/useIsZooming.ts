import React from "react";
import { body } from "./useIsZooming.css";

/**
 * Hook which overides the cursor property when a user is dragging (Slider / DnD).
 */
export function useIsZooming(state: false | "zoom-in" | "zoom-out") {
  React.useEffect(() => {
    if (state === "zoom-in") {
      document.body.classList.add(body.states.isZoomingIn);
    } else if (state === "zoom-out") {
      document.body.classList.add(body.states.isZoomingOut);
    }

    return () => {
      document.body.classList.remove(body.states.isZoomingIn);
      document.body.classList.remove(body.states.isZoomingOut);
    };
  }, [state]);
}
