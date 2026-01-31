import React from 'react'
import { Outlet } from 'react-router-dom'
import ToolHeader from './components/ToolHeader/ToolHeader'
import Footer from './components/Footer/Footer'
import './index.scss'

const MyLayout: React.FC = () => {
  return (
    <div className="layout">
      <ToolHeader />
      <main className="main">
        <Outlet />
      <Footer />
      </main>
    </div>
  )
}

export default MyLayout
