import type { TabPanelProps as ReactAriaTabPanelProps } from "react-aria-components";
import { TabPanel as ReactAriaTabPanel } from "react-aria-components";

export type TabsPanelProps = ReactAriaTabPanelProps;

export function TabsPanel(props: TabsPanelProps) {
  const { children, ...otherProps } = props;

  return <ReactAriaTabPanel {...otherProps}>{children}</ReactAriaTabPanel>;
}
