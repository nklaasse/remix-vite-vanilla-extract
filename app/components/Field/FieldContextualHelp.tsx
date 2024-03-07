import type { ContextualHelpProps } from "../ContextualHelp";
import { ContextualHelp } from "../ContextualHelp";
import { fieldContextualHelp } from "./FieldContextualHelp.css";

export type FieldContextualHelpProps = ContextualHelpProps;

/**
 * FieldContextualHelp is a component which can provide additional information or helpful guidance to the user.
 */
export function FieldContextualHelp(props: FieldContextualHelpProps) {
  return (
    <div className={fieldContextualHelp.container}>
      <ContextualHelp {...props} />
    </div>
  );
}
