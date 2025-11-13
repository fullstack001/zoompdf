export const locales = [
  "en",
  "zh",
  "cs",
  "nl",
  "fr",
  "de",
  "el",
  "hu",
  "id",
  "it",
  "ja",
  "ko",
  "ms",
  "pl",
  "pt",
  "ro",
  "sr",
  "es",
  "se",
  "th",
  "tr",
  "uk",
  "vi",
  "fi",
] as const;
export const defaultLocale = "en" as const;

export type Locale = (typeof locales)[number];
