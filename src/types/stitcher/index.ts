
export interface CropData {
  x: number
  y: number
  width: number
  height: number
}

export interface ImageFile {
  id: string
  file: File
  preview: string
  name: string
  size: number
  rotation: number
  crop: CropData
}

export interface StitchSettings {
  quality: number
  format: 'jpg' | 'png' | 'webp'
  margin: number
  gap: number
  direction: 'vertical' | 'horizontal'
}
