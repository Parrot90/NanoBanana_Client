// API Key management utilities - Google AI only
const GOOGLE_API_KEY_STORAGE_KEY = 'nano_banana_google_api_key'

export interface ApiConfig {
  provider: 'google-ai'
  apiKey: string
}

export const apiStorage = {
  // Get Google AI API key
  get: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(GOOGLE_API_KEY_STORAGE_KEY)
    }
    return null
  },

  // Set Google AI API key
  set: (apiKey: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(GOOGLE_API_KEY_STORAGE_KEY, apiKey)
    }
  },

  // Remove API key
  remove: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(GOOGLE_API_KEY_STORAGE_KEY)
    }
  },

  // Check if API key is set
  isSet: (): boolean => {
    return Boolean(apiStorage.get())
  },

  // Get configuration (always Google AI)
  getConfig: (): ApiConfig | null => {
    const apiKey = apiStorage.get()
    if (apiKey) {
      return { provider: 'google-ai', apiKey }
    }
    return null
  },

  // Set configuration (always Google AI)
  setConfig: (config: ApiConfig): void => {
    apiStorage.set(config.apiKey)
  },

  // Get provider (always Google AI)
  getProvider: (): 'google-ai' => {
    return 'google-ai'
  }
}
