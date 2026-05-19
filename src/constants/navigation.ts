export interface BottomTabItem {
  icon: string
  label: string
  path: string
}

export const bottomTabs: BottomTabItem[] = [
  { icon: 'home', label: '首页', path: '/pages/home/index' },
  { icon: 'timeline', label: '成长时间线', path: '/pages/timeline/index' },
  { icon: 'add_circle', label: '快速记录', path: '/pages/record/index' },
  { icon: 'favorite', label: '今日陪伴', path: '/pages/companion/index' },
  { icon: 'person', label: '我的', path: '/pages/profile/index' }
]
