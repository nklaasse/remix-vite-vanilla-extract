import { theme } from "~/css";
import { globalStyle } from "@vanilla-extract/css";

globalStyle("html, body, body.sb-show-main.sb-main-padded, #storybook-root", {
  margin: 0,
  padding: 0,
  height: theme.sizes.full,
});
