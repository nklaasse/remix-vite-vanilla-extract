import { theme } from "~/css";
import { style } from "@vanilla-extract/css";

const pickerSelectContainer = style({
  display: "flex",

  alignItems: "stretch",

  padding: theme.space[0],
  margin: theme.space[0],

  width: theme.sizes.full,
  height: theme.sizes.full,
});

const pickerSelectPopover = style([
  pickerSelectContainer,
  {
    maxHeight: "360px",
    minWidth: "300px",
  },
]);

const pickerTray = style([
  pickerSelectContainer,
  {
    minWidth: theme.sizes.full,
  },
]);

const pickerSelectPlaceholder = style({
  color: theme.colors.gray[9],

  overflow: "hidden",
  textOverflow: "ellipsis",
});

const pickerSelectValue = style({
  display: "flex",
  flexDirection: "row",

  alignItems: "center",
});

export const pickerSelect = {
  placeholder: pickerSelectPlaceholder,
  value: pickerSelectValue,

  popover: pickerSelectPopover,
  tray: pickerTray,
};
