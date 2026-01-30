import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Layers, Github } from 'lucide-react'
import './ToolHeader.scss'

const APP_NAME = import.meta.env.VITE_APP_TITLE || 'Imager'

const ToolHeader: React.FC = () => {
  const navigate = useNavigate()

  return (
    <header className="tool-header glass">
      <div className="tool-header__brand" onClick={() => navigate('/')}>
        <div className="tool-header__logo">
          <Layers />
        </div>
        <div className="tool-header__title-group">
          <div className="tool-header__title">{APP_NAME}</div>
          <div className="tool-header__subtitle">Studio Pro</div>
        </div>
      </div>

      <div className="tool-header__actions">
        <div className="time" style={{fontSize: 14, color: 'var(--color-text-muted)'}}>最后更新时间：{__BUILD_TIME__}</div>
        <a 
          href="https://github.com/zeMinng"
          target="_blank" 
          rel="noopener noreferrer" 
          className="action-button"
          aria-label="GitHub Repository"
        >
          <Github size={18} />
        </a>
      </div>
    </header>
  )
}

export default ToolHeader
