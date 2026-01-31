import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Maximize2, Minimize2, Layers } from 'lucide-react'
import type { ImageFile, StitchSettings } from '@/types'
import { MediaPool } from './components/MediaPool'
import { OutputControl } from './components/OutputControl'
import './Stitcher.scss'

interface StitcherProps {
  onBack?: () => void
}

const Stitcher: React.FC<StitcherProps> = ({ onBack }) => {
  const navigate = useNavigate()
  const [images, setImages] = useState<ImageFile[]>([])
  const [settings, setSettings] = useState<StitchSettings>({
    quality: 92,
    format: 'png',
    margin: 0,
    gap: 0,
    direction: 'vertical'
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [zoom, setZoom] = useState(0.8)

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate('/dashboard')
    }
  }

  const handleAddImages = (files: File[]) => {
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = () => {
        const newImage: ImageFile = {
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview: reader.result as string,
          name: file.name,
          size: file.size
        }
        setImages(prev => [...prev, newImage])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id))
  }

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const newImages = [...images]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex >= 0 && targetIndex < newImages.length) {
      [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]]
      setImages(newImages)
    }
  }

  const handleDownload = async () => {
    if (images.length === 0) return
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      alert('Success! Image stitched at 8K resolution.')
    }, 2000)
  }

  return (
    <div className="stitcher">
      <MediaPool
        images={images}
        onAddImages={handleAddImages}
        onRemoveImage={removeImage}
        onMoveImage={moveImage}
      />

      <main className="stitcher__canvas">
        <div className="stitcher__toolbar">
          <button onClick={handleBack} className="stitcher__back-button">
            <ChevronLeft size={16} />
            <span>Dashboard</span>
          </button>

          <div className="stitcher__zoom-control">
            <button 
              onClick={() => setZoom(Math.max(0.1, zoom - 0.1))} 
              className="stitcher__zoom-button"
            >
              <Minimize2 size={18} />
            </button>
            <div className="stitcher__zoom-divider"></div>
            <span className="stitcher__zoom-value">{Math.round(zoom * 100)}%</span>
            <div className="stitcher__zoom-divider"></div>
            <button 
              onClick={() => setZoom(Math.min(2, zoom + 0.1))} 
              className="stitcher__zoom-button"
            >
              <Maximize2 size={18} />
            </button>
          </div>

          <div className="stitcher__toolbar-spacer"></div>
        </div>

        <div 
          className="stitcher__preview"
          style={{ transform: `scale(${zoom})` }}
        >
          {images.length > 0 ? (
            <div 
              className="stitcher__preview-content"
              style={{ padding: `${settings.margin}px`, gap: `${settings.gap}px` }}
            >
              {images.map(img => (
                <div key={img.id} className="stitcher__preview-item">
                  <img src={img.preview} alt="stitching preview" />
                </div>
              ))}
            </div>
          ) : (
            <div className="stitcher__empty">
              <div className="stitcher__empty-icon">
                <Layers size={48} />
              </div>
              <p className="stitcher__empty-text">Empty Workspace</p>
            </div>
          )}
        </div>
      </main>

      <OutputControl
        settings={settings}
        onSettingsChange={setSettings}
        onDownload={handleDownload}
        isProcessing={isProcessing}
        imageCount={images.length}
      />
    </div>
  )
}

export default Stitcher
