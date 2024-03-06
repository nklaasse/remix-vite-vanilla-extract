import * as React from "react";
import { ElementTypeProvider, NavigationContext } from "./Navigation";
import { navigationRail } from "./NavigationRail.css";

type NavigationRailProps = {
  children: React.ReactNode;
};

export function NavigationRail(props: NavigationRailProps) {
  const { children } = props;

  const context = React.useContext(NavigationContext);

  const { railRef } = context.refs;

  return (
    <ElementTypeProvider type="rail">
      <div ref={railRef} className={navigationRail.container}>
        {children}
      </div>
    </ElementTypeProvider>
  );
}
