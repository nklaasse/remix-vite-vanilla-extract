import React from "react";
import { block } from "./Block.css";

export type BlockProps = {
  /**
   * Block content
   */
  children: React.ReactNode;
};

export const Block = React.forwardRef(function Block(
  props: BlockProps,
  ref: React.Ref<HTMLDivElement>
) {
  const { children } = props;

  return (
    <div className={block.container} ref={ref}>
      {children}
    </div>
  );
});
