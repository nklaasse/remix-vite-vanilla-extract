import { createThemeContract } from "@vanilla-extract/css";

export const safeArea = createThemeContract({
  top: null,
  bottom: null,
});
