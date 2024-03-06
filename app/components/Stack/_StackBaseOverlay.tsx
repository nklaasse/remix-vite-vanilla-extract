import * as React from "react";
import { stackBaseOverlay, stackScreenContent } from "./_StackBaseOverlay.css";

export type StackBaseOverlayProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "style" | "className"
>;

type StackScreenContentProps = {
  children: React.ReactNode;
};

/**
 * @private
 *
 * Prevent children from re-rendering every time the "level" is increased
 */
const StackScreenContent = React.memo<StackScreenContentProps>(
  function StackScreenContent(props) {
    const { children } = props;

    return <div className={stackScreenContent.container}>{children}</div>;
  }
);

export const StackBaseOverlay = React.forwardRef(function StackBaseOverlay(
  props: StackBaseOverlayProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { children } = props;

  return (
    <div {...props} ref={ref} className={stackBaseOverlay.container}>
      <StackScreenContent>{children}</StackScreenContent>
    </div>
  );
});
