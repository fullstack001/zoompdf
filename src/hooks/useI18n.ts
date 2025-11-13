import { useTranslations, useLocale } from 'next-intl';
import { locales } from '@/i18n/config';

export function useI18n() {
  const t = useTranslations();
  const locale = useLocale();

  const isCurrentLocale = (loc: string) => locale === loc;
  
  const getLocaleName = (loc: string) => {
    const names: Record<string, string> = {
      en: 'English',
      zh: '中文',
      cs: 'Čeština',
      nl: 'Nederlands',
      fr: 'Français',
      de: 'Deutsch',
      el: 'Ελληνικά',
      hu: 'Magyar',
      id: 'Bahasa Indonesia',
      it: 'Italiano',
      ja: '日本語',
      ko: '한국어',
      ms: 'Bahasa Melayu',
      pl: 'Polski',
      pt: 'Português',
      ro: 'Română',
      sr: 'Srpski',
      es: 'Español',
      se: 'Svenska',
      th: 'แบบไทย',
      tr: 'Türkçe',
      uk: 'Українська',
      vi: 'Tiếng Việt',
      fi: 'Suomi'
    };
    return names[loc] || loc;
  };

  return {
    t,
    locale,
    locales,
    isCurrentLocale,
    getLocaleName
  };
} 