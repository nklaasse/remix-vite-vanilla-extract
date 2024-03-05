import classnames from "classnames";
import type { LinkProps as ReactAriaLinkProps } from "react-aria-components";
import { Link as ReactAriaLink } from "react-aria-components";
import { link } from "./Link.css";
import { LinkIcon } from "./LinkIcon";
import { LinkLabel } from "./LinkLabel";

export type LinkProps = ReactAriaLinkProps & {
  children: React.ReactNode;
};

export function Link(props: LinkProps) {
  let content: React.ReactNode = props.children;

  if (typeof content === "string") {
    content = <LinkLabel>{content}</LinkLabel>;

    // eslint-disable-next-line no-console
    console.warn(
      "When rendering content inside a link, you should use the Link.Label API"
    );
  }

  return (
    <ReactAriaLink
      {...props}
      className={(props) =>
        classnames(link.container, {
          [link.states.isHovered]: props.isHovered,
          [link.states.isFocusVisible]: props.isFocusVisible,
          [link.states.isPressed]: props.isPressed,
        })
      }
    >
      {content}
    </ReactAriaLink>
  );
}

Link.Icon = LinkIcon;
Link.Label = LinkLabel;
