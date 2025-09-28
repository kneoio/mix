import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'

export type Locale = 'en' | 'fr'

const LOCALE_KEY = 'app:locale'

const messages = {
  en: {
    appTitle: 'Mix',
    menu: {
      favorites: 'Favorites',
      radistions: 'Radistions',
      login: 'Login',
      account: 'Account'
    },
    theme: {
      switchToLight: 'Switch to light theme',
      switchToDark: 'Switch to dark theme'
    }
  },
  fr: {
    appTitle: 'Mix',
    menu: {
      favorites: 'Favoris',
      radistions: 'Radistions',
      login: 'Connexion',
      account: 'Compte'
    },
    theme: {
      switchToLight: 'Passer au thème clair',
      switchToDark: 'Passer au thème sombre'
    }
  }
} as const

const rawSaved = (typeof localStorage !== 'undefined' && localStorage.getItem(LOCALE_KEY)) || 'en'
const savedLocale: Locale = rawSaved === 'fr' ? 'fr' : 'en'

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: savedLocale,
  fallbackLocale: 'en',
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
    // ignore persistence errors (e.g., private mode)
    void err
  }
}
