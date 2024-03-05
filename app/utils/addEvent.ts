// Helper function to add an event listener and return a function to remove it
// This is useful for adding events inside useEffect so that they are
// properly cleaned up when the useEffect changes
export function addEvent<K extends keyof GlobalEventHandlersEventMap>(
  target: GlobalEventHandlers,
  event: K,
  handler: (
    this: GlobalEventHandlers,
    ev: GlobalEventHandlersEventMap[K]
  ) => void,
  options?: AddEventListenerOptions
) {
  target.addEventListener(event, handler, options);

  return () => {
    target.removeEventListener(event, handler, options);
  };
}
