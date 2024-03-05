import { typography } from "./Typography.css";

export interface TypographyProps {
  /**
   * Typography content
   */
  children: React.ReactNode | string[];
}

/**
 * Typography wraps the content of the rich text component
 * and add the correct spacing to the children elements
 */
export function Typography({ children }: TypographyProps) {
  return <div className={typography.container}>{children}</div>;
}
