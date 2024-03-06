import * as React from "react";
import type { useFetcher, useNavigation } from "react-router-dom";
import type { useDebounceFetcher } from "./useDebounceFetcher";

const DEFAULT_OPTIONS = {
  timeout: 500,
  formMethod: "post" as const,
};

/**
 * Hook which returns true or false if it's time to show a loading indicator
 * this has a threshold of 500ms to prevent the UI from blinking when the API
 * request is fast. But in case it is slow it's good to show the user an indicator
 * showing that something is happening.
 *
 * @returns boolean
 */
export const useIsBusyNavigation = (
  navigation:
    | ReturnType<typeof useNavigation>
    | ReturnType<typeof useFetcher>
    | ReturnType<typeof useDebounceFetcher>,
  options: {
    timeout?: number;
    formMethod?: "post" | "put" | "delete" | "patch";
  } = DEFAULT_OPTIONS
) => {
  const { timeout, formMethod } = { ...options, ...DEFAULT_OPTIONS };

  const [isBusy, setIsBusy] = React.useState(false);

  const tId = React.useRef<NodeJS.Timeout | undefined>(undefined);

  React.useEffect(() => {
    if (navigation.state === "idle" || navigation.formMethod !== formMethod) {
      setIsBusy(false);
      return;
    }

    tId.current = setTimeout(() => {
      setIsBusy(true);
    }, timeout);

    return () => {
      if (tId.current) {
        clearTimeout(tId.current);
      }
    };
  }, [navigation.formMethod, navigation.state, formMethod, timeout]);

  return isBusy;
};
