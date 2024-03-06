import { IconProvider } from "~/icons/IconProvider";
import { menuIndicator } from "./MenuIndicator.css";

export type MenuIndicatorProps = {
  /**
   * A single item from ~/icons
   */
  children: React.ReactNode;
};

/**
 * The MenuIndicator component renders the indicator of an individual MenuItem,
 * those indicators are usefull to display either the status of the item or
 * to display the result of an action (for example an external link or logout icon).
 */
export function MenuIndicator(props: MenuIndicatorProps) {
  const { children } = props;

  return (
    <div className={menuIndicator.container}>
      <IconProvider aria-hidden>{children}</IconProvider>
    </div>
  );
}
