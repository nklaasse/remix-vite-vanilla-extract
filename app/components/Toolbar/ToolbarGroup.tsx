import { Group as ReactAriaGroup } from "react-aria-components";
import { toolbarGroup } from "./ToolbarGroup.css";

type ToolbarGroupProps = {
  children: React.ReactNode;
};

export function ToolbarGroup(props: ToolbarGroupProps) {
  const { children } = props;

  return (
    <ReactAriaGroup className={toolbarGroup.container}>
      {children}
    </ReactAriaGroup>
  );
}
