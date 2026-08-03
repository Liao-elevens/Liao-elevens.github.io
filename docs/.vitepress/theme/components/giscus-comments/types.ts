export interface CommentFrontmatter {
  comments?: boolean
  commentId?: string
}

export type GiscusTheme = 'light' | 'dark_dimmed'

export interface GiscusThemeMessage {
  giscus: {
    setConfig: {
      theme: GiscusTheme
    }
  }
}
