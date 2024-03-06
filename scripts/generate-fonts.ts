import { AtRule, Comment, Declaration, parse, Rule, stringify } from "css";
import { fileURLToPath } from "url";
import fetch from "node-fetch";
import * as fs from "fs/promises";
import * as path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script which helps us to fetch fonts from Google fonts using the CSS API.
 *
 * This script extract the CSS from the response generates a JSON out of it, which
 * we then can use to generate the CSS using the vanilla-extract API.
 *
 * The fonts we need are:
 *
 * - Montserrat
 * - Open Sans
 * - Noto Sans
 *
 * Those fonts are used in the following combinations of scripts:
 *
 * Latn, Cyrl:
 * Heading: Montserrat
 * Body: Open Sans
 *
 * Grek:
 * Heading: Open Sans
 * Body: Open Sans
 *
 * Arab:
 * Heading: Noto Sans
 * Body: Noto Sans
 *
 * Kore:
 * Heading: Noto Sans Korean
 * Body: Noto Sans Korean
 *
 * Jpan:
 * Heading: Noto Sans Japanese
 * Body: Noto Sans Japanese
 *
 * To make this usefull in vanilla-extract we need to generate a JSON file which
 * contains the following information subtracted from the CSS response from the
 * google fonts API:
 *
 * {
 *   "scripts": {
 *     "<script>": {
 *       "heading": {
 *         "fontFamily": ["<font-family>"],
 *         "fontFaces": ["<font-face-id>"],
 *       },
 *       "body": {
 *         "fontFamily": ["<font-family>"],
 *         "fontFaces": ["<font-face-id>"],
 *       },
 *     },
 *   },
 *   },
 *   "fonts": {
 *    "<font-face-id>": {
 *      font-style: "<font-style>",
 *      font-weight: "<font-weight>",
 *      src: "<src>", <-- Local font file
 *      unicode-range: "<unicode-range>",
 *   },
 * }
 */
type Scripts = "Latn" | "Cyrl" | "Grek" | "Arab" | "Kore" | "Jpan";

type Font =
  | "Montserrat"
  | "Noto Sans Display"
  | "Noto Sans Arabic"
  | "Noto Sans KR"
  | "Noto Sans JP";

type Script = {
  heading: Font[];
  body: Font[];
};

const scripts = {
  Latn: {
    heading: ["Montserrat"],
    body: ["Noto Sans Display"],
  },
  Cyrl: {
    heading: ["Montserrat"],
    body: ["Noto Sans Display"],
  },
  Grek: {
    heading: ["Noto Sans Display"],
    body: ["Noto Sans Display"],
  },
  Arab: {
    heading: ["Noto Sans Arabic", "Noto Sans Display"],
    body: ["Noto Sans Arabic", "Noto Sans Display"],
  },
  Kore: {
    heading: ["Noto Sans KR"],
    body: ["Noto Sans KR"],
  },
  Jpan: {
    heading: ["Noto Sans JP"],
    body: ["Noto Sans JP"],
  },
} satisfies Record<Scripts, Script>;

type Weights = 900 | 800 | 700 | 600 | 500 | 400 | 300 | 200 | 100;

console.log("generate");

const fontWeights = {
  // Extra bold, Bold, Semi bold, Medium
  heading: [500, 600, 700, 800],
  // Medium, Regular, Bold
  body: [400, 500, 700],
} satisfies Record<"heading" | "body", Weights[]>;

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

type ValueOf<T> = T[keyof T];

type Style = {
  weight: Weights;
  italic: boolean;
};

function getGoogleFontsUrl(fonts: Record<Font, Style[]>) {
  const url = "https://fonts.googleapis.com/css2";

  const params: string[] = [];

  for (const [font, style] of Object.entries(fonts) as Entries<typeof fonts>) {
    let param = `family=${font.replace(/ /g, "+")}`;

    const italic = style.some((style) => style.italic);

    if (italic) {
      // We need to sort the items by weight
      const wght = [
        // We need the 0 and 1 to indicate that both are
        // needed italic and non italic.
        ...style
          .filter((style) => !style.italic)
          .sort((a, b) => a.weight - b.weight)
          .map((style) => `0,${style.weight}`),
        ...style
          .filter((style) => style.italic)
          .sort((a, b) => a.weight - b.weight)
          .map((style) => `1,${style.weight}`),
      ];

      param = `${param}:ital,wght@${wght.join(";")}`;
    } else {
      const wght = style
        .sort((a, b) => a.weight - b.weight)
        .map((weight) => weight.weight);

      param = `${param}:wght@${wght.join(";")}`;
    }

    params.push(param);
  }

  return `${url}?${params.join("&")}&display=swap`;
}

function getFontFileUrlFromDeclarationValue(value: string) {
  const match = /url\((.+?)\)/.exec(value);

  if (match) {
    return match[1];
  }
}

type FontFace = {
  "font-family": string;
  "font-style": string;
  "font-weight": string;
  "unicode-range": string;
  "font-display": string;
  "font-stretch"?: string;
  src: string;
};

function isFontFace(rule: Rule | AtRule | Comment): rule is Rule {
  return rule.type === "font-face";
}

function isDeclaration(
  declaration: Declaration | Comment
): declaration is Declaration {
  return declaration.type === "declaration";
}

/**
 * In this function we want to parse the CSS which is provided by the Google
 * Fonts API. We need to extract the following information:
 *
 * - font-family: The name of the font
 * - font-style: italic or normal
 * - font-weight: Range of the font-weight
 * - unicode-range: The unicode range of the font
 * - src: The local font file
 */
function getFontFacesFromGoogleFontsCSS(css: string) {
  const ast = parse(css);

  const fontFaces: FontFace[] = [];

  if (ast.stylesheet) {
    for (const rule of ast.stylesheet.rules) {
      if (isFontFace(rule) && rule.declarations) {
        const fontFace: Partial<FontFace> = {};

        for (const declaration of rule.declarations) {
          if (isDeclaration(declaration)) {
            if (declaration.property === "font-family") {
              if (declaration.value) {
                // Font-family is wrapped in quotes, since we wan't to use
                // them later to look up where the fontface would be applied
                // we unwrap them here.
                fontFace["font-family"] = declaration.value.replace(
                  /(^['"])|(['"]$)+/g,
                  ""
                );
              }
            } else if (declaration.property === "font-style") {
              fontFace["font-style"] = declaration.value;
            } else if (declaration.property === "font-weight") {
              fontFace["font-weight"] = declaration.value;
            } else if (declaration.property === "unicode-range") {
              fontFace["unicode-range"] = declaration.value;
            } else if (declaration.property === "src") {
              const url = getFontFileUrlFromDeclarationValue(
                declaration.value ?? ""
              );

              if (url) {
                fontFace.src = url;
              }
            } else if (declaration.property === "font-display") {
              fontFace["font-display"] = declaration.value;
            } else if (declaration.property === "font-stretch") {
              fontFace["font-stretch"] = declaration.value;
            }
          }
        }

        fontFaces.push(fontFace as FontFace);
      }
    }
  }

  return fontFaces;
}

/**
 * This function merges the font faces which can be merged, this we can do by
 * checking if the src, unicode-range and font-style are the same.
 */
function flattenFontFaces(input: FontFace[]) {
  const output: FontFace[] = [];

  for (const fontFace of input) {
    const existingFontFace = output.find(
      (existingFontFace) =>
        existingFontFace.src === fontFace.src &&
        existingFontFace["unicode-range"] === fontFace["unicode-range"] &&
        existingFontFace["font-style"] === fontFace["font-style"]
    );

    if (existingFontFace) {
      const [min, max = min] = existingFontFace["font-weight"].split(" ");

      existingFontFace["font-weight"] = [
        Math.min(Number(min), Number(fontFace["font-weight"])),
        Math.max(Number(max), Number(fontFace["font-weight"])),
      ].join(" ");
    } else {
      output.push(fontFace);
    }
  }

  return output;
}

/**
 * Fetch the font file from the url, and
 * write it to the app/fonts/generated/files folder.
 */
async function fetchFontFile(url: string) {
  const fileName = url.split("/").pop() ?? "";

  const response = await fetch(url);

  if (response.ok) {
    const arrayBuffer = await response.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    await fs.writeFile(
      path.join(__dirname, "../app/fonts/generated/files", fileName),
      buffer
    );

    return fileName;
  }
}

type Output = {
  scripts: {
    [k in Scripts]?: {
      heading: {
        fontFamilies: Font[];
        fontFaces: number[];
      };
      body: {
        fontFamilies: Font[];
        fontFaces: number[];
      };
    };
  };
  fontFaces: Record<number, FontFace>;
};

type Files = {
  [k in Scripts]?: {
    file: string;
    fonts: {
      heading: string;
      body: string;
    };
  };
};

// Helper method to convert the fontFace info to a proper CSS ast
const getFontFaceASTDeclaration = (fontFace: FontFace): Declaration[] => {
  const result: Declaration[] = [
    {
      type: "declaration",
      property: "font-family",
      value: fontFace["font-family"],
    },
    {
      type: "declaration",
      property: "font-style",
      value: fontFace["font-style"],
    },
    {
      type: "declaration",
      property: "font-weight",
      value: fontFace["font-weight"],
    },
    {
      type: "declaration",
      property: "src",
      value: `url('../files/${fontFace.src}') format('woff2')`,
    },
    {
      type: "declaration",
      property: "unicode-range",
      value: fontFace["unicode-range"],
    },
    {
      type: "declaration",
      property: "font-display",
      value: fontFace["font-display"],
    },
  ];

  if (fontFace["font-stretch"]) {
    result.push({
      type: "declaration",
      property: "font-stretch",
      value: fontFace["font-stretch"],
    });
  }

  return result;
};

const replaceDecleration = (
  declerations: Declaration[],
  property: string,
  value: string
) => {
  for (const index in declerations) {
    const declaration = declerations[index];

    if (declaration.property === property) {
      declerations.splice(Number(index), 1);
      break;
    }
  }

  declerations.push({
    type: "declaration",
    property,
    value,
  });

  return declerations;
};

/**
 * This file takes the output which we generated by leveraging the Google Fonts
 * API's and we try to generate a CSS as minimal as possible out of it.
 *
 * We create our own heading and body font families so there are no conflicts
 * with the existing (system) families.
 *
 * The output is a JSON file which contains the following information:
 * - file: The path to the generated CSS file
 * - fonts: The font families which are used in the CSS file
 *  - heading: The font family which can be used for headings
 *  - body: The font family which can be used for the body
 */
async function generateCSSFiles(output: Output) {
  const info: Files = {};

  for (const script of Object.keys(output.scripts) as Array<
    keyof typeof output.scripts
  >) {
    const rules: Rule[] = [];

    const heading = `"CVMaker Heading ${script}"`;
    const body = `"CVMaker Body ${script}"`;

    // @ts-expect-error
    for (const fontFace of output.scripts[script].heading.fontFaces) {
      rules.push({
        type: "font-face",
        declarations: replaceDecleration(
          getFontFaceASTDeclaration(output.fontFaces[fontFace]),
          "font-family",
          heading
        ),
      });
    }

    // @ts-expect-error
    for (const fontFace of output.scripts[script].body.fontFaces) {
      rules.push({
        type: "font-face",
        declarations: replaceDecleration(
          getFontFaceASTDeclaration(output.fontFaces[fontFace]),
          "font-family",
          body
        ),
      });
    }

    const out = stringify(
      {
        type: "stylesheet",
        stylesheet: {
          rules,
        },
      },
      {}
    );

    const file = `../app/fonts/generated/stylesheets/${script}.css`;

    await fs.writeFile(path.join(__dirname, file), out);

    info[script] = {
      file,
      fonts: {
        heading,
        body,
      },
    };
  }

  return info;
}

async function run() {
  const families: Partial<
    Record<
      Font,
      {
        weight: Weights;
        italic: boolean;
      }[]
    >
  > = {};

  for (const options of Object.values(scripts)) {
    for (const fontFamily of options.heading) {
      if (!(fontFamily in families)) {
        families[fontFamily] = [];
      }

      const styles = families?.[fontFamily] ?? [];

      for (const weight of fontWeights.heading) {
        styles.push({ weight, italic: false });
      }
    }

    for (const fontFamily of options.body) {
      if (!(fontFamily in families)) {
        families[fontFamily] = [];
      }

      const styles = families?.[fontFamily] ?? [];

      for (const weight of fontWeights.body) {
        styles.push({ weight, italic: false });
        styles.push({ weight, italic: true });
      }
    }
  }

  // Make the values in the array unique
  for (const [fontFamily, styles] of Object.entries(families) as Entries<
    Required<typeof families>
  >) {
    families[fontFamily] = styles.filter(
      (style, index, self) =>
        index ===
        self.findIndex(
          (t) => t.weight === style.weight && t.italic === style.italic
        )
    );
  }

  // Do a call to the Google Fonts API to get the CSS for all the fonts
  const url = getGoogleFontsUrl(families as Required<typeof families>);

  const response = await fetch(url, {
    headers: {
      // The file format is based off of the user agent, make sure woff2 files are fetched
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
    },
  });

  const css = await response.text();

  const fontFaces = flattenFontFaces(getFontFacesFromGoogleFontsCSS(css));

  const groupedFontFaces: Record<string, number[]> = {};

  const files = Object.fromEntries(
    await Promise.all(
      Object.values(fontFaces).map(async (fontFace) => [
        fontFace.src,
        await fetchFontFile(fontFace.src),
      ])
    )
  );

  for (const index in fontFaces) {
    const fontFace = fontFaces[index];

    if (!(fontFace["font-family"] in groupedFontFaces)) {
      groupedFontFaces[fontFace["font-family"]] = [];
    }

    groupedFontFaces[fontFace["font-family"]].push(Number(index));
  }

  const out: Output = {
    scripts: {},
    fontFaces: Object.fromEntries(
      fontFaces.map((fontFace, index) => [
        index,
        {
          ...fontFace,
          src: files[fontFace.src],
        },
      ])
    ),
  };

  for (const [script, fontFace] of Object.entries(scripts) as Entries<
    typeof scripts
  >) {
    const data: ValueOf<typeof out.scripts> = {
      heading: {
        fontFamilies: fontFace.heading,
        fontFaces: [],
      },
      body: {
        fontFamilies: fontFace.body,
        fontFaces: [],
      },
    };

    for (const fontFamily of fontFace.heading) {
      data.heading.fontFaces = groupedFontFaces[fontFamily]
        .filter((fontFace) => fontFaces[fontFace]["font-style"] !== "italic")
        .filter((fontFace) => {
          const [min, max = min] =
            fontFaces[fontFace]["font-weight"].split(" ");

          return fontWeights.heading.some(
            (weight) => weight >= Number(min) && weight <= Number(max)
          );
        });
    }

    for (const fontFamily of fontFace.body) {
      data.body.fontFaces = groupedFontFaces[fontFamily].filter((fontFace) => {
        const [min, max = min] = fontFaces[fontFace]["font-weight"].split(" ");

        return fontWeights.body.some(
          (weight) => weight >= Number(min) && weight <= Number(max)
        );
      });
    }

    out.scripts[script] = data;
  }

  const fonts = await generateCSSFiles(out);

  await fs.writeFile(
    path.join(__dirname, "../app/fonts/generated/fonts.json"),
    JSON.stringify(fonts, null, 2)
  );
  await fs.writeFile(
    path.join(__dirname, "../app/fonts/generated/data.json"),
    JSON.stringify(out, null, 2)
  );
}

run();
