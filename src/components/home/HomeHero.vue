<script setup lang="ts">
import { computed } from 'vue'
import HomeTopNav from './HomeTopNav.vue'
import type { NavMetrics } from '../../types/home'

const props = defineProps<{
  dayTitle: string
  sleepStatus: string
  avatarUrl: string
  babyTitle: string
  babySubtitle: string
  statusDotActive: boolean
  illustrationIcon: string
  moreIcon: string
  statusIcon: string
  navMetrics: NavMetrics
}>()

const heroStyle = computed(() => ({
  paddingTop: `${props.navMetrics.statusBarHeight}px`,
  minHeight: `${props.navMetrics.heroHeight}px`
}))
</script>

<template>
  <view class="hero-shell">
    <view class="hero" :style="heroStyle">
      <HomeTopNav :day-title="dayTitle" :avatar-url="avatarUrl" :nav-metrics="navMetrics" />
      <view class="status-card">
        <view class="status-chip">
          <view class="status-dot" :class="{ active: statusDotActive }"></view>
          <text class="status-chip-text">{{ sleepStatus }}</text>
        </view>
        <view class="status-copy">
          <view class="status-title">{{ babyTitle }}</view>
          <view class="status-subtitle">{{ babySubtitle }}</view>
        </view>
        <view class="status-illustration">
          <text class="material-symbols-outlined illustration-icon">{{ illustrationIcon }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.hero {
  position: relative;
  padding: 0 24px 12px;
  background: #fef8f8;
}

.capsule-shell {
  position: fixed;
  top: calc(v-bind('navMetrics.statusBarHeight') * 1px + 12px);
  right: 7px;
  z-index: 41;
  width: 87px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 9999px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(12px);
}

.capsule-icon {
  font-size: 18px;
  color: #1d1b1b;
}

.capsule-divider {
  width: 1px;
  height: 16px;
  background: rgba(0, 0, 0, 0.1);
}

.status-card {
  position: relative;
  margin-top: calc(v-bind('navMetrics.navBarHeight') * 1px);
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 20px;
  background: rgba(245, 230, 232, 0.3);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  background-image: radial-gradient(#eedfe1 0.5px, transparent 0.5px);
  background-size: 16px 16px;
}

.status-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0) 46%);
  pointer-events: none;
}

.status-chip {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background: #c3c8c2;
}

.status-dot.active {
  background: #5a605b;
}

.status-chip-text {
  font-size: 11px;
  line-height: 16px;
  font-weight: 600;
  color: #5a605b;
}

.status-copy {
  position: relative;
  z-index: 2;
}

.status-title {
  margin-bottom: 4px;
  color: #665c5e;
  font-size: 30px;
  line-height: 40px;
  letter-spacing: -0.02em;
  font-weight: 700;
}

.status-subtitle {
  color: rgba(77, 69, 70, 0.8);
  font-size: 15px;
  line-height: 24px;
}

.status-illustration {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.2;
}

.illustration-icon {
  color: #665c5e;
  font-size: 120px;
}
</style>
