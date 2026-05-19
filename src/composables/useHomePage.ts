import { reactive } from 'vue'
import type { ActivityItem, QuickAction, TodoItem } from '../types/home'
import { bottomTabs } from '../constants/navigation'
import { homeContent, todoCalendarContent } from '../constants/mock-data'
import topAvatarPlaceholder from '../assets/defaults/home-avatar.svg'
import { useNavMetrics } from './useNavMetrics'

export function useHomePage() {
  const navMetrics = useNavMetrics()

  const header = reactive({
    dayTitle: homeContent.header.dayTitle,
    sleepStatus: homeContent.header.sleepStatus
  })

  const babyStatus = reactive({
    title: homeContent.babyStatus.title,
    subtitle: homeContent.babyStatus.subtitle
  })

  const todayFocus = reactive({
    feedGap: homeContent.todayFocus.feedGap,
    currentStatus: homeContent.todayFocus.currentStatus
  })

  const quickActions: QuickAction[] = homeContent.quickActions

  const todos: TodoItem[] = todoCalendarContent.items

  const activities: ActivityItem[] = homeContent.activities

  const weeklySummary = reactive({
    title: homeContent.weeklySummary.title
  })

  const topAvatarUrl = topAvatarPlaceholder

  const babyIllustrationIcon = homeContent.icons.babyIllustration

  const weeklySummaryIcon = homeContent.icons.weeklySummary

  const topBarActions = reactive({
    moreIcon: homeContent.icons.more,
    statusIcon: homeContent.icons.status
  })

  const cardStatusDot = reactive({
    active: true
  })

  const sectionTitles = reactive({
    todo: homeContent.sectionTitles.todo,
    recent: homeContent.sectionTitles.recent
  })

  const todoMeta = reactive({
    moreLabel: homeContent.todoMeta.moreLabel,
    helper: homeContent.todoMeta.helper
  })

  const recentMoreLabel = homeContent.recentMoreLabel

  const addTodoIcon = homeContent.icons.addTodo

  return {
    navMetrics,
    header,
    babyStatus,
    todayFocus,
    quickActions,
    todos,
    activities,
    weeklySummary,
    bottomTabs,
    topAvatarUrl,
    babyIllustrationIcon,
    weeklySummaryIcon,
    topBarActions,
    cardStatusDot,
    sectionTitles,
    todoMeta,
    recentMoreLabel,
    addTodoIcon
  }
}
