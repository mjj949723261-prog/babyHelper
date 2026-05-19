<script setup lang="ts">
import { computed } from 'vue'
import type { NavMetrics } from '../../types/home'

const props = defineProps<{
  dayTitle: string
  avatarUrl: string
  navMetrics: NavMetrics
}>()

const capsuleStyle = computed(() => ({
  width: `${props.navMetrics.capsuleWidth}px`,
  height: `${props.navMetrics.capsuleHeight}px`
}))
</script>

<template>
  <view class="nav">
    <view class="nav-left">
      <view class="avatar-wrap">
        <image class="avatar-img" :src="avatarUrl" mode="aspectFill" />
      </view>
      <view class="nav-title">{{ dayTitle }}</view>
    </view>
    <view class="nav-capsule-space" :style="capsuleStyle" />
  </view>
</template>

<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 52px;
  padding: calc(v-bind('navMetrics.statusBarHeight') * 1px + 12px) 24px 12px;
  background: linear-gradient(180deg, rgba(254, 248, 248, 0.94) 0%, rgba(254, 248, 248, 0.82) 72%, rgba(254, 248, 248, 0) 100%);
  backdrop-filter: blur(12px);
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar-wrap {
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  overflow: hidden;
  background: #f5e6e8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-img {
  width: 100%;
  height: 100%;
}

.nav-title {
  color: #665c5e;
  font-size: 18px;
  line-height: 24px;
  font-weight: 600;
}

.nav-capsule-space {
  flex-shrink: 0;
}
</style>
