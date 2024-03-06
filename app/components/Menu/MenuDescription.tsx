import { Text as ReactAriaText } from "react-aria-components";
import { menuDescription } from "./MenuDescription.css";

export type MenuDescriptionProps = {
  /**
   * The content to display as a description
   */
  children: string;
};

/**
 * MenuDescription renders the description of an individual MenuItem below the label
 */
export function MenuDescription(props: MenuDescriptionProps) {
  const { children } = props;

  return (
    <ReactAriaText slot="description" className={menuDescription.container}>
      {children}
    </ReactAriaText>
  );
}
