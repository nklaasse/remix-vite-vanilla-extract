import { IconChevronBlockEnd } from "~/icons/IconChevronBlockEnd";
import { IconChevronBlockStart } from "~/icons/IconChevronBlockStart";
import classNames from "classnames";
import * as React from "react";
import { mergeProps, useButton, useFocusRing, useHover } from "react-aria";
import { DisclosureContext } from "./DisclosureContext";
import { disclosureSummary } from "./DisclosureSummary.css";

export type DisclosureSummaryProps = {
  /**
   * Textual label representing the hidden content
   */
  label: string;
};

/**
 * Trigger to show / hide the DisclosureContent
 */
export function DisclosureSummary(props: DisclosureSummaryProps) {
  const { label } = props;

  const ref = React.useRef<HTMLButtonElement>(null!);

  const context = React.useContext(DisclosureContext);

  const { buttonProps: sharedButtonProps } = context.props;
  const { isExpanded } = context.state;

  const { buttonProps } = useButton(sharedButtonProps, ref);

  const { hoverProps, isHovered } = useHover({});
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <button
      {...mergeProps(buttonProps, hoverProps, focusProps)}
      className={classNames(disclosureSummary.container, {
        [disclosureSummary.states.isHovered]: isHovered,
        [disclosureSummary.states.isFocusVisible]: isFocusVisible,
        [disclosureSummary.states.isExpanded]: isExpanded,
      })}
      ref={ref}
    >
      {label}
      <span className={disclosureSummary.indicatorCollapsed}>
        <IconChevronBlockEnd aria-hidden />
      </span>
      <span className={disclosureSummary.indicatorExpanded}>
        <IconChevronBlockStart aria-hidden />
      </span>
    </button>
  );
}
