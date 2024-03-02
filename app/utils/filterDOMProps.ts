import type { HTMLAttributes } from "react";

export interface DOMProps {
  /**
   * The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).
   */
  id?: string;
  /**
   * The language the element is written in. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang).
   */
  lang?: string;
}

const whitelist = new Set(["id", "lang"]);

const dataPropsRe = /^(data-.*)$/;

/**
 * Filter all dom props except data attributes and id's
 */
export function filterDOMProps(props: HTMLAttributes<HTMLElement>): DOMProps {
  const filteredProps: HTMLAttributes<HTMLElement> = {};

  for (const prop in props) {
    if (whitelist.has(prop) || dataPropsRe.test(prop)) {
      // @ts-ignore: There is no good type for React data attributes
      filteredProps[prop] = props[prop];
    }
  }

  return filteredProps;
}
