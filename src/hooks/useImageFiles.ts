import { useState, useCallback } from 'react'
import type { ImageFile } from '@/types'

/**
 * 图片文件管理 Hook
 * 提供图片的添加、删除、移动等功能
 */
export function useImageFiles() {
  const [images, setImages] = useState<ImageFile[]>([])

  const addImages = useCallback((files: File[]) => {
    const newImages: ImageFile[] = []
    
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = () => {
        const newImage: ImageFile = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          file,
          preview: reader.result as string,
          name: file.name,
          size: file.size
        }
        setImages(prev => [...prev, newImage])
      }
      reader.readAsDataURL(file)
    })
  }, [])

  const removeImage = useCallback((id: string) => {
    setImages(prev => prev.filter(img => img.id !== id))
  }, [])

  const moveImage = useCallback((index: number, direction: 'up' | 'down') => {
    setImages(prev => {
      const newImages = [...prev]
      const targetIndex = direction === 'up' ? index - 1 : index + 1
      if (targetIndex >= 0 && targetIndex < newImages.length) {
        [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]]
      }
      return newImages
    })
  }, [])

  const clearImages = useCallback(() => {
    setImages([])
  }, [])

  return {
    images,
    addImages,
    removeImage,
    moveImage,
    clearImages
  }
}

