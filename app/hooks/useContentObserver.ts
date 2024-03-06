import * as React from "react";

export function useContentObserver(
  contentRef: React.RefObject<HTMLDivElement>
) {
  const observer = React.useRef<IntersectionObserver | null>(null);

  React.useLayoutEffect(() => {
    if (!contentRef.current) {
      return;
    }

    const handleObsever = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        // if content is active, update the hash in the URL
        if (entry?.isIntersecting) {
          let node = entry.target as HTMLElement;
          do {
            if (node.nodeName === "H2" || node.nodeName === "H3") {
              break;
            }
            node = node.previousElementSibling as HTMLElement;
          } while (node);
          if (node.id) {
            window.location.hash = `#${node.id}`;
          }
        }
      });
    };
    observer.current = new IntersectionObserver(handleObsever, {
      rootMargin: "0px 0px -98%",
    });

    const elements = contentRef.current.children.namedItem(
      "typography-container"
    )?.childNodes as NodeListOf<HTMLElement> | undefined;

    if (elements) {
      elements.forEach((elem) => observer.current?.observe(elem));
    }

    return () => observer.current?.disconnect();
  }, [contentRef]);
}
