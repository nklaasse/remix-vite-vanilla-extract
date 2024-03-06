import classnames from "classnames";
import * as React from "react";
import { Link as ReactAriaLink } from "react-aria-components";
import { DocumentContext } from "./Document";
import { documentPreview, placeholder } from "./DocumentPreview.css";

type DocumentPreviewProps = {
  src?: string;
};

function Placeholder() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 260 368"
      className={placeholder.container}
    >
      <g className={placeholder.coverLetter}>
        <path
          fill="currentColor"
          d="M176 24H34c-5.5228 0-10 4.4772-10 10s4.4772 10 10 10h142c5.523 0 10-4.4772 10-10s-4.477-10-10-10ZM123 52H29c-2.7614 0-5 2.2386-5 5s2.2386 5 5 5h94c2.761 0 5-2.2386 5-5s-2.239-5-5-5ZM146 66H29c-2.7614 0-5 2.2386-5 5s2.2386 5 5 5h117c2.761 0 5-2.2386 5-5s-2.239-5-5-5ZM163 334H29c-2.7614 0-5 2.239-5 5s2.2386 5 5 5h134c2.761 0 5-2.239 5-5s-2.239-5-5-5ZM231 334h-50c-2.761 0-5 2.239-5 5s2.239 5 5 5h50c2.761 0 5-2.239 5-5s-2.239-5-5-5ZM226 124H34c-5.5228 0-10 4.477-10 10v135c0 5.523 4.4772 10 10 10h192c5.523 0 10-4.477 10-10V134c0-5.523-4.477-10-10-10ZM226 96H34c-5.5228 0-10 4.477-10 10s4.4772 10 10 10h192c5.523 0 10-4.477 10-10s-4.477-10-10-10ZM114 287H34c-5.5228 0-10 4.477-10 10s4.4772 10 10 10h80c5.523 0 10-4.477 10-10s-4.477-10-10-10Z"
        />
      </g>
      <g className={placeholder.resume}>
        <rect
          width="162"
          height="14"
          x="74"
          y="24"
          fill="currentColor"
          rx="7"
        />
        <rect
          width="104"
          height="10"
          x="74"
          y="42"
          fill="currentColor"
          rx="5"
        />
        <rect
          width="127"
          height="10"
          x="74"
          y="56"
          fill="currentColor"
          rx="5"
        />
        <rect
          width="212"
          height="96"
          x="24"
          y="74"
          fill="currentColor"
          rx="10"
        />
        <rect
          width="212"
          height="20"
          x="24"
          y="178"
          fill="currentColor"
          rx="10"
        />
        <rect
          width="212"
          height="20"
          x="24"
          y="206"
          fill="currentColor"
          rx="10"
        />
        <rect
          width="212"
          height="20"
          x="24"
          y="234"
          fill="currentColor"
          rx="10"
        />
        <rect
          width="212"
          height="20"
          x="24"
          y="262"
          fill="currentColor"
          rx="10"
        />
        <rect
          width="65.3333"
          height="54"
          x="24"
          y="290"
          fill="currentColor"
          rx="10"
        />
        <rect
          width="65.3333"
          height="54"
          x="97.3333"
          y="290"
          fill="currentColor"
          rx="10"
        />
        <rect
          width="65.3333"
          height="54"
          x="170.667"
          y="290"
          fill="currentColor"
          rx="10"
        />
        <circle cx="45" cy="45" r="21" fill="currentColor" />
      </g>
    </svg>
  );
}

export function DocumentPreview(props: DocumentPreviewProps) {
  const { src } = props;

  const context = React.useContext(DocumentContext);

  const { linkProps } = context.props;

  const content = (
    <>
      <Placeholder />
      {src ? <img className={documentPreview.image} src={src} alt="" /> : null}
    </>
  );

  if (linkProps.href) {
    return (
      <ReactAriaLink
        {...linkProps}
        className={(props) =>
          classnames(documentPreview.container, {
            [documentPreview.states.isHovered]: props.isHovered,
            [documentPreview.states.isFocused]: props.isFocused,
            [documentPreview.states.isFocusVisible]: props.isFocusVisible,
          })
        }
      >
        {content}
      </ReactAriaLink>
    );
  } else {
    return <div className={documentPreview.container}>{content}</div>;
  }
}
