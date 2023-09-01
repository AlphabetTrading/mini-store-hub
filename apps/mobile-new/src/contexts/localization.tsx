
import React, { useEffect, useState } from "react";
import * as Localization from "expo-localization";
import en from "../locales/en.json";
import am from "../locales/am.json";
import { I18n } from "i18n-js";
import AsyncStorageUtils from "../utils/async_storage";

const LocalizationContext = React.createContext<{
  t: (key: string, config?: any) => string;
  locale: string;
  setLocale: (key: string) => any;
}>({
  t: (key: string, config: any) => "",
  locale: "en",
  setLocale: (data: string) => { },
});

export const LocalizationProvider = ({ children }: any) => {
  let [locale, setLocale] = useState(Localization.locale);

  const translations = {
    am,
    en,
  };
  const i18n = new I18n(translations);
  // Set the locale once at the beginning of your app.
  i18n.locale = locale;

  // When a value is missing from a language it'll fall back to another language with the key present.
  i18n.enableFallback = true;
  // To see the fallback mechanism uncomment the line below to force the app to use the Japanese language.
  //   i18n.locale = "en";
  i18n.defaultLocale = "en";

  const localizationContext = React.useMemo(
    () => ({
      t: (key: string, config?: any | undefined) => i18n.t(key, config),
      locale,
      setLocale,
    }),
    [locale]
  );

  useEffect(() => {
    const fetchLang = async () => {
      const prevLang = await AsyncStorageUtils.getItem("locale");
      if (prevLang) {
        setLocale(prevLang);
      }
    };

    fetchLang();
  }, []);

  return (
    <LocalizationContext.Provider value={localizationContext}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => React.useContext(LocalizationContext);
