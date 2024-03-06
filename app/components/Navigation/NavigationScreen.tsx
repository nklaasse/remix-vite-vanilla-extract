import type { TabPanelProps as ReactAriaTabPanelProps } from "react-aria-components";
import { TabPanel as ReactAriaTabPanel } from "react-aria-components";
import { navigationScreen } from "./NavigationScreen.css";

type NavigationScreenProps = ReactAriaTabPanelProps;

export function NavigationScreen(props: NavigationScreenProps) {
  const { children, ...otherProps } = props;

  return (
    <ReactAriaTabPanel {...otherProps} className={navigationScreen.container}>
      {children}
    </ReactAriaTabPanel>
  );
}
