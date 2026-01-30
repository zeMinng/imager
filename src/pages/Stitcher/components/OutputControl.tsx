import React from 'react'
import { Settings2, Info, Download } from 'lucide-react'
import type { StitchSettings } from '@/types'
import './OutputControl.scss'

interface OutputControlProps {
  settings: StitchSettings
  onSettingsChange: (settings: StitchSettings) => void
  onDownload: () => void
  isProcessing: boolean
  imageCount: number
}

export const OutputControl: React.FC<OutputControlProps> = ({
  settings,
  onSettingsChange,
  onDownload,
  isProcessing,
  imageCount,
}) => {
  const updateSetting = <K extends keyof StitchSettings>(
    key: K,
    value: StitchSettings[K]
  ) => {
    onSettingsChange({ ...settings, [key]: value })
  }

  return (
    <aside className="output-control">
      <div className="output-control__header">
        <div className="output-control__title-group">
          <Settings2 className="output-control__icon" size={18} />
          <h3 className="output-control__title">Output Control</h3>
        </div>
      </div>

      <div className="output-control__content">
        {/* Format Selection */}
        <div className="output-control__section">
          <label className="output-control__label">
            Target Format
            <Info size={12} />
          </label>
          <div className="output-control__format-grid">
            {(['jpg', 'png', 'webp'] as const).map(fmt => (
              <button
                key={fmt}
                onClick={() => updateSetting('format', fmt)}
                className={`output-control__format-button ${
                  settings.format === fmt ? 'output-control__format-button--active' : ''
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        {/* Quality Slider */}
        <div className="output-control__section">
          <div className="output-control__slider-header">
            <label className="output-control__label">Master Quality</label>
            <span className="output-control__value">{settings.quality}%</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="100" 
            value={settings.quality}
            onChange={(e) => updateSetting('quality', parseInt(e.target.value))}
            className="output-control__slider"
          />
        </div>

        {/* Padding Adjust */}
        <div className="output-control__section">
          <div className="output-control__slider-header">
            <label className="output-control__label">Outer Padding</label>
            <span className="output-control__value">{settings.margin}px</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="128" 
            step="4"
            value={settings.margin}
            onChange={(e) => updateSetting('margin', parseInt(e.target.value))}
            className="output-control__slider"
          />
        </div>

        {/* Gap Adjust */}
        <div className="output-control__section">
          <div className="output-control__slider-header">
            <label className="output-control__label">Inter-Image Gap</label>
            <span className="output-control__value">{settings.gap}px</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="64" 
            step="2"
            value={settings.gap}
            onChange={(e) => updateSetting('gap', parseInt(e.target.value))}
            className="output-control__slider"
          />
        </div>

        {/* Direction Toggle */}
        <div className="output-control__section">
          <label className="output-control__label">Stack Direction</label>
          <button 
            onClick={() => updateSetting('direction', settings.direction === 'vertical' ? 'horizontal' : 'vertical')}
            className="output-control__direction-button"
          >
            <span className="capitalize">{settings.direction} Alignment</span>
            <span className={`output-control__direction-icon ${settings.direction === 'horizontal' ? 'output-control__direction-icon--rotated' : ''}`}>
              ↕
            </span>
          </button>
        </div>
      </div>

      <div className="output-control__footer">
        <div className="output-control__footer-info">
          <span className="output-control__footer-label">Est. Dimensions</span>
          <span className="output-control__footer-value">4000 × 12400</span>
        </div>
        <button 
          onClick={onDownload}
          disabled={imageCount === 0 || isProcessing}
          className="output-control__download-button"
        >
          {isProcessing ? (
            <>
              <div className="output-control__spinner"></div>
              <span>Processing 8K...</span>
            </>
          ) : (
            <>
              <Download size={18} />
              <span>Export Stitched Asset</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}

