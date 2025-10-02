import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'

export type Locale = 'pt' | 'en'

const LOCALE_KEY = 'mix-locale'

const messages = {
  pt: {
    appTitle: 'Mix',
    menu: {
      space: 'Espaço',
      radistions: 'Estações de rádio',
      login: 'Entrar',
      account: 'Conta'
    },
    theme: {
      switchToLight: 'Mudar para o tema claro',
      switchToDark: 'Mudar para o tema escuro'
    }
  },
  en: {
    appTitle: 'Mix',
    menu: {
      space: 'Space',
      radistions: 'Radiostations',
      login: 'Login',
      account: 'Account'
    },
    theme: {
      switchToLight: 'Switch to light theme',
      switchToDark: 'Switch to dark theme'
    }
  }
} as const
const rawSaved = (typeof localStorage !== 'undefined' && localStorage.getItem(LOCALE_KEY)) || 'pt'
const savedLocale: Locale = rawSaved === 'en' ? 'en' : 'pt'

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: savedLocale,
  fallbackLocale: 'pt',
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
