<script setup lang="ts">
import IntroCard from '../../components/common/IntroCard.vue'
import PageShell from '../../components/common/PageShell.vue'
import { timelineContent } from '../../constants/mock-data'
import { bottomTabs } from '../../constants/navigation'
</script>

<template>
  <PageShell :tabs="bottomTabs" current-path="/pages/timeline/index">
    <IntroCard :eyebrow="timelineContent.intro.eyebrow" :title="timelineContent.intro.title" :desc="timelineContent.intro.desc" />

    <view class="timeline-list soft-card">
      <view v-for="entry in timelineContent.entries" :key="entry.title" class="timeline-item">
        <view class="timeline-dot" :class="{ active: entry.active }"></view>
        <view class="timeline-content">
          <view class="timeline-head">
            <view class="timeline-item-title">{{ entry.title }}</view>
            <view class="timeline-time">{{ entry.time }}</view>
          </view>
          <view class="timeline-item-desc">{{ entry.desc }}</view>
        </view>
      </view>
    </view>
  </PageShell>
</template>

<style lang="scss" scoped>
.timeline-list {
  padding: 24px 20px;
  border-radius: 24px;
}

.timeline-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.timeline-item {
  display: flex;
  gap: 14px;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  margin-top: 6px;
  border-radius: 9999px;
  background: #d0c3c5;
  box-shadow: 0 0 0 6px rgba(245, 230, 232, 0.7);
  flex-shrink: 0;
}

.timeline-dot.active {
  background: #665c5e;
}

.timeline-content {
  flex: 1;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(208, 195, 197, 0.45);
}

.timeline-item:last-child .timeline-content {
  border-bottom: none;
  padding-bottom: 0;
}

.timeline-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.timeline-item-title {
  color: #665c5e;
  font-size: 17px;
  line-height: 24px;
  font-weight: 600;
}

.timeline-time {
  color: #9f8f95;
  font-size: 11px;
  line-height: 16px;
  font-weight: 600;
}

.timeline-item-desc {
  margin-top: 6px;
  color: #7f7576;
  font-size: 14px;
  line-height: 22px;
}
</style>
