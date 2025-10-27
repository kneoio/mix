import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import { messages } from 'src/i18n'
import type { Locale } from 'src/i18n'
export type { Locale } from 'src/i18n'

const LOCALE_KEY = 'mix-locale'
const rawSaved = (typeof localStorage !== 'undefined' && localStorage.getItem(LOCALE_KEY)) || 'en'
const supportedLocales = Object.keys(messages) as Locale[]
const savedLocale: Locale = supportedLocales.includes(rawSaved as Locale) ? (rawSaved as Locale) : 'en'

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: savedLocale,
  fallbackLocale: false,
  missingWarn: true,
  fallbackWarn: true,
  warnHtmlMessage: true,
  messages
})

export default boot(({ app }): void => {
  app.use(i18n)
})

export function setLocale (locale: Locale) {
  i18n.global.locale.value = locale
  try {
    localStorage.setItem(LOCALE_KEY, locale)
  } catch (err) {
    void err
  }
}
