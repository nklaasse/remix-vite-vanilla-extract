import { useIsSSR } from "@react-aria/ssr";
import * as React from "react";

export function useMediaQuery(query: string) {
  const supportsMatchMedia =
    typeof window !== "undefined" && typeof window.matchMedia === "function";
  const [matches, setMatches] = React.useState(() =>
    supportsMatchMedia ? window.matchMedia(query).matches : false
  );

  React.useEffect(() => {
    if (!supportsMatchMedia) {
      return;
    }

    const mq = window.matchMedia(query);
    const onChange = (evt: MediaQueryListEvent) => {
      setMatches(evt.matches);
    };

    // We use addListener instead of addEventListener due to the safari versions we want to support
    mq.addListener(onChange);
    return () => {
      mq.removeListener(onChange);
    };
  }, [supportsMatchMedia, query]);

  // If in SSR, the media query should never match. Once the page hydrates,
  // this will update and the real value will be returned.
  const isSSR = useIsSSR();
  return isSSR ? false : matches;
}
