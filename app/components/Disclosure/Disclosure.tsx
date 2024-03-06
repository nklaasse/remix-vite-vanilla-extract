import * as React from "react";
import { useId } from "react-aria";
import { DisclosureContent } from "./DisclosureContent";
import { DisclosureContext } from "./DisclosureContext";
import { DisclosureSummary } from "./DisclosureSummary";

export type DisclosureProps = {
  /**
   * Should include a <DisclosureContent /> and <DisclosureSummary element />
   */
  children: React.ReactNode;
};

/**
 * Disclosure component can be used to hide fields of lesser importance to the user
 */
export function Disclosure(props: DisclosureProps) {
  const { children } = props;

  const [isExpanded, setIsExpanded] = React.useState(false);

  const id = useId();

  const buttonProps = {
    id: `disclosure-button-${id}`,
    onPress: () => {
      setIsExpanded((isExpanded) => !isExpanded);
    },
    "aria-controls": `disclosure-panel-${id}`,
    "aria-expanded": isExpanded,
  };

  const panelProps = {
    id: `disclosure-panel-${id}`,
    role: "region",
    "aria-labelledby": `disclosure-button-${id}`,
  };

  return (
    <DisclosureContext.Provider
      value={{
        state: {
          isExpanded,
        },
        props: {
          buttonProps,
          panelProps,
        },
      }}
    >
      {children}
    </DisclosureContext.Provider>
  );
}

Disclosure.Content = DisclosureContent;
Disclosure.Summary = DisclosureSummary;
