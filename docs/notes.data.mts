import { createContentLoader, type ContentData } from 'vitepress'
import type { NoteData } from './.vitepress/theme/note'

function sourceName(item: ContentData): string {
  return item.src ?? item.url
}

function requiredTitle(item: ContentData): string {
  const value = item.frontmatter.title
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`[notes] ${sourceName(item)}: frontmatter.title 必须是非空字符串`)
  }
  return value.trim()
}

function optionalString(item: ContentData, field: string): string | undefined {
  const value = item.frontmatter[field]
  if (value === undefined || value === null || value === '') return undefined
  if (typeof value !== 'string') {
    throw new Error(`[notes] ${sourceName(item)}: frontmatter.${field} 必须是字符串`)
  }
  const normalized = value.trim()
  return normalized || undefined
}

function normalizeDate(item: ContentData): string | undefined {
  const value = item.frontmatter.date
  if (value === undefined || value === null || value === '') return undefined

  const normalized = value instanceof Date
    ? value.toISOString().slice(0, 10)
    : typeof value === 'string'
      ? value.trim()
      : ''

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(normalized)
  if (!match) {
    throw new Error(`[notes] ${sourceName(item)}: frontmatter.date 必须使用 YYYY-MM-DD 格式`)
  }

  const [, year, month, day] = match
  const parsed = new Date(`${normalized}T00:00:00Z`)
  if (
    Number.isNaN(parsed.getTime()) ||
    parsed.getUTCFullYear() !== Number(year) ||
    parsed.getUTCMonth() + 1 !== Number(month) ||
    parsed.getUTCDate() !== Number(day)
  ) {
    throw new Error(`[notes] ${sourceName(item)}: frontmatter.date 不是有效日期`)
  }

  return normalized
}

function normalizeTags(item: ContentData): string[] | undefined {
  const value = item.frontmatter.tags
  if (value === undefined || value === null) return undefined
  if (!Array.isArray(value)) {
    throw new Error(`[notes] ${sourceName(item)}: frontmatter.tags 必须是字符串数组`)
  }
  if (value.some((tag) => typeof tag !== 'string' || tag.trim() === '')) {
    throw new Error(`[notes] ${sourceName(item)}: frontmatter.tags 不能包含空值`)
  }
  const tags = value.map((tag) => tag.trim())
  return tags.length ? tags : undefined
}

function toNote(item: ContentData): NoteData {
  return {
    title: requiredTitle(item),
    description: optionalString(item, 'description'),
    date: normalizeDate(item),
    tags: normalizeTags(item),
    url: item.url
  }
}

export default createContentLoader<NoteData[]>('notes/*.md', {
  transform(items) {
    return items
      .filter((item) => item.url !== '/notes/' && item.src !== 'notes/index.md')
      .map(toNote)
      .sort((a, b) => {
        if (a.date && b.date && a.date !== b.date) return b.date.localeCompare(a.date)
        if (a.date && !b.date) return -1
        if (!a.date && b.date) return 1
        const titleOrder = a.title.localeCompare(b.title, 'zh-CN')
        return titleOrder || a.url.localeCompare(b.url)
      })
  }
})
