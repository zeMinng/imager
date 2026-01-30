import React from 'react'
import { ArrowRight, Layers } from 'lucide-react'
import type { AppView, Tool } from '@/types/dashboard'
import './ToolCard.scss'

interface ToolCardProps {
  tool: Tool
  onSelect?: (id: AppView) => void
  className?: string
  isSmall?: boolean
}

const ToolCard: React.FC<ToolCardProps> = ({ 
  tool,
  onSelect,
  className = '',
  // isSmall = false
}) => {
  const isLg = tool.size === 'lg'
  const isComingSoon = tool.id === 'dashboard'

  return (
    <button
      onClick={() => !isComingSoon && onSelect?.(tool.id)}
      className={`tool-card ${isLg ? 'tool-card--large' : ''} ${isComingSoon ? 'tool-card--disabled' : ''} ${className}`}
      disabled={isComingSoon}
    >
      {/* Background Decoration for Large Cards */}
      {isLg && (
        <div className="tool-card__decoration">
          <Layers size={220} />
        </div>
      )}

      <div className="tool-card__content">
        <div className="tool-card__header">
          <div className={`tool-card__icon ${isLg ? 'tool-card__icon--large' : ''}`}>
            {tool.icon}
          </div>
          <div className="tool-card__tags">
            {tool.tags.map(tag => (
              <span key={tag} className="tool-card__tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="tool-card__body">
          <h3 className={`tool-card__title ${isLg ? 'tool-card__title--large' : ''}`}>
            {tool.title}
          </h3>
          <p className={`tool-card__description ${isLg ? 'tool-card__description--large' : ''}`}>
            {tool.description}
          </p>
        </div>
      </div>

      <div className={`tool-card__footer ${isLg ? 'tool-card__footer--large' : ''}`}>
        <span className="tool-card__action-text">
          {isComingSoon ? '即将推出' : '打开模块'}
        </span>
        <div className="tool-card__action-icon">
          <ArrowRight size={14} />
        </div>
      </div>
    </button>
  )
}

export default ToolCard
