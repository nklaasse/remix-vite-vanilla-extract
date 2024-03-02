import { theme } from "~/css/theme.css";
import { assignVars, styleVariants } from "@vanilla-extract/css";
import info from "./generated/fonts.json";

export const scripts = styleVariants({
  Arab: {
    vars: assignVars(theme.fonts, {
      heading: info.Arab.fonts.heading,
      body: info.Arab.fonts.body,
    }),
  },
  Cyrl: {
    vars: assignVars(theme.fonts, {
      heading: info.Cyrl.fonts.heading,
      body: info.Cyrl.fonts.body,
    }),
  },
  Grek: {
    vars: assignVars(theme.fonts, {
      heading: info.Grek.fonts.heading,
      body: info.Grek.fonts.body,
    }),
  },
  Jpan: {
    vars: assignVars(theme.fonts, {
      heading: info.Jpan.fonts.heading,
      body: info.Jpan.fonts.body,
    }),
  },
  Kore: {
    vars: assignVars(theme.fonts, {
      heading: info.Kore.fonts.heading,
      body: info.Kore.fonts.body,
    }),
  },
  Latn: {
    vars: assignVars(theme.fonts, {
      heading: info.Latn.fonts.heading,
      body: info.Latn.fonts.body,
    }),
  },
});
