/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_API_KEY: string
  readonly VITE_GOOGLE_CSE_ID: string
  readonly VITE_OPENWEATHER_API_KEY: string
  readonly VITE_OPENAI_API_KEY: string
  readonly VITE_UNSPLASH_ACCESS_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}