import classNames from "classnames";
import * as React from "react";
import { disclosureContent } from "./DisclosureContent.css";
import { DisclosureContext } from "./DisclosureContext";

export type DisclosureContentProps = {
  /**
   * Any valid react children
   */
  children: React.ReactNode;
};

/**
 * Hidden content which can be made visible by the DisclosureSummary component
 */
export function DisclosureContent(props: DisclosureContentProps) {
  const { children } = props;

  const {
    props: { panelProps },
    state,
  } = React.useContext(DisclosureContext);

  return (
    <div
      {...panelProps}
      className={classNames(disclosureContent.container, {
        [disclosureContent.states.isExpanded]: state.isExpanded,
      })}
    >
      {children}
    </div>
  );
}
