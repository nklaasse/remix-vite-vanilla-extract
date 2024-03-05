import { global } from "./_global.css";
import * as colors from "./colors.css";

export const theme = {
  colors: {
    brand: colors.base.brand,
    error: colors.base.error,
    success: colors.base.success,
    selection: colors.base.selection,
    gray: colors.base.gray,
    overlay: colors.base.overlay,
    accent: colors.base.accent,
  },
  fonts: global.fonts,
  fontWeights: global.fontWeights,
  fontSizes: global.fontSizes,
  lineHeights: global.lineHeights,
  letterSpacings: global.letterSpacings,
  space: global.space,
  sizes: global.sizes,
  radii: global.radii,
  borderWidths: global.borderWidths,
};
