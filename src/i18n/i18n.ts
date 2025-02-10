import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import home_en from "../locales/en/home.json";
import home_vi from "../locales/vi/home.json";

export const defaultNS = "home_en";

export const resources = {
  en: {
    home: home_en,
  },
  vi: {
    home: home_vi,
  },
};

i18n.use(initReactI18next).init({
  lng: "en",
  ns: ["home"],
  defaultNS,
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
