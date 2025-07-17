# Internationalization (i18n) Setup

This project now supports multiple languages with URL-based locale routing. The default language is English, which doesn't show a locale prefix in the URL.

## Supported Languages

- **English (en)** - Default language, no URL prefix
- **French (fr)** - `/fr`
- **Swedish (se)** - `/se`
- **Korean (ko)** - `/ko`
- **Spanish (es)** - `/es`
- **German (de)** - `/de`
- **Italian (it)** - `/it`
- **Portuguese (pt)** - `/pt`
- **Japanese (ja)** - `/ja`
- **Chinese (zh)** - `/zh`

## URL Structure

- English: `/sign-pdf`, `/files`, `/convert-pdf`
- Other languages: `/fr/sign-pdf`, `/ko/files`, `/se/convert-pdf`

## How to Use

### 1. Adding Translations

Add new translations to the `messages/` directory. Each language should have its own JSON file:

```json
// messages/fr.json
{
  "navigation": {
    "home": "Accueil",
    "convert": "Convertir"
  },
  "common": {
    "upload": "Télécharger",
    "download": "Télécharger"
  }
}
```

### 2. Using Translations in Components

```tsx
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations();

  return (
    <div>
      <h1>{t("navigation.home")}</h1>
      <button>{t("common.upload")}</button>
    </div>
  );
}
```

### 3. Navigation with Locales

Use the `useLocalizedNavigation` hook for locale-aware navigation:

```tsx
import { useLocalizedNavigation } from "@/utils/navigation";

export default function MyComponent() {
  const { navigate, switchLocale, currentLocale } = useLocalizedNavigation();

  return (
    <div>
      <button onClick={() => navigate("/files")}>Go to Files</button>
      <button onClick={() => switchLocale("fr")}>Switch to French</button>
    </div>
  );
}
```

### 4. Language Switcher

The navbar now includes a language switcher that allows users to change languages. The switcher is available in both desktop and mobile views.

## File Structure

```
src/
├── app/
│   ├── [locale]/          # All pages with locale support
│   │   ├── layout.tsx     # Locale-aware layout
│   │   ├── page.tsx       # Home page
│   │   ├── sign-pdf/      # Sign PDF page
│   │   ├── files/         # Files page
│   │   └── ...            # Other pages
│   └── layout.tsx         # Root layout (redirects to default locale)
├── utils/
│   └── navigation.ts      # Locale-aware navigation utilities
└── components/
    └── Navbar.tsx         # Updated with language switcher

messages/
├── en.json               # English translations
├── fr.json               # French translations
├── se.json               # Swedish translations
├── ko.json               # Korean translations
└── ...                   # Other language files

i18n.ts                   # i18n configuration
middleware.ts             # Locale routing middleware
```

## Configuration

### Adding a New Language

1. Add the locale to the `locales` array in `i18n.ts`:

```ts
export const locales = [
  "en",
  "fr",
  "se",
  "ko",
  "es",
  "de",
  "it",
  "pt",
  "ja",
  "zh",
  "new-locale",
] as const;
```

2. Create a new translation file `messages/new-locale.json`

3. Update the middleware matcher in `middleware.ts`:

```ts
matcher: ["/", "/(fr|se|ko|es|de|it|pt|ja|zh|new-locale)/:path*"];
```

4. Add the language name to the language switcher in `Navbar.tsx`

### Testing

Visit `/test-i18n` to see a demonstration of the internationalization system in action.

## Key Features

- **URL-based locale routing**: Each language has its own URL structure
- **Default locale without prefix**: English URLs don't show `/en`
- **Automatic locale detection**: Middleware handles locale routing
- **Language switcher**: Users can change languages from the navbar
- **Persistent navigation**: Language preference is maintained during navigation
- **SEO-friendly**: Each language has its own URL structure for better SEO

## Best Practices

1. **Always use translation keys**: Don't hardcode text in components
2. **Use nested keys**: Organize translations logically (e.g., `navigation.home`, `common.upload`)
3. **Keep translations consistent**: Use the same keys across all language files
4. **Test all languages**: Verify that all translations work correctly
5. **Consider cultural differences**: Some translations may need cultural adaptation, not just literal translation
