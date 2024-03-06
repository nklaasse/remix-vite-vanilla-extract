import { createElementTypeContext } from "~/components/ElementType";
import { useSlot } from "~/hooks/useSlot";
import * as React from "react";
import type {
  MenuProps as ReactAriaMenuProps,
  TabsProps as ReactAriaTabsProps,
} from "react-aria-components";
import { Tabs as ReactAriaTabs } from "react-aria-components";
import { navigation } from "./Navigation.css";
import { NavigationBar } from "./NavigationBar";
import { NavigationButton } from "./NavigationButton";
import { NavigationDrawer } from "./NavigationDrawer";
import { NavigationIcon } from "./NavigationIcon";
import { NavigationLabel } from "./NavigationLabel";
import { NavigationLogo } from "./NavigationLogo";
import { NavigationMenu } from "./NavigationMenu";
import { NavigationMenuItem } from "./NavigationMenuItem";
import { NavigationRail } from "./NavigationRail";
import { NavigationScreen } from "./NavigationScreen";

export const { ElementTypeProvider, useElementType } = createElementTypeContext<
  "rail" | "bar" | "button" | "drawer"
>();

type NavigationContextValue = {
  props: {
    menuProps: Pick<
      ReactAriaMenuProps<object>,
      "selectedKeys" | "defaultSelectedKeys" | "onSelectionChange"
    >;
  };
  refs: {
    railRef: React.RefCallback<HTMLDivElement>;
    barRef: React.RefCallback<HTMLDivElement>;
  };
};

export const NavigationContext = React.createContext<NavigationContextValue>({
  props: {
    menuProps: {},
  },
  refs: {
    railRef: () => {},
    barRef: () => {},
  },
});

export type NavigationProps = Pick<
  ReactAriaTabsProps,
  "selectedKey" | "defaultSelectedKey" | "onSelectionChange"
> & {
  children: React.ReactNode;
};

export function Navigation(props: NavigationProps) {
  const { children, ...otherProps } = props;

  const [railRef, rail] = useSlot();
  const [barRef, bar] = useSlot();

  let orientation: ReactAriaTabsProps["orientation"] | undefined = undefined;

  if (bar) {
    orientation = "horizontal";
  } else if (rail) {
    orientation = "vertical";
  }

  const { onSelectionChange, defaultSelectedKey, selectedKey } = props;

  const menuProps = React.useMemo((): ReactAriaMenuProps<object> => {
    return {
      onSelectionChange: onSelectionChange
        ? (keys) =>
            onSelectionChange?.(
              keys !== "all" && keys.size > 0
                ? keys.values().next().value
                : undefined
            )
        : undefined,
      selectedKeys: selectedKey ? [selectedKey] : [],
      defaultSelectedKeys: defaultSelectedKey ? [defaultSelectedKey] : [],
    };
  }, [onSelectionChange, selectedKey, defaultSelectedKey]);

  return (
    <NavigationContext.Provider
      value={{
        props: {
          menuProps,
        },
        refs: {
          railRef,
          barRef,
        },
      }}
    >
      <ReactAriaTabs
        {...otherProps}
        orientation={orientation}
        className={navigation.container}
      >
        {children}
      </ReactAriaTabs>
    </NavigationContext.Provider>
  );
}

Navigation.Button = NavigationButton;
Navigation.Screen = NavigationScreen;
Navigation.Label = NavigationLabel;
Navigation.Icon = NavigationIcon;
Navigation.MenuItem = NavigationMenuItem;
Navigation.Menu = NavigationMenu;
Navigation.Bar = NavigationBar;
Navigation.Rail = NavigationRail;
Navigation.Logo = NavigationLogo;
Navigation.Drawer = NavigationDrawer;
