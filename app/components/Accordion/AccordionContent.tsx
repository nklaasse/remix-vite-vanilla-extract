import * as React from "react";
import { accordionContent } from "./AccordionContent.css";
import { AccordionItemContext } from "./AccordionItem";

export type AccordionContentProps = {
  /**
   * Any valid react children
   */
  children: React.ReactNode;
};

/**
 * Hidden content which can be made visible by the AccordionSummary component
 */
export function AccordionContent(props: AccordionContentProps) {
  const { children } = props;

  const context = React.useContext(AccordionItemContext);

  const { regionProps } = context.props;

  return (
    <div className={accordionContent.container} {...regionProps}>
      {children}
    </div>
  );
}
