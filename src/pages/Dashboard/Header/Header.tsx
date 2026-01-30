import React from 'react'
import { Zap, Search } from 'lucide-react'
import { SIDEBAR_ITEMS } from '@/constants/dashboard'
import type { CategoryType } from '@/types/dashboard'
import './Header.scss'

const Header: React.FC<{ activeTab: CategoryType }> = ({ activeTab }) => {
  const currentLabel = SIDEBAR_ITEMS.find(s => s.id === activeTab)?.label || 'Dashboard'

  return (
    <div className="dashboard__header">
      <div className="dashboard__header-left">
        <div className="dashboard__badge">
          <Zap size={14} />
          <span>Studio Dashboard</span>
        </div>
        <h1 className="dashboard__title">{currentLabel}</h1>
      </div>

      <div className="dashboard__search">
        <Search className="dashboard__search-icon" size={18} />
        <input 
          type="text" 
          placeholder="Search tools or drop files..." 
          className="dashboard__search-input"
        />
      </div>
    </div>
  )
}

export default Header
