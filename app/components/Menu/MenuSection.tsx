import type { SectionProps as ReactAriaSectionProps } from "react-aria-components";
import { Section as ReactAriaSection } from "react-aria-components";
import { menuSection } from "./MenuSection.css";

export type MenuSectionProps<T> = ReactAriaSectionProps<T>;

/**
 * MenuSection is used for internal rendering of sections inside of a Menu
 *
 * In case the user provides a title we will render a section header, if the user did
 * not provide a title we will render a separator
 */
export function MenuSection<T extends object>(props: MenuSectionProps<T>) {
  const { children, ...otherProps } = props;

  return (
    <ReactAriaSection className={menuSection.container} {...otherProps}>
      {children}
    </ReactAriaSection>
  );
}
