import { reactive } from 'vue'
import type { ActivityItem, NavMetrics, QuickAction, TodoItem } from '../types/home'
import { bottomTabs } from '../constants/navigation'
import { homeContent } from '../constants/mock-data'
import topAvatarPlaceholder from '../assets/defaults/home-avatar.svg'

const fallbackNavMetrics: NavMetrics = {
  statusBarHeight: 44,
  navBarHeight: 96,
  capsuleWidth: 176,
  capsuleHeight: 32,
  windowWidth: 375,
  heroHeight: 353
}

function getNavMetrics(): NavMetrics {
  try {
    const systemInfo = uni.getSystemInfoSync()
    const menuButton = uni.getMenuButtonBoundingClientRect?.()

    if (!menuButton || !menuButton.width) {
      return fallbackNavMetrics
    }

    const statusBarHeight = systemInfo.statusBarHeight || fallbackNavMetrics.statusBarHeight
    const navBarHeight = (menuButton.top - statusBarHeight) * 2 + menuButton.height
    const windowWidth = systemInfo.windowWidth || fallbackNavMetrics.windowWidth
    const statusCardHeight = (windowWidth - 48) * 0.75
    const heroHeight = Math.round(statusBarHeight + navBarHeight + 16 + statusCardHeight)

    return {
      statusBarHeight,
      navBarHeight,
      capsuleWidth: menuButton.width,
      capsuleHeight: menuButton.height,
      windowWidth,
      heroHeight
    }
  } catch (error) {
    return fallbackNavMetrics
  }
}

export function useHomePage() {
  const navMetrics = reactive(getNavMetrics())

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

  const todos: TodoItem[] = homeContent.todos

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
