import React from "react";
import { LayerContext } from "./LayerContext";

/**
 * List of types layer components in order of priority
 */
const types = [
  "sticky",
  "screen",
  "modal",
  "tray",
  "popover",
  "tooltip",
] as const;

/**
 * Calculates index based on parent index and type of component
 */
export function useLayerIndex(type: (typeof types)[number]) {
  const { index } = React.useContext(LayerContext);

  return types.indexOf(type) + index + 1;
}

type LayerProps = {
  /**
   * Elements to be rendered as children
   */
  children: React.ReactNode;
  /**
   * index to be set passed on to provider
   */
  index: number;
};

/**
 * Adds given index to react tree through a provider so the useLayerIndex hook can retrieve it
 */
export function Layer(props: LayerProps) {
  const { index, children } = props;

  return (
    <LayerContext.Provider
      value={{
        index,
      }}
    >
      {children}
    </LayerContext.Provider>
  );
}
