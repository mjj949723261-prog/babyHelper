import { reactive } from 'vue'
import type { NavMetrics } from '../types/home'

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

export function useNavMetrics() {
  return reactive(getNavMetrics())
}
