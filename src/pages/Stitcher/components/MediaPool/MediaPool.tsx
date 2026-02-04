import React from 'react'
import { Plus, Image as ImageIcon, MoveUp, MoveDown, Trash2 } from 'lucide-react'
import FileInput from '@/components/business/FileInput'
import { formatFileSize } from '@/utils/file'
import type { ImageFile } from '@/types'
import './MediaPool.scss'

interface MediaPoolProps {
  images: ImageFile[]
  onAddImages: (files: File[]) => void
  onRemoveImage: (id: string) => void
  onMoveImage: (index: number, direction: 'up' | 'down') => void
}

export const MediaPool: React.FC<MediaPoolProps> = ({
  images,
  onAddImages,
  onRemoveImage,
  onMoveImage,
}) => {
  const handleFileChange = (files: File[]) => {
    onAddImages(files)
  }

  return (
    <aside className="media-pool">
      <div className="media-pool__header">
        <div className="media-pool__title-group">
          <ImageIcon className="media-pool__icon" size={18} />
          <h3 className="media-pool__title">
            图片 ({images.length})
          </h3>
        </div>

        <FileInput onImageChange={handleFileChange} />
      </div>

      <div className="media-pool__content">
        {images.length === 0 ? (
          <div className="media-pool__empty">
            <div className="media-pool__empty-icon">
              <Plus size={24} />
            </div>
            <p className="media-pool__empty-text">
              将您的图片拖到此处或点击添加开始拼接
            </p>
          </div>
        ) : (
          images.map((img, idx) => (
            <div key={img.id} className="media-pool__item">
              <div className="media-pool__item-content">
                <div className="media-pool__item-thumbnail">
                  <img src={img.preview} alt={img.name} />
                  <div className="media-pool__item-index">{idx + 1}</div>
                </div>
                <div className="media-pool__item-info">
                  <p className="media-pool__item-name">{img.name}</p>
                  <p className="media-pool__item-size">
                    {formatFileSize(img.size)}
                  </p>
                </div>
              </div>
              
              <div className="media-pool__item-actions">
                <button 
                  onClick={() => onMoveImage(idx, 'up')} 
                  disabled={idx === 0} 
                  className="media-pool__action-button"
                >
                  <MoveUp size={14} />
                </button>
                <button 
                  onClick={() => onMoveImage(idx, 'down')} 
                  disabled={idx === images.length - 1} 
                  className="media-pool__action-button"
                >
                  <MoveDown size={14} />
                </button>
                <button 
                  onClick={() => onRemoveImage(img.id)} 
                  className="media-pool__action-button media-pool__action-button--danger"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  )
}

