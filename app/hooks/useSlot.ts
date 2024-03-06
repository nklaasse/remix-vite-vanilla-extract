import * as React from "react";

/**
 * Hook which can be used to detect whether a component has been mounted
 * as a child of a wrapper component
 */
export function useSlot(): [React.RefCallback<Element>, boolean] {
  // Initially we're assuming that the children are all provided
  const [hasSlot, setHasSlot] = React.useState(true);
  // Keep track whether we checked the children
  const hasRun = React.useRef(false);

  // A callback ref which will run when the slotted element mounts.
  // This should happen before the useLayoutEffect below.
  const ref = React.useCallback((el: Element) => {
    hasRun.current = true;
    setHasSlot(!!el);
  }, []);

  // If the callback hasn't been called, then reset to false.
  React.useLayoutEffect(() => {
    if (!hasRun.current) {
      setHasSlot(false);
    }
  }, []);

  return [ref, hasSlot];
}
