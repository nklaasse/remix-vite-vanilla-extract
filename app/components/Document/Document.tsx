import classnames from "classnames";
import * as React from "react";
import type { LinkProps as ReactAriaLinkProps } from "react-aria-components";
import { document } from "./Document.css";
import { DocumentActions } from "./DocumentActions";
import { DocumentIcon } from "./DocumentIcon";
import { DocumentItem } from "./DocumentItem";
import { DocumentLabel } from "./DocumentLabel";
import { DocumentPreview } from "./DocumentPreview";
import { DocumentSeparator } from "./DocumentSeperator";
import { DocumentTitle } from "./DocumentTitle";

export type DocumentProps = {
  children: React.ReactNode;

  variant: "resume" | "cover-letter";
} & Omit<ReactAriaLinkProps, "children">;

type DocumentContextValue = {
  props: {
    linkProps: Omit<ReactAriaLinkProps, "children">;
  };
};

export const DocumentContext = React.createContext<DocumentContextValue>({
  props: {
    linkProps: {},
  },
});

export function Document(props: DocumentProps) {
  const { children, variant, ...linkProps } = props;

  return (
    <DocumentContext.Provider
      value={{
        props: {
          linkProps,
        },
      }}
    >
      <article
        className={classnames(document.container, document.variants[variant])}
      >
        {children}
      </article>
    </DocumentContext.Provider>
  );
}

Document.Preview = DocumentPreview;
Document.Actions = DocumentActions;
Document.Title = DocumentTitle;
Document.Item = DocumentItem;
Document.Icon = DocumentIcon;
Document.Label = DocumentLabel;
Document.Separator = DocumentSeparator;
