import { useControlledState } from "~/hooks/useControlledState";
import type { AriaAccordionProps } from "@react-aria/accordion";
import { useAccordion } from "@react-aria/accordion";
import * as React from "react";
import { Item, useTreeState } from "react-stately";
import { accordion } from "./Accordion.css";
import { AccordionContent } from "./AccordionContent";
import { AccordionContext } from "./AccordionContext";
import { AccordionItem } from "./AccordionItem";
import { AccordionSummary } from "./AccordionSummary";

export type AccordionProps<T extends Record<string, unknown>> = Omit<
  AriaAccordionProps<T>,
  "disabledKeys"
>;

/**
 * An accordion (collapsible content) to toggle between hiding and showing content
 */
export function Accordion<T extends Record<string, unknown>>(
  props: AccordionProps<T>
) {
  const {
    expandedKeys: _expandedKeys,
    defaultExpandedKeys: _defaultExpandedKeys,
    onExpandedChange: _onExpandedChange,
    ...otherProps
  } = props;

  const [expandedKeys, setExpandedKeys] = useControlledState(
    _expandedKeys,
    _defaultExpandedKeys,
    (keys) => {
      if (_onExpandedChange) {
        _onExpandedChange(new Set(keys));
      }
    }
  );

  const ref = React.useRef<HTMLDivElement>(null);

  const state = useTreeState({
    ...otherProps,
    expandedKeys,
    onExpandedChange: (keys) => {
      setExpandedKeys((prevKeys) => {
        const currentKeys = prevKeys ? new Set(prevKeys) : new Set();

        const nextSelectedItem = Array.from(keys).find(
          (key) => !currentKeys.has(key)
        );

        if (nextSelectedItem) {
          return [nextSelectedItem];
        } else {
          return [];
        }
      });
    },
  });

  const { accordionProps } = useAccordion(props, state, ref);

  return (
    <AccordionContext.Provider value={state}>
      <div ref={ref} {...accordionProps} className={accordion.container}>
        {Array.from(state.collection).map((item) => (
          <AccordionItem key={item.key} item={item} />
        ))}
      </div>
    </AccordionContext.Provider>
  );
}

Accordion.Item = Item;
Accordion.Summary = AccordionSummary;
Accordion.Content = AccordionContent;
