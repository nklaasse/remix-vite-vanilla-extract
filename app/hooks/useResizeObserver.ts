import * as React from "react";

type useResizeObserverOptions<T> = {
  onResize: () => void;
  ref: React.RefObject<T>;
};

/**
 * Hook which trigger's if the observed container changes
 *
 * in case the browser doesn't support the ResizeObserver we will
 * fallback to a resize listener
 */
export function useResizeObserver<T extends Element>(
  options: useResizeObserverOptions<T>
) {
  const { onResize, ref } = options;

  React.useEffect(() => {
    if (!ref?.current) {
      return;
    }

    // If resize observe is not supported we fallback to the document resize listener
    // It doesn't support all the cases but it is the best possible fallback
    if (typeof window.ResizeObserver === "undefined") {
      window.addEventListener("resize", onResize, false);

      return () => {
        window.removeEventListener("resize", onResize, false);
      };
    } else {
      const node = ref.current;

      const observer = new window.ResizeObserver((entries) => {
        if (!entries.length) {
          return;
        }

        onResize();
      });

      observer.observe(node);

      return () => {
        if (node) {
          observer.unobserve(node);
        }
      };
    }
  }, [onResize, ref]);
}
