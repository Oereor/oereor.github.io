export type ProjectStatus = 'featured' | 'active' | 'archived'

export interface ProjectData {
  title: string
  description: string
  status: ProjectStatus
  order: number
  github: string
  website?: string
  tech: string[]
  url: string
}

export const projectStatusLabels: Record<ProjectStatus, string> = {
  featured: '重点项目',
  active: '项目',
  archived: '已归档'
}
