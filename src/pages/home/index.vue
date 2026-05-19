<script setup lang="ts">
import { computed } from 'vue'
import HomeActionRow from '../../components/home/HomeActionRow.vue'
import HomeBottomBar from '../../components/home/HomeBottomBar.vue'
import HomeHero from '../../components/home/HomeHero.vue'
import HomeTimeline from '../../components/home/HomeTimeline.vue'
import { useHomePage } from '../../composables/useHomePage'

const {
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
} = useHomePage()

const contentStyle = computed(() => ({
  paddingTop: `${navMetrics.heroHeight + 14}px`,
  paddingBottom: `calc(116px + env(safe-area-inset-bottom))`
}))
</script>

<template>
  <view class="page">
    <HomeHero
      :day-title="header.dayTitle"
      :sleep-status="header.sleepStatus"
      :avatar-url="topAvatarUrl"
      :baby-title="babyStatus.title"
      :baby-subtitle="babyStatus.subtitle"
      :status-dot-active="cardStatusDot.active"
      :illustration-icon="babyIllustrationIcon"
      :more-icon="topBarActions.moreIcon"
      :status-icon="topBarActions.statusIcon"
      :nav-metrics="navMetrics"
    />

    <view class="content" :style="contentStyle">
      <HomeTimeline
        :title="sectionTitles.todo"
        :add-icon="addTodoIcon"
        :todos="todos"
        :todo-more-label="todoMeta.moreLabel"
        :todo-helper="todoMeta.helper"
        :recent-title="sectionTitles.recent"
        :recent-more-label="recentMoreLabel"
        :activities="activities"
        :weekly-summary-title="weeklySummary.title"
        :weekly-summary-icon="weeklySummaryIcon"
      />
      <HomeBottomBar :tabs="bottomTabs" current-path="/pages/home/index" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.page {
  min-height: max(884px, 100vh);
  background: #fef8f8;
  color: #1d1b1b;
}

.content {
  padding-left: 24px;
  padding-right: 24px;
  max-width: 480px;
  margin: 0 auto;
}

.focus-card {
  margin-top: 18px;
  padding: 18px 20px;
  border-radius: 16px;
  background: #ebe1d7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 16px rgba(102, 92, 94, 0.05);
}

.action-section {
  margin-top: 32px;
}

.focus-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.focus-col.align-right {
  text-align: right;
}

.focus-label {
  color: rgba(106, 99, 92, 0.7);
  font-size: 11px;
  line-height: 16px;
  font-weight: 600;
}

.focus-value {
  color: #6a635c;
  font-size: 19px;
  line-height: 26px;
  font-weight: 600;
}

.focus-divider {
  width: 1px;
  height: 36px;
  background: rgba(106, 99, 92, 0.1);
}
</style>
