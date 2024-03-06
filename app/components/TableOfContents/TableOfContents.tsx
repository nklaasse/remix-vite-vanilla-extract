import * as React from "react";
import { tableOfContents } from "./TableOfContents.css";
import { TableOfContentsTitle } from "./TableOfContentsTitle";
import { TableOfContentsMenu } from "./TableOfContentsMenu";
import { useId } from "react-aria";
import { Item } from "react-stately";
import { useSlot } from "~/hooks/useSlot";

type TableOfContentsContextValue = {
  refs: {
    titleRef: React.RefCallback<HTMLElement>;
  };
  props: {
    titleProps: {
      id?: string;
    };
  };
};

export const TableOfContentsContext =
  React.createContext<TableOfContentsContextValue>({
    refs: {
      titleRef: () => {},
    },
    props: {
      titleProps: {
        id: undefined,
      },
    },
  });

export type TableOfContentsProps = {
  /**
   * TableOfContents content
   */
  children: React.ReactNode;
  /**
   * Labels the navigation element when there is not a visible heading
   */
  ariaLabel?: string;
};

/**
 * TableOfContents component is used to create a table of contents for a page
 */
export function TableOfContents(props: TableOfContentsProps) {
  const { children, ariaLabel } = props;

  const [titleRef, title] = useSlot();

  const titleProps = {
    id: useId(),
  };

  let navProps: React.HTMLAttributes<HTMLElement> = {
    "aria-label": ariaLabel,
  };

  if (title) {
    navProps = {
      "aria-labelledby": titleProps.id,
    };
  }

  return (
    <TableOfContentsContext.Provider
      value={{
        refs: {
          titleRef,
        },
        props: {
          titleProps,
        },
      }}
    >
      <nav className={tableOfContents.container} {...navProps}>
        {children}
      </nav>
    </TableOfContentsContext.Provider>
  );
}

TableOfContents.Title = TableOfContentsTitle;
TableOfContents.Menu = TableOfContentsMenu;
TableOfContents.Item = Item;
