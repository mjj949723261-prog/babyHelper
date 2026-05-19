export interface QuickAction {
  icon: string
  title: string
  tone: string
}

export interface TodoItem {
  id: string
  title: string
  checked: boolean
  note?: string
  tag?: string
}

export interface TimelineItem {
  title: string
  desc: string
}

export interface ActivityItem {
  title: string
  time: string
  detail: string
  icon: string
  tone: 'primary' | 'tertiary'
}

export interface NavMetrics {
  statusBarHeight: number
  navBarHeight: number
  capsuleWidth: number
  capsuleHeight: number
  windowWidth: number
  heroHeight: number
}
