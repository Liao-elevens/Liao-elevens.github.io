export interface AlgorithmCategory {
  number: string
  title: string
  summary: string
  route: string
  level: '前置' | '核心' | '进阶' | '专题'
  topics: number
  accent: string
}

export interface EditorialFeature {
  eyebrow: string
  title: string
  summary: string
  route: string
  meta: string
}

export interface LearningStage {
  marker: string
  title: string
  summary: string
  route: string
}
