export const PUBLIC_ROUTES = {
  SIGN_IN: '/',
  SIGN_UP: '/signup',
  VERIFICATION: '/verification',
} as const;

export const PRIVATE_ROUTES = {
  DIAGRAMS: '/diagrams',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  FAVORITES: '/favorites',
} as const;

export const STORAGE_KEYS = {
  AUTO_SAVE_ENABLED: 'AUTO_SAVE_ENABLED',
  AUTO_SAVE_INTERVAL: 'AUTO_SAVE_INTERVAL',
} as const;
