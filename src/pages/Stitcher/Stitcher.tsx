import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Maximize2, Minimize2, Layers } from 'lucide-react'
import { useImageUpload } from '@/hooks/useImageUpload'
import type { ImageFile, StitchSettings } from '@/types/stitcher'
import { generateId } from '@/utils/file'
import { stitchImagesToBlob } from '@/utils/image'
import { MediaPool } from './components/MediaPool/MediaPool'
import { OutputControl } from './components/OutputControl'
import { StitchCanvas } from '@/components/business/StitchCanvas/StitchCanvas'
import './Stitcher.scss'

const Stitcher: React.FC = () => {
  const navigate = useNavigate()
  const { images, addImages, removeImage, moveImage } = useImageUpload()
  const [settings, setSettings] = useState<StitchSettings>({
    quality: 92,
    format: 'png',
    margin: 0,
    gap: 0,
    direction: 'vertical'
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [zoom, setZoom] = useState(0.8)

  const handleBack = () => navigate('/')

  const handleDownload = async () => {
    if (images.length === 0 || isProcessing) return

    try {
      setIsProcessing(true)

      const blob = await stitchImagesToBlob(images, {
        quality: settings.quality,
        format: settings.format,
        margin: settings.margin,
        gap: settings.gap,
        direction: settings.direction,
      })

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `stitcher-${Date.now()}.${settings.format}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error(error)
      // 这里可以换成更友好的全局提示组件
      alert('生成拼接图片失败，请重试')
    } finally {
      setIsProcessing(false)
    }
  }
  const canvasRef = useRef<any>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [config, setConfig] = useState({
    gap: 0, padding: 0, direction: 'vertical', scale: 0.05
  })

  return (
    <div className="stitcher">
      <MediaPool
        images={images}
        onAddImages={addImages}
        onRemoveImage={removeImage}
        onMoveImage={moveImage}
      />

      {/* <div className="stitcher__canvas canvas-dot">
        <div className="stitcher__toolbar">
          <button onClick={handleBack} className="stitcher__back-button">
            <ChevronLeft size={16} />
            <span>主页</span>
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
              <p className="stitcher__empty-text">空工作区</p>
            </div>
          )}
        </div>
      </div> */}

      <div className="stitcher__canvas canvas-dot">

        <div className="stitcher__preview">
          <StitchCanvas
            ref={canvasRef}
            images={images}
            config={config}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onUpdateCrop={(id, newCrop) => {
              // 更新状态中的图片裁剪数据
            }}
          />
        </div>
      </div>

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
