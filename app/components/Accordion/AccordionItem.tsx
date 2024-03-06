import { useAccordionItem } from "@react-aria/accordion";
import type { Node } from "@react-types/shared";
import classnames from "classnames";
import * as React from "react";
import { AccordionContext } from "./AccordionContext";
import { accordionItem } from "./AccordionItem.css";

interface AccordionItemPassedProps<T> {
  item: Node<T>;
}

export type AccordionItemContextValue = {
  refs: {
    buttonRef: React.RefObject<HTMLButtonElement>;
  };
  props: {
    buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    regionProps?: React.DOMAttributes<HTMLDivElement>;
  };
};

export const AccordionItemContext =
  React.createContext<AccordionItemContextValue>(null!);

/**
 * AccordionItem renders a AccordionSummary and AccordionContent which can be used as a child of Accordion
 */
export function AccordionItem<T>(props: AccordionItemPassedProps<T>) {
  const { item } = props;
  const { rendered } = item;

  const state = React.useContext(AccordionContext);

  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const { buttonProps, regionProps } = useAccordionItem(
    props,
    state,
    buttonRef
  );

  return (
    <AccordionItemContext.Provider
      value={{
        props: { buttonProps, regionProps },
        refs: { buttonRef },
      }}
    >
      <div
        className={classnames(accordionItem.container, {
          [accordionItem.states.isExpanded]: state.expandedKeys.has(item.key),
        })}
      >
        {rendered}
      </div>
    </AccordionItemContext.Provider>
  );
}
