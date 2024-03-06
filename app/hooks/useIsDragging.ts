import React from "react";
import { body } from "./useIsDragging.css";

/**
 * Hook which overides the cursor property when a user is dragging (Slider / DnD).
 */
export function useIsDragging(isDragging: boolean) {
  React.useEffect(() => {
    if (isDragging) {
      document.body.classList.add(body.states.isDragging);
    } else {
      document.body.classList.remove(body.states.isDragging);
    }

    return () => {
      document.body.classList.remove(body.states.isDragging);
    };
  }, [isDragging]);
}
