export interface GiscusSiteConfig {
  repo: `${string}/${string}`
  repoId: string
  category: string
  categoryId: string
}

export const giscusSiteConfig: GiscusSiteConfig = {
  repo: 'Liao-elevens/Liao-elevens.github.io',
  repoId: 'R_kgDOM15U1A',
  category: '学习交流',
  categoryId: 'DIC_kwDOM15U1M4DCkEZ'
}

export function isGiscusConfigured(config: GiscusSiteConfig): boolean {
  return Boolean(config.repo && config.repoId && config.category && config.categoryId)
}
