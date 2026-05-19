<script setup lang="ts">
import HomeBottomBar from '../home/HomeBottomBar.vue'
import type { BottomTabItem } from '../../constants/navigation'

defineProps<{
  tabs: BottomTabItem[]
  currentPath: string
}>()
</script>

<template>
  <view class="page-shell">
    <view class="page-stack">
      <slot />
    </view>

    <HomeBottomBar :tabs="tabs" :current-path="currentPath" />
  </view>
</template>

<style lang="scss" scoped>
.page-shell {
  min-height: 100vh;
  padding: 24px 24px calc(118px + env(safe-area-inset-bottom));
  background: #fff7f6;
}

.page-stack {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 12px;
}
</style>
