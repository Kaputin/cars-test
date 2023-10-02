import { Locale } from '@/types/locale'

export type RootState = {
  vechiclesCount: number
  windowWidth: number
  appLocale: Locale
}
export type RootGetters = {
  isMobile: (state: RootState) => boolean
  isTablet: (state: RootState) => boolean
  isDesktop: (state: RootState) => boolean
}
