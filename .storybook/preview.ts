import { Decorator } from "./Decorator";
import type { Preview } from "@storybook/react";

const locale = {
  title: "Locale",
  description: "Select a locale",
  defaultValue: "nl-NL",
  toolbar: {
    icon: "globe",
    items: [
      { value: "nl-NL", title: "Dutch (Netherlands)" },
      { value: "en-GB", title: "English (United Kingdom)" },
      { value: "bg-BG", title: "Bulgarian (Bulgaria)" },
      { value: "ar-SA", title: "Arabic (Saudi Arabia)" },
      { value: "da-DK", title: "Danish (Denmark)" },
      { value: "de-DE", title: "German (Germany)" },
      { value: "es-CL", title: "Spanish (Chile)" },
      { value: "el-GR", title: "Greek (Greece)" },
      { value: "es-ES", title: "Spanish (Spain)" },
      { value: "es-PE", title: "Spanish (Peru)" },
      { value: "fi-FI", title: "Finnish (Finland)" },
      { value: "fr-FR", title: "French (France)" },
      { value: "hr-HR", title: "Croatian (Croatia)" },
      { value: "hu-HU", title: "Hungarian (Hungary)" },
      { value: "it-IT", title: "Italian (Italy)" },
      { value: "ja-JP", title: "Japanese (Japan)" },
      { value: "ko-KR", title: "Korean (South Korea)" },
      { value: "nl-BE", title: "Dutch (Belgium)" },
      { value: "nn-NO", title: "Norwegian Nynorsk (Norway)" },
      { value: "pl-PL", title: "Polish (Poland)" },
      { value: "pt-PT", title: "Portuguese (Portugal)" },
      { value: "ro-Ro", title: "Romanian (Romania)" },
      { value: "ru-RU", title: "Russian (Russia)" },
      { value: "sr-Cyrl-RS", title: "Serbian (Cyrillic, Serbia)" },
      { value: "sv-SE", title: "Swedish (Sweden)" },
      { value: "id-ID", title: "Indonesian (Indonesia)" },
      { value: "en-US", title: "English (United States)" },
      { value: "es-AR", title: "Spanish (Argentina)" },
      { value: "ar", title: "Arabic" },
      { value: "es-MX", title: "Spanish (Mexico)" },
      { value: "tr-TR", title: "Turkish (Turkey)" },
      { value: "uk-UA", title: "Ukrainian (Ukraine)" },
    ],
  },
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const globalTypes = [locale];
export const decorators = [Decorator];

export default preview;
