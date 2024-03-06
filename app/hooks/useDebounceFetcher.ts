import * as React from "react";
import type { SubmitOptions } from "react-router-dom";
import { useFetcher } from "react-router-dom";

type SubmitTarget =
  | HTMLFormElement
  | HTMLButtonElement
  | HTMLInputElement
  | FormData
  | URLSearchParams
  | {
      [name: string]: string;
    }
  | null;

type SubmitFunction = (
  target: SubmitTarget,
  argOptions?: SubmitOptions & { timeout?: number }
) => void;

/**
 * This hook makes it possible to debounce the submission of a form.
 * This is usefull in case you want to implement a autosave feature.
 */
export function useDebounceFetcher<T>(): Omit<
  ReturnType<typeof useFetcher>,
  "submit"
> & {
  submit: SubmitFunction;
} {
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    // no initialize step required since timeoutRef defaults undefined
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [timeoutRef]);

  const fetcher = useFetcher<T>() as Omit<
    ReturnType<typeof useFetcher>,
    "submit"
  > & {
    submit: SubmitFunction;
  };

  const originalSubmit = fetcher.submit;

  fetcher.submit = (target, { timeout = 0, ...options } = {}) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (timeout > 0) {
      timeoutRef.current = setTimeout(() => {
        originalSubmit(target, options);
      }, timeout);
    } else {
      originalSubmit(target, options);
    }
  };

  return fetcher;
}
