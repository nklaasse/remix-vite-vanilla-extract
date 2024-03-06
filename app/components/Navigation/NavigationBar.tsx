import * as React from "react";
import { ElementTypeProvider, NavigationContext } from "./Navigation";
import { navigationBar } from "./NavigationBar.css";

type NavigationBarProps = {
  children: React.ReactNode;
};

export function NavigationBar(props: NavigationBarProps) {
  const { children } = props;

  const context = React.useContext(NavigationContext);

  const { barRef } = context.refs;

  return (
    <ElementTypeProvider type="bar">
      <div ref={barRef} className={navigationBar.container}>
        {children}
      </div>
    </ElementTypeProvider>
  );
}
