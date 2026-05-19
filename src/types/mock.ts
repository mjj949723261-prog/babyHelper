export interface IntroBlock {
  eyebrow: string
  title: string
  desc: string
}

export interface ModuleBlock {
  title: string
  tag?: string
  desc: string
}

export interface RecordOption {
  label: string
}

export interface TimelineEntry {
  title: string
  time: string
  desc: string
  active?: boolean
}

export interface SuggestionEntry {
  text: string
}

export interface TodoMeta {
  moreLabel: string
  helper: string
}
