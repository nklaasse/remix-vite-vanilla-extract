import { useIntl } from "react-intl";
import { ProgressBar as ReactAriaProgressBar } from "react-aria-components";
import { transitionIndicator } from "./TransitionIndicator.css";

export function TransitionIndicator() {
  const intl = useIntl();

  return (
    <ReactAriaProgressBar
      className={transitionIndicator.container}
      aria-label={intl.formatMessage({
        id: "components.transitionIndicator.ariaLabel",
        description:
          "Label which is used for the transition indicator component",
        defaultMessage: "Loading...",
      })}
    >
      <div className={transitionIndicator.primaryBar}>
        <div className={transitionIndicator.fill} />
      </div>
      <div className={transitionIndicator.secondaryBar}>
        <div className={transitionIndicator.fill} />
      </div>
    </ReactAriaProgressBar>
  );
}
