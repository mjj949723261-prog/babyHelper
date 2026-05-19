<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import CompanionPage from './pages/companion/index.vue'
import HomePage from './pages/home/index.vue'
import ProfilePage from './pages/profile/index.vue'
import RecordPage from './pages/record/index.vue'
import TimelinePage from './pages/timeline/index.vue'
import TodoCalendarPage from './pages/todos/calendar/index.vue'
import TodoCreatePage from './pages/todos/create/index.vue'
import TodoDetailPage from './pages/todos/detail/index.vue'
import TodoPage from './pages/todos/index.vue'
import { getRuntimeLocation } from './utils/runtime-nav'

const currentPath = ref(getRuntimeLocation().path)

const routeComponent = computed(() => {
  switch (currentPath.value) {
    case '/pages/timeline/index':
      return TimelinePage
    case '/pages/record/index':
      return RecordPage
    case '/pages/companion/index':
      return CompanionPage
    case '/pages/profile/index':
      return ProfilePage
    case '/pages/todos/index':
      return TodoPage
    case '/pages/todos/detail/index':
      return TodoDetailPage
    case '/pages/todos/create/index':
      return TodoCreatePage
    case '/pages/todos/calendar/index':
      return TodoCalendarPage
    case '/pages/home/index':
    default:
      return HomePage
  }
})

function syncRoute() {
  currentPath.value = getRuntimeLocation().path
}

onMounted(() => {
  if (typeof window === 'undefined') return

  if (!window.location.hash) {
    window.location.hash = '#/pages/home/index'
  }

  syncRoute()
  window.addEventListener('hashchange', syncRoute)
})

onUnmounted(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('hashchange', syncRoute)
})
</script>

<template>
  <component :is="routeComponent" />
</template>

<style lang="scss">
page {
  background: #fff7f6;
  color: #4b4046;
  font-family: "Plus Jakarta Sans", "PingFang SC", "Helvetica Neue", Arial, sans-serif;
}

view,
text {
  box-sizing: border-box;
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.soft-card {
  background: rgba(255, 255, 255, 0.94);
  border-radius: 32rpx;
  box-shadow: 0 16rpx 40rpx rgba(233, 150, 173, 0.12);
}
</style>
