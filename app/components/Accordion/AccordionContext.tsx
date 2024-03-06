import * as React from "react";
import type { TreeState } from "react-stately";

export const AccordionContext = React.createContext<TreeState<unknown>>(null!);
