import { mergeRefs } from "~/utils/mergeRefs";
import * as React from "react";
import type { AriaLinkOptions, LinkAria } from "react-aria";
import { mergeProps, useLink } from "react-aria";
import { MenuItemContext } from "./MenuItem";
import { menuLink } from "./MenuLink.css";

export type MenuLinkProps<T extends React.ElementType = "a"> = Omit<
  AriaLinkOptions,
  "elementType"
> & {
  /**
   * The HTML element used to render the link, e.g. 'a', or 'span'.
   * @default 'a'
   */
  elementType?: T | React.JSXElementConstructor<LinkAria["linkProps"]>;
  /** A Menu.Label and optionally an Menu.Description, Menu.Icon */
  children: React.ReactNode;
  /** A URL to link to if elementType="a". */
  href?: string;
  /** The target window for the link. */
  target?: string;
  /** The relationship between the linked resource and the current page. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel). */
  rel?: string;
};

export function MenuLink(props: MenuLinkProps) {
  const {
    elementType: Element = "a",
    href,
    target,
    rel,
    ...otherProps
  } = props;

  const context = React.useContext(MenuItemContext);

  const { menuItemProps } = context.props;
  const { menuItemRef } = context.refs;

  const defaultLinkRef = React.useRef<HTMLAnchorElement>(null);

  const { linkProps } = useLink(
    {
      elementType: Element === "a" ? Element : "span",
      ...otherProps,
    },
    defaultLinkRef
  );

  const linkRef = mergeRefs(
    defaultLinkRef,
    menuItemRef as React.RefObject<HTMLAnchorElement>
  );

  const { children } = props;

  return (
    <Element
      {...mergeProps(menuItemProps, linkProps)}
      href={href}
      target={target}
      rel={rel}
      // Note: Don't understand how I would do this otherwise with a more generic HTMLElement
      ref={linkRef}
      className={menuLink.container}
    >
      {children}
    </Element>
  );
}
