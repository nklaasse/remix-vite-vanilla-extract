import { useElementType } from "./Navigation";
import {
  navigationDrawerLabel,
  navigationTabLabel,
} from "./NavigationLabel.css";

type NavigationTabLabelProps = {
  children: string;
};

function NavigationTabLabel(props: NavigationTabLabelProps) {
  const { children } = props;

  return <span className={navigationTabLabel.container}>{children}</span>;
}

type NavigationDrawerLabelProps = {
  children: string;
};

function NavigationDrawerLabel(props: NavigationDrawerLabelProps) {
  const { children } = props;

  return <span className={navigationDrawerLabel.container}>{children}</span>;
}

type NavigationLabelProps = NavigationTabLabelProps;

export function NavigationLabel(props: NavigationLabelProps) {
  const type = useElementType();

  switch (type) {
    case "bar":
    case "rail":
      return <NavigationTabLabel {...props} />;
    case "drawer":
      return <NavigationDrawerLabel {...props} />;
    default:
      return null;
  }
}
