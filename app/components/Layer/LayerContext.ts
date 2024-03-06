import React from "react";

type LayerContextValue = {
  index: number;
};

export const LayerContext = React.createContext<LayerContextValue>({
  index: 0,
});
