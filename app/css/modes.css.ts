import { assignVars, styleVariants } from "@vanilla-extract/css";
import * as _global from "./_global.css";
import * as colors from "./colors.css";

export const modes = styleVariants({
  light: [
    {
      colorScheme: "light",

      backgroundColor: colors.base.gray[1],

      color: colors.base.gray[12],
      vars: assignVars(colors.base, {
        brand: _global.global.colors.light.brand,
        error: _global.global.colors.light.error,
        success: _global.global.colors.light.success,
        selection: _global.global.colors.light.selection,
        gray: _global.global.colors.light.gray,
        overlay: _global.global.colors.light.overlay,
        accent: _global.global.colors.light.gray,
      }),
    },
    {
      vars: assignVars(colors.accents, {
        neutral: _global.global.colors.light.gray,
        brand: _global.global.colors.light.tomato,
        selection: _global.global.colors.light.indigo,
        tomato: _global.global.colors.light.tomato,
        indigo: _global.global.colors.light.indigo,
        yellow: _global.global.colors.light.yellow,
        amber: _global.global.colors.light.amber,
      }),
    },
  ],
  dark: [
    {
      colorScheme: "dark",

      backgroundColor: colors.base.gray[1],

      color: colors.base.gray[12],

      vars: assignVars(colors.base, {
        brand: _global.global.colors.dark.brand,
        error: _global.global.colors.dark.error,
        success: _global.global.colors.dark.success,
        selection: _global.global.colors.dark.selection,

        gray: _global.global.colors.dark.gray,
        overlay: _global.global.colors.dark.overlay,

        accent: _global.global.colors.dark.gray,
      }),
    },
    {
      vars: assignVars(colors.accents, {
        neutral: _global.global.colors.dark.gray,
        brand: _global.global.colors.dark.tomato,
        selection: _global.global.colors.dark.indigo,

        tomato: _global.global.colors.dark.tomato,
        indigo: _global.global.colors.dark.indigo,
        yellow: _global.global.colors.dark.yellow,
        amber: _global.global.colors.dark.amber,
      }),
    },
  ],
});
