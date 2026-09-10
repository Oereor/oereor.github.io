import { createContentLoader, type ContentData } from 'vitepress'
import type { ProjectData, ProjectStatus } from './.vitepress/theme/project'

const validStatuses = new Set<ProjectStatus>(['featured', 'active', 'archived'])

function sourceName(item: ContentData): string {
  return item.src ?? item.url
}

function requiredString(item: ContentData, field: string): string {
  const value = item.frontmatter[field]
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`[projects] ${sourceName(item)}: frontmatter.${field} 必须是非空字符串`)
  }
  return value.trim()
}

function optionalUrl(item: ContentData, field: string): string | undefined {
  const value = item.frontmatter[field]
  if (value === undefined || value === null || value === '') return undefined
  if (typeof value !== 'string') {
    throw new Error(`[projects] ${sourceName(item)}: frontmatter.${field} 必须是 URL 字符串`)
  }
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' && url.protocol !== 'http:') throw new Error('invalid protocol')
  } catch {
    throw new Error(`[projects] ${sourceName(item)}: frontmatter.${field} 不是有效的 HTTP(S) URL`)
  }
  return value
}

function requiredUrl(item: ContentData, field: string): string {
  const value = optionalUrl(item, field)
  if (!value) {
    throw new Error(`[projects] ${sourceName(item)}: frontmatter.${field} 必须是有效 URL`)
  }
  return value
}

function toProject(item: ContentData): ProjectData {
  const status = requiredString(item, 'status') as ProjectStatus
  if (!validStatuses.has(status)) {
    throw new Error(`[projects] ${sourceName(item)}: frontmatter.status 必须是 featured、active 或 archived`)
  }

  const order = item.frontmatter.order
  if (typeof order !== 'number' || !Number.isFinite(order)) {
    throw new Error(`[projects] ${sourceName(item)}: frontmatter.order 必须是有效数字`)
  }

  const tech = item.frontmatter.tech
  if (!Array.isArray(tech) || tech.length === 0 || tech.some((item) => typeof item !== 'string' || !item.trim())) {
    throw new Error(`[projects] ${sourceName(item)}: frontmatter.tech 必须是非空字符串数组`)
  }

  return {
    title: requiredString(item, 'title'),
    description: requiredString(item, 'description'),
    status,
    order,
    github: requiredUrl(item, 'github'),
    website: optionalUrl(item, 'website'),
    tech: tech.map((item) => item.trim()),
    url: item.url
  }
}

export default createContentLoader<ProjectData[]>('projects/*.md', {
  transform(items) {
    return items
      .filter((item) => item.url !== '/projects/' && item.src !== 'projects/index.md')
      .map(toProject)
      .sort((a, b) => a.order - b.order)
  }
})
