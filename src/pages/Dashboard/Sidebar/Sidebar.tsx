import React from 'react'
import { ArrowRight, Cpu } from 'lucide-react'
import { SIDEBAR_ITEMS } from '@/constants/dashboard'
import type { CategoryType } from '@/types/dashboard'
import './Sidebar.scss'

interface SidebarProps {
  activeTab: CategoryType
  onTabChange: (tab: CategoryType) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar__content">
        <div className="sidebar__section">
          <div className="sidebar__nav">
            <h3 className="sidebar__title">System Navigation</h3>
            <nav className="sidebar__nav-list">
              {SIDEBAR_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`sidebar__nav-item ${
                    activeTab === item.id ? 'sidebar__nav-item--active' : ''
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="sidebar__queue">
            <h3 className="sidebar__title">Queue Status</h3>
            <div className="sidebar__queue-card">
              <div className="sidebar__queue-header">
                <span className="sidebar__queue-label">Processing Node</span>
                <span className="sidebar__queue-status">IDLE</span>
              </div>
              <div className="sidebar__queue-progress">
                <div className="sidebar__queue-progress-bar"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar__promo">
          <div className="sidebar__promo-bg">
            <Cpu size={80} />
          </div>
          <p className="sidebar__promo-label">Imager 图片处理工具箱</p>
          <p className="sidebar__promo-text">无需服务器，直接在浏览器中使用</p>
          <div className="sidebar__promo-link">
            了解更多 <ArrowRight size={10} />
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
