import type { ButtonLabelProps } from "~/components/Button";
import { Button } from "~/components/Button";
import type { MenuLabelProps } from "~/components/Menu";
import { Menu } from "~/components/Menu";
import { useElementType } from "./ActionMenu";

function MenuLabel(props: MenuLabelProps) {
  return <Menu.Label {...props} />;
}

function ButtonLabel(props: ButtonLabelProps) {
  return <Button.Label {...props} />;
}

export type ActionMenuLabelProps = MenuLabelProps | ButtonLabelProps;

/**
 * ActionMenuLabel renders the label of an individual ActionMenuItem
 */
export function ActionMenuLabel(props: ActionMenuLabelProps) {
  const type = useElementType();

  switch (type) {
    case "trigger":
      return <ButtonLabel {...(props as ActionMenuLabelProps)} />;
    case "menu":
      return <MenuLabel {...(props as MenuLabelProps)} />;
    default:
      return null;
  }
}
