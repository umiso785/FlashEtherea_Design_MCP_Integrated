// Core Constants - 핵심 상수
export const PANEL_SIZES = {
  ACTIVITY_BAR_WIDTH: 48,
  SIDE_PANEL_MIN_WIDTH: 200,
  SIDE_PANEL_MAX_WIDTH: 600,
  SIDE_PANEL_DEFAULT_WIDTH: 300,
  RIGHT_PANEL_MIN_WIDTH: 200,
  RIGHT_PANEL_MAX_WIDTH: 600,
  RIGHT_PANEL_DEFAULT_WIDTH: 300,
  BOTTOM_PANEL_MIN_HEIGHT: 100,
  BOTTOM_PANEL_MAX_HEIGHT: 400,
  BOTTOM_PANEL_DEFAULT_HEIGHT: 200,
  STATUS_BAR_HEIGHT: 24,
} as const;

export const KEYBOARD_SHORTCUTS = {
  TOGGLE_SIDEBAR: 'Ctrl+B',
  TOGGLE_BOTTOM_PANEL: 'Ctrl+J',
  TOGGLE_TERMINAL: 'Ctrl+`',
  RUN_CODE: 'Ctrl+Enter',
  SAVE_FILE: 'Ctrl+S',
  NEW_FILE: 'Ctrl+N',
  OPEN_FILE: 'Ctrl+O',
} as const;

export const THEMES = {
  DARK: 'flashetherea-dark',
  LIGHT: 'flashetherea-light',
} as const;

export const MCP_ENDPOINTS = {
  HEALTH: '/health',
  PREDICT: '/predict',
  EXPLAIN: '/explain',
  ADAPTERS: '/adapters/status',
  ROLLBACK: '/system/rollback',
} as const;