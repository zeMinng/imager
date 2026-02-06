import { nanoid } from 'nanoid'

/**
 * 文件大小格式化，返回带单位的文件大小
 * @param {number} bytes - 文件大小
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

/**
 * 生成唯一 ID
 * @param {number} length - ID 长度
 */
export const generateId = (length: number = 8): string => nanoid(length)

/**
 * 验证文件类型
 */
export function isValidImageFile(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  return validTypes.includes(file.type)
}

/**
 * 批量验证文件
 */
export function validateImageFiles(files: File[]): { valid: File[], invalid: File[] } {
  const valid: File[] = []
  const invalid: File[] = []
  
  files.forEach(file => {
    if (isValidImageFile(file)) {
      valid.push(file)
    } else {
      invalid.push(file)
    }
  })
  
  return { valid, invalid }
}

