import { theme } from "~/css";
import { globalFontFace, globalStyle } from "@vanilla-extract/css";
import data from "./generated/data.json";

type Script = "Latn" | "Cyrl" | "Grek" | "Arab" | "Kore" | "Jpan";

export function generate(script: Script) {
  const { heading, body } = data.scripts[script];

  for (const id of heading.fontFaces) {
    const fontFace = data.fontFaces[String(id) as keyof typeof data.fontFaces];

    globalFontFace(fontFace["font-family"], {
      src: `url("/app/fonts/generated/files/${fontFace.src}") format("woff2")`,
      fontStyle: fontFace["font-style"],
      fontWeight: fontFace["font-weight"],
      fontDisplay: "swap",
      unicodeRange: fontFace["unicode-range"],
    });
  }

  for (const id of body.fontFaces) {
    const fontFace = data.fontFaces[String(id) as keyof typeof data.fontFaces];

    globalFontFace(fontFace["font-family"], {
      src: `url("/app/fonts/generated/files/${fontFace.src}") format("woff2")`,
      fontStyle: fontFace["font-style"],
      fontWeight: fontFace["font-weight"],
      fontDisplay: "swap",
      unicodeRange: fontFace["unicode-range"],
    });
  }

  globalStyle(`body[data-script="${script}"]`, {
    vars: {
      [theme.fonts.heading]: heading.fontFamilies
        .map((fontFamily) => `${fontFamily}`)
        .join(", "),
      [theme.fonts.body]: body.fontFamilies
        .map((fontFamily) => `${fontFamily}`)
        .join(", "),
    },
  });
}
