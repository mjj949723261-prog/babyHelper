import type { ActivityItem, QuickAction, TodoItem } from '../types/home'
import type {
  IntroBlock,
  ModuleBlock,
  RecordOption,
  SuggestionEntry,
  TimelineEntry,
  TodoCalendarDay,
  TodoCalendarFilter,
  TodoMeta
} from '../types/mock'

export const homeContent = {
  header: {
    dayTitle: 'Day 45',
    sleepStatus: '正在午睡中'
  },
  babyStatus: {
    title: '宝宝今天第45天',
    subtitle: '处于快速成长期 · 需要充足睡眠'
  },
  todayFocus: {
    feedGap: '2.5小时',
    currentStatus: '正在午睡'
  },
  quickActions: [
    { icon: 'restaurant', title: '喂奶', tone: 'primary' },
    { icon: 'bedtime', title: '睡觉', tone: 'tertiary' },
    { icon: 'baby_changing_station', title: '尿布', tone: 'secondary' },
    { icon: 'device_thermostat', title: '体温', tone: 'primary-fixed' }
  ] satisfies QuickAction[],
  todos: [
    { id: 'todo1', title: '给奶瓶消毒', checked: false, note: '午睡后完成更顺手', tag: '护理' },
    { id: 'todo2', title: '补充维生素D', checked: false, note: '喂奶后提醒一次', tag: '健康' },
    { id: 'todo3', title: '记录早晨体温', checked: true, note: '已同步到今日观察', tag: '记录' },
    { id: 'todo4', title: '整理外出包', checked: false, note: '湿巾和备用衣物要补齐', tag: '出行' }
  ] satisfies TodoItem[],
  activities: [
    {
      title: '母乳喂养',
      time: '12:30',
      detail: '左侧 15分钟, 右侧 10分钟',
      icon: 'restaurant',
      tone: 'primary'
    },
    {
      title: '小睡结束',
      time: '11:15',
      detail: '持续时长 1小时20分钟',
      icon: 'bedtime',
      tone: 'tertiary'
    }
  ] satisfies ActivityItem[],
  weeklySummary: {
    title: '本周成长报告已生成'
  },
  sectionTitles: {
    todo: '今日待办',
    recent: '最近动态'
  },
  todoMeta: {
    moreLabel: '查看更多',
    helper: '把今天最关键的事先做完'
  } satisfies TodoMeta,
  recentMoreLabel: '查看全部',
  icons: {
    babyIllustration: 'child_care',
    weeklySummary: 'analytics',
    more: 'more_horiz',
    status: 'radio_button_checked',
    addTodo: 'add'
  }
}

export const profileContent: {
  intro: IntroBlock
  module: ModuleBlock
} = {
  intro: {
    eyebrow: 'Personal Space',
    title: '我的',
    desc: '这里后面可以继续补宝宝档案、家庭成员、提醒设置。'
  },
  module: {
    title: '今日陪伴',
    tag: '默认占位',
    desc: '后续这里可以接陪伴建议、互动任务、成长记录入口。'
  }
}

export const recordContent: {
  intro: IntroBlock
  module: ModuleBlock
  options: RecordOption[]
} = {
  intro: {
    eyebrow: 'Quick Capture',
    title: '快速记录',
    desc: '把高频记录收成一屏入口，后续可以接喂奶、睡觉、尿布、体温的快捷表单。'
  },
  module: {
    title: '默认模块预留',
    tag: 'MCP 占位',
    desc: '这里后续可以接“最近常用记录模板”和“上次记录回填”。'
  },
  options: [
    { label: '喂奶' },
    { label: '睡觉' },
    { label: '尿布' },
    { label: '体温' }
  ]
}

export const timelineContent: {
  intro: IntroBlock
  entries: TimelineEntry[]
} = {
  intro: {
    eyebrow: 'Growth Story',
    title: '成长时间线',
    desc: '把关键事件按时间排开，后续这里可以接睡眠、喂养、体温、陪伴活动的完整轨迹。'
  },
  entries: [
    {
      title: '12:30 母乳喂养',
      time: '今天',
      desc: '左侧 15 分钟，右侧 10 分钟，情绪稳定。',
      active: true
    },
    {
      title: '11:15 小睡结束',
      time: '今天',
      desc: '持续 1 小时 20 分钟，醒后状态轻松。'
    },
    {
      title: '08:20 早晨体温',
      time: '今天',
      desc: '体温正常，可继续观察一天精神状态。'
    }
  ]
}

export const companionContent: {
  intro: IntroBlock
  suggestionsTitle: string
  suggestions: SuggestionEntry[]
} = {
  intro: {
    eyebrow: 'Daily Bonding',
    title: '今日陪伴',
    desc: '这里先放一版默认的陪伴建议区，后续可以接音频、抚触、互动提醒和成长提示。'
  },
  suggestionsTitle: '今日建议',
  suggestions: [
    { text: '抚触 5 分钟，帮助宝宝放松入睡。' },
    { text: '午后醒来后做一次轻声互动，观察精神状态。' },
    { text: '记录今天最喜欢的陪伴片段，形成成长回顾。' }
  ]
}

export const todoDetailContent = {
  intro: {
    eyebrow: 'Today Planner',
    title: '全部待办',
    desc: '把今天需要处理的事项集中在一个页面里，方便统一查看和逐项完成。'
  },
  helper: '可先处理护理和健康类事项，再补记录与整理。',
  ctaLabel: '新增待办'
}

export const todoCalendarContent: {
  monthLabel: string
  days: TodoCalendarDay[]
  filters: TodoCalendarFilter[]
  items: TodoItem[]
} = {
  monthLabel: '2023年10月',
  days: [
    { label: '日', date: '15' },
    { label: '一', date: '16' },
    { label: '二', date: '17' },
    { label: '三', date: '18', active: true },
    { label: '四', date: '19' },
    { label: '五', date: '20' },
    { label: '六', date: '21' }
  ],
  filters: [
    { key: 'all', label: '全部', active: true },
    { key: 'special', label: '特殊' },
    { key: 'daily', label: '日常' }
  ],
  items: [
    {
      id: 'calendar-todo-1',
      title: '小憩',
      checked: false,
      note: '预计 45 分钟，保持室内昏暗',
      time: '10:30',
      timeRange: '今天 10:30 - 11:15',
      scheduleLabel: '每天',
      category: 'special',
      categoryLabel: '特殊',
      icon: 'bedtime',
      reasonTitle: '为什么这很重要？',
      reasonText: '充足的高质量小憩有助于宝宝的大脑发育，稳定情绪，避免过度疲劳导致的夜哭。',
      accent: 'primary'
    },
    {
      id: 'calendar-todo-2',
      title: '喂奶',
      checked: false,
      note: '配方奶 120ml，注意拍嗝',
      time: '08:00',
      timeRange: '今天 08:00 - 08:20',
      scheduleLabel: '每天',
      category: 'daily',
      categoryLabel: '日常',
      icon: 'restaurant',
      reasonTitle: '为什么这很重要？',
      reasonText: '规律喂养能帮助宝宝建立稳定节奏，也方便你更轻松地判断后续状态。',
      accent: 'tertiary'
    },
    {
      id: 'calendar-todo-3',
      title: '换尿不湿',
      checked: true,
      note: '早晨第一次清理',
      time: '06:30',
      timeRange: '今天 06:30 - 06:40',
      scheduleLabel: '每天',
      category: 'daily',
      categoryLabel: '日常',
      icon: 'checkroom',
      reasonTitle: '为什么这很重要？',
      reasonText: '及时更换能让宝宝更舒适，也能减少红屁股和睡眠被打断的情况。',
      accent: 'tertiary'
    }
  ]
}
