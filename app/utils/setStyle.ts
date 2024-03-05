// Helper function to set a style property and return a function to reset it. This
// is useful for setting styles inside of useEffect so that they are properly
// cleaned up when the useEffect changes
export function setStyle(element: HTMLElement, style: string, value: string) {
  const current = element.style.getPropertyPriority(style);
  element.style.setProperty(style, value);

  return () => {
    element.style.setProperty(style, current);
  };
}
