// Get the first scrollable parent of a DOM Node
export function getScrollableParent(
  node: Element | null,
  direction?: "inline" | "block"
): Element {
  // If node is empty this means we have checked all the elements
  if (!node) {
    return document.scrollingElement || document.documentElement;
  }

  const style = window.getComputedStyle(node);

  if (direction === "inline") {
    if (/(auto|scroll)/.test(style.overflowX)) {
      return node;
    }
  } else if (direction === "block") {
    if (/(auto|scroll)/.test(style.overflowY)) {
      return node;
    }
  } else {
    if (
      /(auto|scroll)/.test(style.overflow + style.overflowX + style.overflowY)
    ) {
      return node;
    }
  }

  return getScrollableParent(node.parentElement, direction);
}
