import { useState, useCallback } from 'react'

interface UseZoomOptions {
  min?: number
  max?: number
  step?: number
  initial?: number
}

/**
 * 缩放控制 Hook
 */
export function useZoom(options: UseZoomOptions = {}) {
  const { min = 0.1, max = 2, step = 0.1, initial = 0.8 } = options

  const [zoom, setZoom] = useState(initial)

  const zoomIn = useCallback(() => {
    setZoom((prev) => Math.min(max, prev + step))
  }, [max, step])

  const zoomOut = useCallback(() => {
    setZoom((prev) => Math.max(min, prev - step))
  }, [min, step])

  const setZoomValue = useCallback(
    (value: number) => {
      setZoom(Math.max(min, Math.min(max, value)))
    },
    [min, max],
  )

  const resetZoom = useCallback(() => {
    setZoom(initial)
  }, [initial])

  return {
    zoom,
    zoomIn,
    zoomOut,
    setZoom: setZoomValue,
    resetZoom,
    zoomPercentage: Math.round(zoom * 100),
  }
}
