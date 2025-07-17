import { locales } from "./config";

export type Locale = (typeof locales)[number];

export interface I18nConfig {
  locales: readonly string[];
  defaultLocale: string;
  localePrefix: "always" | "as-needed";
}

export interface TranslationMessages {
  navigation: {
    home: string;
    convert: string;
    edit: string;
    compress: string;
    sign: string;
    merge: string;
    split: string;
    forms: string;
    files: string;
    account: string;
    login: string;
    logout: string;
  };
  pages: {
    home: string;
    convertPdf: string;
    editPdf: string;
    compressPdf: string;
    signPdf: string;
    mergePdf: string;
    splitPdf: string;
    forms: string;
    files: string;
    account: string;
    login: string;
    payment: string;
    plan: string;
  };
  common: {
    upload: string;
    download: string;
    convert: string;
    edit: string;
    save: string;
    cancel: string;
    delete: string;
    back: string;
    next: string;
    previous: string;
    loading: string;
    error: string;
    success: string;
    chooseFile: string;
    dragAndDrop: string;
    or: string;
    browse: string;
  };
  tools: {
    pdfToWord: string;
    pdfToExcel: string;
    pdfToPptx: string;
    pdfToPng: string;
    pdfToJpg: string;
    pdfToEpub: string;
    wordToPdf: string;
    excelToPdf: string;
    pngToPdf: string;
    jpgToPdf: string;
    epubToPdf: string;
  };
  auth: {
    email: string;
    password: string;
    confirmPassword: string;
    forgotPassword: string;
    resetPassword: string;
    signIn: string;
    signUp: string;
    alreadyHaveAccount: string;
    dontHaveAccount: string;
  };
}
