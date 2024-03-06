import { useAlternativeScript } from "~/hooks/useAlternativeScript";
import type { DOMProps } from "~/utils/filterDOMProps";
import { filterDOMProps } from "~/utils/filterDOMProps";
import classnames from "classnames";
import type * as CSS from "csstype";
import * as React from "react";
import { mergeProps } from "react-aria";
import { ListBoxItemContext } from "./ListBoxItemContext";
import { listBoxLabel } from "./ListBoxLabel.css";

export type ListBoxLabelProps = {
  /**
   * The content to display as a label
   */
  children: string;
  /**
   * Sets inline style for the element. Only use it in really specific cases;
   *
   * @default {}
   */
  UNSAFE_style?: {
    // To overide the fontFamily for the font picker
    fontFamily?: CSS.Properties["fontFamily"];
    // To overide the fontWeight for the font picker
    fontWeight?: CSS.Properties["fontWeight"];
  };
} & DOMProps;

/**
 * ListBoxLabel renders the label when selected or in the popover / tray, there can only be a single
 * ListBoxLabel in every ListBoxItem
 */
export function ListBoxLabel(props: ListBoxLabelProps) {
  const { children, UNSAFE_style: style = {} } = props;

  const context = React.useContext(ListBoxItemContext);

  const { labelProps } = context.props;

  const script = useAlternativeScript(props);

  return (
    <div
      {...mergeProps(filterDOMProps(props), labelProps)}
      style={{ ...labelProps?.style, ...style }}
      className={classnames(listBoxLabel.container, script)}
    >
      {children}
    </div>
  );
}
