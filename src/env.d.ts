declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
  }
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_SERVER?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
