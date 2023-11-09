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
  
export const LanguageSupportMap: Record<LanguageSupported, string> = {
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

interface SubscriptionState {
  subscription: Subscription | null | undefined
  setSubscription: (subscription: Subscription | null ) => void
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({ subscription })
}))