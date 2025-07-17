import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { locales, defaultLocale } from "@/i18n/config";

export function useLocalizedNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const navigate = (path: string) => {
    // Always add locale prefix since we're using "always" prefix
    router.push(`/${locale}${path}`);
  };

  const getLocalizedPath = (path: string, targetLocale?: string) => {
    const target = targetLocale || locale;
    return `/${target}${path}`;
  };

  const switchLocale = (newLocale: string) => {
    if (!locales.includes(newLocale as any)) {
      console.warn(`Invalid locale: ${newLocale}`);
      return;
    }

    // Split the pathname into segments
    const segments = pathname.split("/").filter(Boolean);

    // Remove the current locale from the beginning if it exists
    if (segments[0] === locale) {
      segments.shift();
    }

    // Construct the new path with the new locale
    const remainingPath = segments.length > 0 ? `/${segments.join("/")}` : "";
    const newPath = `/${newLocale}${remainingPath}`;

    console.log(
      `Switching locale from ${locale} to ${newLocale}: ${pathname} -> ${newPath}`
    );
    router.push(newPath);
  };

  return {
    navigate,
    getLocalizedPath,
    switchLocale,
    currentLocale: locale,
    pathname,
  };
}
