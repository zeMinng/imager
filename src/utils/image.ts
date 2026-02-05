import type { ImageFile } from '@/types/stitcher'

const FORMAT_MIME_MAP: Record<'jpg' | 'png' | 'webp', string> = {
  jpg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

export interface StitchOptions {
  quality: number
  format: 'jpg' | 'png' | 'webp'
  margin: number
  gap: number
  direction: 'vertical' | 'horizontal'
}

export async function stitchImagesToBlob(
  images: ImageFile[],
  options: StitchOptions,
): Promise<Blob> {
  if (images.length === 0) {
    throw new Error('没有可拼接的图片')
  }

  const { quality, format, margin, gap, direction } = options
  const htmlImages = await Promise.all(images.map(img => loadImage(img.preview)))

  let canvasWidth = 0
  let canvasHeight = 0

  if (direction === 'vertical') {
    canvasWidth = Math.max(...htmlImages.map(img => img.width))
    const totalImagesHeight = htmlImages.reduce((sum, img) => sum + img.height, 0)
    const totalGaps = gap * Math.max(htmlImages.length - 1, 0)
    canvasHeight = margin * 2 + totalImagesHeight + totalGaps
    canvasWidth += margin * 2
  } else {
    canvasHeight = Math.max(...htmlImages.map(img => img.height))
    const totalImagesWidth = htmlImages.reduce((sum, img) => sum + img.width, 0)
    const totalGaps = gap * Math.max(htmlImages.length - 1, 0)
    canvasWidth = margin * 2 + totalImagesWidth + totalGaps
    canvasHeight += margin * 2
  }

  const canvas = document.createElement('canvas')
  canvas.width = canvasWidth
  canvas.height = canvasHeight
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('无法获取 Canvas 上下文')
  }

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvasWidth, canvasHeight)

  if (direction === 'vertical') {
    let currentY = margin
    htmlImages.forEach(img => {
      const x = margin + (canvasWidth - margin * 2 - img.width) / 2
      ctx.drawImage(img, x, currentY)
      currentY += img.height + gap
    })
  } else {
    let currentX = margin
    htmlImages.forEach(img => {
      const y = margin + (canvasHeight - margin * 2 - img.height) / 2
      ctx.drawImage(img, currentX, y)
      currentX += img.width + gap
    })
  }

  const mimeType = FORMAT_MIME_MAP[format]
  const qualityRatio = Math.min(Math.max(quality / 100, 0), 1)

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      blob => {
        if (!blob) {
          reject(new Error('生成图片失败'))
          return
        }
        resolve(blob)
      },
      mimeType,
      format === 'png' ? undefined : qualityRatio,
    )
  })
}


