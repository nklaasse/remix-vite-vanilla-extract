// Helper function which determines if the software keyboard is open
export function isSoftwareKeyboardOpen() {
  const visualViewport = window.visualViewport;

  if (visualViewport) {
    return visualViewport.height < window.innerHeight;
  }

  return false;
}
