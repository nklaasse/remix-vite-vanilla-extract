import type { BadgeProps } from "~/components/Badge";
import { Badge } from "~/components/Badge";
import { menuBadge } from "./MenuBadge.css";

export type MenuBadgeProps = BadgeProps;

export function MenuBadge(props: MenuBadgeProps) {
  const { ...otherProps } = props;

  return (
    <div className={menuBadge.container}>
      <Badge {...otherProps} />
    </div>
  );
}
