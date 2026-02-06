import { useState, useCallback, useEffect } from 'react'
import { nanoid } from 'nanoid'
import type { ImageFile } from '@/types/stitcher'

export const useImageUpload = () => {
  const [images, setImages] = useState<ImageFile[]>([])

  // 添加图片
  const addImages = useCallback(async (files: File[]) => {
    const newImagePromises = files.map(file => {
      return new Promise<ImageFile>((resolve) => {
        const previewUrl = URL.createObjectURL(file)
        resolve({
          id: nanoid(),
          file,
          preview: previewUrl,
          name: file.name,
          size: file.size,
        })
      })
    })

    const resolvedImages = await Promise.all(newImagePromises)
    setImages(prev => [...prev, ...resolvedImages])
  }, [])

  // 删除
  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const target = prev.find(img => img.id === id)
      if (target) URL.revokeObjectURL(target.preview) // 释放内存
      return prev.filter(img => img.id !== id)
    })
  }, [])

  // 移动
  const moveImage = useCallback((id: string, direction: 'up' | 'down') => {
    setImages((prev) => {
      const index = prev.findIndex(img => img.id === id)

      if (index === -1) return prev
      if (direction === 'up' && index === 0) return prev
      if (direction === 'down' && index === prev.length - 1) return prev

      const newImages = [...prev]
      const targetIndex = direction === 'up' ? index - 1 : index + 1
      ;[newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]]

      return newImages
    })
  }, [])

  // 副作用清理
  useEffect(() => {
    return () => {
      images.forEach(img => URL.revokeObjectURL(img.preview))
    }
  }, [images])

  return { images, setImages, addImages, removeImage, moveImage }
}
