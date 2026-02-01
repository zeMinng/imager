import React, { useState, useRef, type ChangeEvent, useMemo, useEffect } from 'react'
import { Plus, X } from 'lucide-react'
import './index.scss'

type UploadVariant = 'button' | 'card'
interface FileInputProps {
  variant?: UploadVariant // 区分普通button或者传统大方块上传UI
  multiple?: boolean // 是否多选
  maxSizeMB?: number // 限制文件大小，暂时不考虑
  onImageChange?: (file: File[]) => void // 文件变化回调
}

const FileInput: React.FC<FileInputProps> = ({
  variant = 'button',
  multiple = true,
  onImageChange,
}) => {
  const [fileList, setFileList] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const previews = useMemo(() => {
    return fileList.map(file => URL.createObjectURL(file))
  }, [fileList])

  const shouldShowUploadTrigger = multiple || fileList.length === 0

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    if (!selectedFiles.length) return
    const newList = multiple ? [...fileList, ...selectedFiles] : [selectedFiles[0]]
    setFileList(newList)
    
    const filesToReturn = multiple ? selectedFiles : [selectedFiles[0]]
    onImageChange?.(filesToReturn)
    
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemove = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const newList = fileList.filter((_, i) => i !== index)
    setFileList(newList)
  }

  const renderUploadCard = () => (
    <div className="upload-card" onClick={handleUploadClick}>
      <Plus size={24} />
      <span>上传图片</span>
    </div>
  )

  const renderPreviewItems = () => (
    <>
      {previews.map((url, index) => (
        <div key={url} className="preview-wrapper">
          <img src={url} alt={`预览 ${index + 1}`} className="preview-img" />
          <div className="preview-overlay">
            <button 
              className="remove-btn" 
              onClick={(e) => handleRemove(index, e)}
              aria-label="删除图片"
              type="button"
              title="删除"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ))}
      {shouldShowUploadTrigger && renderUploadCard()}
    </>
  )

  return (
    <div className="upload">
      {variant === 'card' && (
        <div className="preview-grid">
          {renderPreviewItems()}
        </div>
      )}

      {variant === 'button' && shouldShowUploadTrigger && (
        <button type="button" className="upload-button" onClick={handleUploadClick}>
          <Plus size={14} />
          <span>添加图片</span>
        </button>
      )}

      <input 
        type="file"
        multiple={multiple}
        hidden
        accept="image/*"
        className="file-input"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  )
}

export default FileInput
