// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import TRANSLATE_EN from "../locales/en/translate.json";
import TRANSLATE_VI from "../locales/vi/translate.json";

export const defaultNS = "TRANSLATE_EN";

export const resources = {
  en: {
    TRANSLATE_EN: TRANSLATE_EN,
  },
  vi: {
    TRANSLATE_EN: TRANSLATE_VI,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: "en",
  ns: ["TRANSLATE_EN"],
  defaultNS,
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
