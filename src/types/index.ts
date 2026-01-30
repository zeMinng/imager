export interface ImageFile {
  id: string
  file: File
  preview: string
  name: string
  size: number
}

export interface StitchSettings {
  quality: number
  format: 'jpg' | 'png' | 'webp'
  margin: number
  gap: number
  direction: 'vertical' | 'horizontal'
}
