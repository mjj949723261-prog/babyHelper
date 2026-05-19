<script setup lang="ts">
import type { BottomTabItem } from '../../constants/navigation'

const props = defineProps<{
  tabs: BottomTabItem[]
  currentPath: string
}>()

function handleTabClick(path: string) {
  if (path === props.currentPath) return
  uni.reLaunch({ url: path })
}

</script>

<template>
  <view class="fake-tabbar">
    <view
      v-for="tab in tabs"
      :key="tab.label"
      class="tab-item"
      :class="{ active: tab.path === currentPath }"
      @tap="handleTabClick(tab.path)"
    >
      <view class="tab-pill" :class="{ active: tab.path === currentPath }">
        <text class="material-symbols-outlined tab-icon" :class="{ active: tab.path === currentPath }">{{ tab.icon }}</text>
        <text class="tab-label">{{ tab.label }}</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.fake-tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 82px;
  padding: 8px 8px 8px;
  padding-bottom: calc(8px + constant(safe-area-inset-bottom));
  padding-bottom: calc(8px + env(safe-area-inset-bottom));
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  background: #f8f2f2;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.04);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  z-index: 50;
}

.tab-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: 66px;
}

.tab-pill {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: auto;
  min-width: 56px;
  min-height: 58px;
  padding: 8px 10px;
  border-radius: 9999px;
  color: #4d4546;
}

.tab-pill.active {
  background: #f5e6e8;
  color: #716668;
}

.tab-icon {
  font-size: 22px;
  line-height: 1;
}

.tab-icon.active {
  font-variation-settings: 'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24;
}

.tab-label {
  margin-top: 2px;
  font-size: 10px;
  line-height: 14px;
  font-weight: 600;
  white-space: nowrap;
}
</style>
