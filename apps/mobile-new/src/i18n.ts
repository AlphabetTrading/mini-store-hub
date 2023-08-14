import en from "./locales/en.json";
import am from "./locales/am.json";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

// Set the key-value pairs for the different languages you want to support.
const translations = {
  am,
  en,
};
const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fall back to another language with the key present.
i18n.enableFallback = true;
// To see the fallback mechanism uncomment the line below to force the app to use the Japanese language.
i18n.locale = "en";

// how to use it
// import i18n from './i18n';
// i18n.t('greeting');
// i18n.t('greeting', {locale: 'fr'});
// i18n.t('greeting', {locale: 'en'});
// i18n.t('greeting', {locale: 'am'});
// i18n.t('greeting', {locale: 'am', name: 'John'});

export default i18n;

// import {I18nManager} from 'react-native';
// import memoize from 'lodash.memoize';

// export const DEFAULT_LANGUAGE = 'en';

// export const translationGetters = {
//   // lazy requires (metro bundler does not support symlinks)
//   en: () => require("./locales/en.json"),
//   am: () => require("./locales/am.json"),
// };

// export const translate = memoize(
//     (key, config) => I18n.(key, config),
