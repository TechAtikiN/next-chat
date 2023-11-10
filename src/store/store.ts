// named imports
import { Subscription } from '@/types/Subscription'
import { create } from 'zustand'

export type LanguageSupported = 
  | 'en'
  |'es'
  |'de'
  |'fr'
  |'ar'
  |'hi'
  |'ja'
  |'it'
  |'ko'
  | 'ru'
  
export const LanguagesSupportedMap: Record<LanguageSupported, string> = {
  en: 'English',
  es: 'Spanish',
  de: 'German',
  fr: 'French',
  ar: 'Arabic',
  hi: 'Hindi',
  ja: 'Japanese',
  it: 'Italian',
  ko: 'Korean',
  ru: 'Russian'
}

const LANGUAGES_IN_FREE_PLAN = 2

interface LanguageState {
  language: LanguageSupported
  setLanguage: (language: LanguageSupported) => void
  getLanguages: (isPro: boolean) => LanguageSupported[]
  getNotSupportedLanguages: (isPro: boolean) => LanguageSupported[]
}

interface SubscriptionState {
  subscription: Subscription | null | undefined
  setSubscription: (subscription: Subscription | null ) => void
}

export const useLanguageStore = create<LanguageState>()((set) => ({
  language: 'en',
  setLanguage: (language: LanguageSupported) => set({ language }),
  getLanguages: (isPro: boolean) => {
    if (isPro) return Object.keys(LanguagesSupportedMap) as LanguageSupported[]
    
    return Object.keys(LanguagesSupportedMap).slice(0, LANGUAGES_IN_FREE_PLAN) as LanguageSupported[]
  },
  getNotSupportedLanguages: (isPro: boolean) => {
    if (isPro) return []
    
    return Object.keys(LanguagesSupportedMap).slice(LANGUAGES_IN_FREE_PLAN) as LanguageSupported[]
  }
}))


export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({ subscription })
}))