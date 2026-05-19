<script setup lang="ts">
import { computed, ref } from 'vue'
import { navigateBack } from '../../../utils/runtime-nav'
import { readTodoCreateDraft, writeTodoCreateDraft } from '../../../utils/todo-create-draft'

type PresetKey = '1m' | '3m' | '6m' | '1y'

const presets: Array<{ key: PresetKey; label: string }> = [
  { key: '1m', label: '1个月' },
  { key: '3m', label: '3个月' },
  { key: '6m', label: '半年' },
  { key: '1y', label: '一年' }
]

const activePreset = ref<PresetKey>('1y')
const startLabel = ref('10月24日')
const endLabel = ref('2024年10月24日')
const rangeLabel = ref('2023.10.24 - 2024.10.24')

const weekLabels = ['日', '一', '二', '三', '四', '五', '六']

const month2023 = computed(() =>
  Array.from({ length: 31 }, (_, index) => {
    const day = index + 1
    const inRange = day >= 24
    return {
      day,
      inRange,
      isStart: day === 24,
      isEnd: false
    }
  })
)

const month2024Lead = computed(() =>
  Array.from({ length: 5 }, (_, index) => ({
    day: index + 1,
    inRange: true
  }))
)

const month2024Tail = computed(() =>
  Array.from({ length: 12 }, (_, index) => {
    const day = 20 + index
    return {
      day,
      inRange: day <= 24,
      isEnd: day === 24
    }
  })
)

function updatePreset(key: PresetKey) {
  activePreset.value = key

  if (key === '1m') {
    startLabel.value = '10月24日'
    endLabel.value = '11月24日'
    rangeLabel.value = '2023.10.24 - 2023.11.24'
    return
  }

  if (key === '3m') {
    startLabel.value = '10月24日'
    endLabel.value = '2024年1月24日'
    rangeLabel.value = '2023.10.24 - 2024.01.24'
    return
  }

  if (key === '6m') {
    startLabel.value = '10月24日'
    endLabel.value = '2024年4月24日'
    rangeLabel.value = '2023.10.24 - 2024.04.24'
    return
  }

  startLabel.value = '10月24日'
  endLabel.value = '2024年10月24日'
  rangeLabel.value = '2023.10.24 - 2024.10.24'
}

function goBack() {
  navigateBack('/pages/todos/create/index')
}

function confirmRange() {
  const draft = readTodoCreateDraft()
  writeTodoCreateDraft({
    ...draft,
    dateRange: rangeLabel.value
  })
  navigateBack('/pages/todos/create/index')
}
</script>

<template>
  <view class="calendar-page">
    <view class="calendar-shell">
      <view class="calendar-topbar">
        <button class="topbar-button" @tap="goBack" @click="goBack">
          <text class="material-symbols-outlined topbar-icon">close</text>
        </button>
        <text class="topbar-title">选择日期范围</text>
        <button class="confirm-button" @tap="confirmRange" @click="confirmRange">确定</button>
      </view>

      <view class="preset-row">
        <button
          v-for="preset in presets"
          :key="preset.key"
          class="preset-pill"
          :class="{ active: activePreset === preset.key }"
          @tap="updatePreset(preset.key)"
          @click="updatePreset(preset.key)"
        >
          {{ preset.label }}
        </button>
      </view>

      <view class="summary-bar">
        <view class="summary-block">
          <text class="summary-label">开始日期</text>
          <text class="summary-value">{{ startLabel }}</text>
        </view>
        <view class="summary-arrow-wrap">
          <text class="material-symbols-outlined summary-arrow">arrow_forward</text>
        </view>
        <view class="summary-block align-right">
          <text class="summary-label">结束日期</text>
          <text class="summary-value">{{ endLabel }}</text>
        </view>
      </view>

      <view class="weekday-row">
        <text v-for="label in weekLabels" :key="label" class="weekday-cell">{{ label }}</text>
      </view>

      <scroll-view class="calendar-scroll" scroll-y>
        <view class="month-section">
          <text class="month-title">2023年 10月</text>
          <view class="month-grid">
            <view v-for="empty in 6" :key="`empty-${empty}`" class="day-slot empty"></view>

            <view
              v-for="item in month2023"
              :key="`m2023-${item.day}`"
              class="day-slot"
              :class="{
                range: item.inRange,
                start: item.isStart
              }"
            >
              <text class="day-text" :class="{ start: item.isStart }">{{ item.day }}</text>
            </view>
          </view>
        </view>

        <view class="month-section bordered">
          <text class="month-title">2024年 10月</text>
          <view class="month-grid tail-grid">
            <view
              v-for="item in month2024Lead"
              :key="`lead-${item.day}`"
              class="day-slot range"
            >
              <text class="day-text">{{ item.day }}</text>
            </view>

            <view class="range-gap">
              <view class="range-gap-bar">
                <view class="range-dot"></view>
                <view class="range-dot"></view>
                <view class="range-dot"></view>
              </view>
            </view>

            <view
              v-for="item in month2024Tail"
              :key="`tail-${item.day}`"
              class="day-slot"
              :class="{
                range: item.inRange,
                end: item.isEnd
              }"
            >
              <text class="day-text" :class="{ end: item.isEnd }">{{ item.day }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.calendar-page {
  min-height: 100vh;
  background: #fef8f8;
  color: #1d1b1b;
}

.calendar-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.calendar-topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: calc(env(safe-area-inset-top) + 74px);
  padding: env(safe-area-inset-top) 24px 14px;
  border-bottom: 1px solid #e6e1e1;
  background: rgba(254, 248, 248, 0.92);
  backdrop-filter: blur(14px);
}

.topbar-button,
.confirm-button,
.preset-pill {
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.topbar-button {
  width: 40px;
  height: 40px;
  background: transparent;
  color: #4d4546;
}

.topbar-icon {
  font-size: 24px;
}

.topbar-title {
  position: absolute;
  left: 50%;
  bottom: 18px;
  transform: translateX(-50%);
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
}

.confirm-button {
  min-width: 64px;
  height: 32px;
  padding: 0 16px;
  border-radius: 9999px;
  background: #665c5e;
  color: #fff;
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
  box-shadow: 0 2px 6px rgba(102, 92, 94, 0.08);
}

.preset-row {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 16px 24px;
  border-bottom: 1px solid #ece7e6;
}

.preset-pill {
  flex-shrink: 0;
  height: 36px;
  padding: 0 16px;
  border-radius: 9999px;
  border: 1px solid #d0c3c5;
  background: #fff;
  color: #4d4546;
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
}

.preset-pill.active {
  border-color: transparent;
  background: #f5e6e8;
  color: #716668;
}

.summary-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: #f8f2f2;
}

.summary-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.summary-block.align-right {
  text-align: right;
}

.summary-label {
  color: #7f7576;
  font-size: 11px;
  line-height: 16px;
  font-weight: 600;
}

.summary-value {
  color: #1d1b1b;
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
}

.summary-arrow-wrap {
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  background: #e6e1e1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.summary-arrow {
  color: #7f7576;
  font-size: 14px;
}

.weekday-row {
  position: sticky;
  top: calc(env(safe-area-inset-top) + 74px + 69px + 76px);
  z-index: 10;
  display: flex;
  justify-content: space-between;
  padding: 12px 24px;
  border-bottom: 1px solid #e6e1e1;
  background: rgba(254, 248, 248, 0.95);
  backdrop-filter: blur(8px);
}

.weekday-cell {
  width: 40px;
  text-align: center;
  color: #7f7576;
  font-size: 11px;
  line-height: 16px;
  font-weight: 600;
}

.calendar-scroll {
  flex: 1;
  padding: 0 24px env(safe-area-inset-bottom);
}

.month-section {
  padding: 24px 0;
}

.month-section.bordered {
  border-top: 1px solid #ece7e6;
}

.month-title {
  margin-bottom: 16px;
  display: block;
  color: #1d1b1b;
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
}

.month-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 8px 0;
}

.tail-grid {
  align-items: center;
}

.day-slot {
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.day-slot.empty {
  visibility: hidden;
}

.day-slot.range {
  background: #f5e6e8;
}

.day-slot.start::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 50%;
  background: #f5e6e8;
}

.day-slot.end::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 50%;
  background: #f5e6e8;
}

.day-text {
  position: relative;
  z-index: 1;
  color: #7f7576;
  font-size: 15px;
  line-height: 24px;
}

.day-text.start,
.day-text.end {
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background: #665c5e;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(102, 92, 94, 0.12);
}

.range-gap {
  grid-column: span 7;
  height: 40px;
  padding: 0 4px;
  display: flex;
  align-items: center;
}

.range-gap-bar {
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  background: rgba(245, 230, 232, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.range-dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: rgba(113, 102, 104, 0.3);
}
</style>
