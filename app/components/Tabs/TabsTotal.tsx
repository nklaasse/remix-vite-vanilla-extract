import { useElementType } from "./TabsList";
import { tabsTotal } from "./TabsTotal.css";

type TabsTotalProps = {
  children: number | string;
};

export function TabsTotal(props: TabsTotalProps) {
  const type = useElementType();

  if (type === "list") {
    const { children } = props;

    return <span className={tabsTotal.container}>{children}</span>;
  }

  return null;
}
