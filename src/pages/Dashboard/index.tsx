import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ALL_TOOLS } from '@/constants/dashboard'
import type { CategoryType, AppView } from '@/types/dashboard'
import Sidebar from './Sidebar/Sidebar'
import Header from './Header/Header'
import ToolCard from './ToolCard/ToolCard'
import './index.scss'

const Dashboard: React.FC = () => {
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState<CategoryType>('all')
  const filteredTools = activeTab === 'all'
  ? ALL_TOOLS 
  : ALL_TOOLS.filter(t => t.category === activeTab)

  const handleViewSelect = (view: AppView) => navigate(`/${view}`)

  return (
    <div className="dashboard">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="dashboard__content">
        <Header activeTab={activeTab} />
        {
          activeTab === 'all' ? (
            <div className="dashboard__grid dashboard__grid--bento">
              <ToolCard 
                tool={ALL_TOOLS[0]} 
                className="dashboard__grid-item--feature"
                onSelect={handleViewSelect}
              />
              <ToolCard tool={ALL_TOOLS[1]} onSelect={handleViewSelect} className="dashboard__grid-item--secondary" />
              <ToolCard tool={ALL_TOOLS[2]} onSelect={handleViewSelect} className="dashboard__grid-item--secondary" />
              
              <div className="dashboard__grid-item--utilities">
                {ALL_TOOLS.slice(3).map(tool => (
                  <ToolCard key={tool.title} tool={tool} isSmall onSelect={handleViewSelect} />
                ))}
              </div>
            </div>
          ) : (
          <div className="dashboard__grid dashboard__grid--standard">
            {filteredTools.map(tool => (
              <ToolCard key={tool.title} tool={tool} onSelect={handleViewSelect} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
