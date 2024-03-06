import { IconAdd } from "~/icons/IconAdd";
import classNames from "classnames";
import * as React from "react";
import { mergeProps, useFocusRing, useHover, usePress } from "react-aria";
import { AccordionItemContext } from "./AccordionItem";
import { accordionSummary } from "./AccordionSummary.css";

export type AccordionSummaryProps = {
  /**
   * Textual label representing the hidden content
   */
  children: string;
  /**
   * Sets heading level, h2 through h6
   * @default 3
   */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
};

/**
 * Trigger to show / hide the AccordionContent
 */
export function AccordionSummary(props: AccordionSummaryProps) {
  const { children, headingLevel = 3 } = props;

  const HeadingTag = `h${headingLevel}` as React.ElementType;

  const context = React.useContext(AccordionItemContext);

  const { buttonProps } = context.props;
  const { buttonRef } = context.refs;

  const { hoverProps, isHovered } = useHover({});
  const { focusProps, isFocusVisible } = useFocusRing();
  const { pressProps, isPressed } = usePress({});

  return (
    <HeadingTag>
      <button
        {...mergeProps(buttonProps, hoverProps, focusProps, pressProps)}
        className={classNames(accordionSummary.container, {
          [accordionSummary.states.isPressed]: isPressed,
          [accordionSummary.states.isHovered]: isHovered,
          [accordionSummary.states.isFocusVisible]: isFocusVisible,
        })}
        ref={buttonRef}
      >
        <span className={accordionSummary.content}>{children}</span>
        <span className={accordionSummary.indicator}>
          <IconAdd aria-hidden={true} />
        </span>
      </button>
    </HeadingTag>
  );
}
