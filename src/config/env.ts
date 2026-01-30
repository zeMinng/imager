/**
 * 获取应用标题
 */
export function getAppTitle(): string {
  return import.meta.env.VITE_APP_TITLE || 'Imager'
}
