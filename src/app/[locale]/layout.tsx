import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Providers } from "../providers";
import { FileProvider } from "../../contexts/FileContext";
import LanguageSetter from "./LanguageSetter";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <Providers>
        <FileProvider>
          <LanguageSetter locale={locale} />
          {children}
        </FileProvider>
      </Providers>
    </NextIntlClientProvider>
  );
}
