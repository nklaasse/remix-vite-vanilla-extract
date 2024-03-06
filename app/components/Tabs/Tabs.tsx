import type { TabsProps as ReactAriaTabsProps } from "react-aria-components";
import { Tabs as ReactAriaTabs } from "react-aria-components";
import { tabs } from "./Tabs.css";
import { TabsLabel } from "./TabsLabel";
import { TabsList } from "./TabsList";
import { TabsPanel } from "./TabsPanel";
import { TabsTab } from "./TabsTab";
import { TabsTotal } from "./TabsTotal";

export type TabsProps = ReactAriaTabsProps;
export function Tabs(props: TabsProps) {
  const { children, ...otherProps } = props;

  return (
    <ReactAriaTabs {...otherProps} className={tabs.container}>
      {children}
    </ReactAriaTabs>
  );
}

Tabs.List = TabsList;
Tabs.Tab = TabsTab;
Tabs.Panel = TabsPanel;
Tabs.Label = TabsLabel;
Tabs.Total = TabsTotal;
