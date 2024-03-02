import { scripts } from "~/fonts";
import type { DOMProps } from "~/utils/filterDOMProps";
import * as React from "react";

/**
 * Hook which returns a classname to be applied on html elements, in case the UI needs to support
 * a different script (Latn, Arab, etc...) instead of the one which is applied in the current document.
 */
export function useAlternativeScript(props: DOMProps) {
  const { lang } = props;

  return React.useMemo(() => {
    if (lang !== undefined) {
      let cls = scripts.Latn;

      const { script } = new Intl.Locale(lang).maximize();

      if (script !== undefined && script in scripts) {
        cls = scripts[script as keyof typeof scripts];
      }

      return cls;
    }
  }, [lang]);
}
