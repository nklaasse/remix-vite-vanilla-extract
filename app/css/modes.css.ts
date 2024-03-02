import { assignVars, styleVariants } from "@vanilla-extract/css";
// import { global } from "./_global.css";
// import * as colors from "./colors.css";

export const modes = styleVariants({
  light: [
    {
      colorScheme: "light",
      // backgroundColor: global.colors.light.gray[1],
      // vars: assignVars(colors.base, {
      //   brand: global.colors.light.brand,
      //   error: global.colors.light.error,
      //   success: global.colors.light.success,
      //   selection: global.colors.light.selection,
      //   gray: global.colors.light.gray,
      //   overlay: global.colors.light.overlay,
      //   accent: global.colors.light.gray,
      // }),
    },
    // {
    //   // vars: assignVars(colors.accents, {
    //   //   neutral: global.colors.light.gray,
    //   //   brand: global.colors.light.tomato,
    //   //   selection: global.colors.light.indigo,
    //   //   tomato: global.colors.light.tomato,
    //   //   indigo: global.colors.light.indigo,
    //   //   yellow: global.colors.light.yellow,
    //   //   amber: global.colors.light.amber,
    //   // }),
    // },
  ],
  dark: [
    {
      colorScheme: "dark",
      // backgroundColor: colors.base.gray[1],
      // color: colors.base.gray[12],
      // vars: assignVars(colors.base, {
      //   brand: global.colors.dark.brand,
      //   error: global.colors.dark.error,
      //   success: global.colors.dark.success,
      //   selection: global.colors.dark.selection,
      //   gray: global.colors.dark.gray,
      //   overlay: global.colors.dark.overlay,
      //   accent: global.colors.dark.gray,
      // }),
    },
    // {
    //   // vars: assignVars(colors.accents, {
    //   //   neutral: global.colors.dark.gray,
    //   //   brand: global.colors.dark.tomato,
    //   //   selection: global.colors.dark.indigo,
    //   //   tomato: global.colors.dark.tomato,
    //   //   indigo: global.colors.dark.indigo,
    //   //   yellow: global.colors.dark.yellow,
    //   //   amber: global.colors.dark.amber,
    //   // }),
    // },
  ],
});
