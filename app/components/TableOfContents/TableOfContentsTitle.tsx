import * as React from "react";
import { tableOfContentsTitle } from "./TableOfContentsTitle.css";
import { TableOfContentsContext } from "./TableOfContents";

type TableOfContentsTitleProps = {
  /**
   * TableOfContentsList content
   */
  children: React.ReactNode;
};

/**
 * TableOfContentsTitle component is used to create a heading level 2 for the table of contents
 */
export function TableOfContentsTitle(props: TableOfContentsTitleProps) {
  const { children } = props;

  const context = React.useContext(TableOfContentsContext);

  const { titleRef } = context.refs;
  const { titleProps } = context.props;

  return (
    <h2
      {...titleProps}
      className={tableOfContentsTitle.container}
      ref={titleRef}
    >
      {children}
    </h2>
  );
}
