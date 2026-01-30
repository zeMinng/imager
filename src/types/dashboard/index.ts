/** menu items */
export type CategoryType = 'all' | 'image' | 'document' | 'vector' | 'ai'
export interface SidebarItem {
  id: CategoryType
  label: string
  icon: React.ReactNode
}

/** all tools */
export type AppView = 'dashboard' | 'stitcher' | 'converter' | 'optimizer' | 'bg-remover'
export interface Tool {
  id: AppView
  category: CategoryType
  title: string
  description: string
  icon: React.ReactNode
  tags: string[]
  size?: 'sm' | 'md' | 'lg'
}

export type ToolMetadata = Omit<Tool, 'id'>