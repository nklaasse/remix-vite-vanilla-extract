import { documentTitle } from "./DocumentTitle.css";

type DocumentTitleProps = {
  children?: React.ReactNode;
};

export function DocumentTitle(props: DocumentTitleProps) {
  const { children } = props;

  return (
    <h4 className={documentTitle.container}>
      {children ? (
        <span className={documentTitle.text}>{children}</span>
      ) : (
        <span className={documentTitle.placeholder}>Untitled</span>
      )}
    </h4>
  );
}
