import React, { useMemo, useRef, forwardRef, useImperativeHandle, useState, useEffect } from 'react'
import { Stage, Layer, Image as KonvaImage, Transformer, Rect } from 'react-konva'
import useImage from 'use-image'
import Konva from 'konva'
export interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface StitchImage {
  id: string;
  preview: string; // Blob URL
  name: string;
  width: number;  // 原始宽
  height: number; // 原始高
  crop: CropData;
  rotation: number;
}

export type LayoutDirection = 'vertical' | 'horizontal';

export interface CanvasConfig {
  gap: number;
  padding: number;
  direction: LayoutDirection;
  scale: number; // 预览缩放比例
}

const CanvasItem = ({ item, x, y, width, height, isSelected, onSelect, onDragEnd }: any) => {
  const [img] = useImage(item.preview)
  return (
    <KonvaImage
      image={img}
      x={x}
      y={y}
      width={width}    // 使用计算后的显示宽度
      height={height}  // 使用计算后的显示高度
      cropX={item.crop.x}
      cropY={item.crop.y}
      cropWidth={item.crop.width}
      cropHeight={item.crop.height}
      draggable
      id={item.id}
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={onDragEnd}
    />
  )
}

interface Props {
  images: StitchImage[];
  config: CanvasConfig;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onUpdateCrop: (id: string, newCrop: CropData) => void;
}

export const StitchCanvas = forwardRef((props: Props, ref) => {
  const { images, config, selectedId, onSelect, onUpdateCrop } = props
  const stageRef = useRef<Konva.Stage>(null)
  const transformerRef = useRef<Konva.Transformer>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  // 1. 响应式监听父容器大小
  useEffect(() => {
    const observeTarget = containerRef.current
    if (!observeTarget) return
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setSize({ width: entry.contentRect.width, height: entry.contentRect.height })
      }
    })
    resizeObserver.observe(observeTarget)
    return () => resizeObserver.disconnect()
  }, [])

  // 2. 滚轮缩放逻辑 (Zoom)
  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault()
    const stage = stageRef.current
    if (!stage) return

    const oldScale = stage.scaleX()
    const pointer = stage.getPointerPosition()
    if (!pointer) return

    // 计算缩放倍率
    const scaleBy = 1.1
    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy

    stage.scale({ x: newScale, y: newScale })

    // 重新计算位置，使缩放中心对准鼠标指针
    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    }

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    }
    stage.position(newPos)
    stage.batchDraw()
  }

  // 3. 计算布局（逻辑像素，不在此处乘 viewScale）
  const layoutItems = useMemo(() => {
    let offset = config.padding
    return images.map((img) => {
      const currentOffset = offset
      const sizeValue = config.direction === 'vertical' ? img.crop.height : img.crop.width
      offset += sizeValue + config.gap

      return {
        ...img,
        calcX: config.direction === 'vertical' ? config.padding : currentOffset,
        calcY: config.direction === 'vertical' ? currentOffset : config.padding,
      }
    })
  }, [images, config])

  // 4. Transformer 绑定
  useEffect(() => {
    if (selectedId && transformerRef.current && stageRef.current) {
      const selectedNode = stageRef.current.findOne('#' + selectedId)
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode])
        transformerRef.current.getLayer()?.batchDraw()
      }
    }
  }, [selectedId, layoutItems])

  useImperativeHandle(ref, () => ({
    exportImage: async () => {
      if (!stageRef.current) return
      onSelect(null)
      // 导出时需要注意：要导出内容全集而不是当前视口
      // 这里可以根据 layoutItems 的最大边界计算导出区域
      return stageRef.current.toDataURL({
        pixelRatio: 2, // 提高导出质量
        mimeType: 'image/png',
      })
    },
    // 自动缩放以适应屏幕
    zoomToFit: () => {
        const stage = stageRef.current
        if (!stage || images.length === 0) return
        // 简单的自动缩放逻辑：根据内容宽度缩放
        const maxWidth = Math.max(...images.map(i => i.crop.width)) + config.padding * 2
        const scale = size.width / maxWidth
        stage.scale({ x: scale, y: scale })
        stage.position({ x: 0, y: 0 })
    }
  }))

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '100%', 
        cursor: 'grab'
      }}
      onMouseDown={() => (containerRef.current!.style.cursor = 'grabbing')}
      onMouseUp={() => (containerRef.current!.style.cursor = 'grab')}
    >
      <Stage
        ref={stageRef}
        width={size.width}
        height={size.height}
        draggable // 关键：允许整体拖拽
        onWheel={handleWheel} // 关键：滚轮缩放
        onClick={(e) => {
          if (e.target === e.target.getStage()) onSelect(null)
        }}
      >
        {/* 背景层：方便用户在空白处也能抓取舞台 */}
        <Layer>
          <Rect 
            width={50000} // 设置一个足够大的感应区
            height={50000}
            x={-25000}
            y={-25000}
            fill="transparent"
            listening={true} // 确保它接收事件
          />
        </Layer>

        <Layer>
          {layoutItems.map((item) => (
            <CanvasItem
              key={item.id}
              item={item}
              x={item.calcX}
              y={item.calcY}
              width={item.crop.width}
              height={item.crop.height}
              isSelected={selectedId === item.id}
              onSelect={() => onSelect(item.id)}
              onDragEnd={(e: any) => {
                // 如果需要禁止图片拖出拼图序列，可以在这里做逻辑限制
              }}
            />
          ))}
          {selectedId && (
            <Transformer
              ref={transformerRef}
              keepRatio={true}
              rotateEnabled={false}
              ignoreStroke={true}
            />
          )}
        </Layer>
      </Stage>
    </div>
  )
})