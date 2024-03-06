import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const tabsContainer = style({
  width: theme.sizes.full,
});

export const tabs = {
  container: tabsContainer,
};
