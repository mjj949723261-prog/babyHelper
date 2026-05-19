<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { navigateBack, showToast } from '../../../utils/runtime-nav'
import { readTodoCreateDraft, writeTodoCreateDraft } from '../../../utils/todo-create-draft'

const TIME_WHEEL_ITEM_HEIGHT = 56
const TIME_WHEEL_SPACER_HEIGHT = 112

const category = ref<'daily' | 'important'>('daily')
const title = ref('')
const note = ref('')
const dateRange = ref('2023.10.24 - 2024.10.24')
const startDate = ref('2023.10.24')
const endDate = ref('2024.10.24')
const startTime = ref('10:00')
const endTime = ref('11:00')

const isDateModalOpen = ref(false)
const isTimeModalOpen = ref(false)
const pickerField = ref<'start' | 'end'>('start')
const timeField = ref<'start' | 'end'>('start')
const displayYear = ref(2023)
const displayMonth = ref(10)
const selectedDay = ref(13)
const selectedHour = ref(10)
const selectedMinute = ref(0)
const hourScrollTop = ref(10 * TIME_WHEEL_ITEM_HEIGHT)
const minuteScrollTop = ref(0)
const timeWheelRenderKey = ref(0)
const hourWheelRef = ref<unknown>(null)
const minuteWheelRef = ref<unknown>(null)

const categoryTabs = computed(() => [
  { key: 'daily', label: '日常' },
  { key: 'important', label: '重要' }
])

const weekdayLabels = ['日', '一', '二', '三', '四', '五', '六']

const monthTitle = computed(() => `${displayYear.value}年 ${displayMonth.value}月`)
const currentFieldLabel = computed(() => (pickerField.value === 'start' ? '开始日期' : '结束日期'))
const currentFieldValue = computed(() => (pickerField.value === 'start' ? startDate.value : endDate.value))
const currentTimeFieldLabel = computed(() => (timeField.value === 'start' ? '开始时间' : '结束时间'))
const currentTimeFieldValue = computed(() => (timeField.value === 'start' ? startTime.value : endTime.value))
const hourOptions = computed(() => Array.from({ length: 24 }, (_, index) => String(index).padStart(2, '0')))
const minuteOptions = computed(() => Array.from({ length: 60 }, (_, index) => String(index).padStart(2, '0')))
const isAnyModalOpen = computed(() => isDateModalOpen.value || isTimeModalOpen.value)

const calendarCells = computed(() => {
  const firstDay = new Date(displayYear.value, displayMonth.value - 1, 1).getDay()
  const daysInMonth = new Date(displayYear.value, displayMonth.value, 0).getDate()
  const cells: Array<{ day: number; currentMonth: boolean; dot?: boolean }> = []

  for (let i = 0; i < firstDay; i += 1) {
    cells.push({ day: 0, currentMonth: false })
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({
      day,
      currentMonth: true,
      dot: day === 5 || day === 16
    })
  }

  while (cells.length % 7 !== 0) {
    cells.push({ day: cells.length, currentMonth: false })
  }

  return cells
})

onMounted(() => {
  const draft = readTodoCreateDraft()
  category.value = draft.category || 'daily'
  title.value = draft.title || ''
  note.value = draft.note || ''
  startDate.value = draft.startDate || '2023.10.24'
  endDate.value = draft.endDate || '2024.10.24'
  startTime.value = draft.startTime || '10:00'
  endTime.value = draft.endTime || '11:00'
  dateRange.value = draft.dateRange || `${startDate.value} - ${endDate.value}`
})

watch(isAnyModalOpen, (open) => {
  if (typeof document === 'undefined') return

  document.body.style.overflow = open ? 'hidden' : ''
  document.body.style.touchAction = open ? 'none' : ''
})

onBeforeUnmount(() => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = ''
  document.body.style.touchAction = ''
  if (hourSnapTimer) clearTimeout(hourSnapTimer)
  if (minuteSnapTimer) clearTimeout(minuteSnapTimer)
})

function syncDraft() {
  writeTodoCreateDraft({
    category: category.value,
    title: title.value,
    note: note.value,
    dateRange: dateRange.value,
    startDate: startDate.value,
    endDate: endDate.value,
    startTime: startTime.value,
    endTime: endTime.value
  })
}

function goBack() {
  navigateBack('/pages/todos/index')
}

function selectCategory(key: 'daily' | 'important') {
  category.value = key
  syncDraft()
}

function parseDateValue(value: string) {
  const [year, month, day] = value.split('.').map((item) => Number(item))
  return {
    year: year || 2023,
    month: month || 10,
    day: day || 13
  }
}

function openDateModal(field: 'start' | 'end') {
  pickerField.value = field
  const parsed = parseDateValue(field === 'start' ? startDate.value : endDate.value)
  displayYear.value = parsed.year
  displayMonth.value = parsed.month
  selectedDay.value = parsed.day
  isDateModalOpen.value = true
}

function closeDateModal() {
  isDateModalOpen.value = false
}

function parseTimeValue(value: string) {
  const [hour, minute] = value.split(':').map((item) => Number(item))
  return {
    hour: Number.isFinite(hour) ? hour : 10,
    minute: Number.isFinite(minute) ? minute : 0
  }
}

function openTimeModal(field: 'start' | 'end') {
  timeField.value = field
  const parsed = parseTimeValue(field === 'start' ? startTime.value : endTime.value)
  selectedHour.value = parsed.hour
  selectedMinute.value = parsed.minute
  isTimeModalOpen.value = true
  timeWheelRenderKey.value += 1
  nextTick(() => {
    syncTimeWheelPosition(parsed.hour, parsed.minute)
    setTimeout(() => syncTimeWheelPosition(parsed.hour, parsed.minute), 24)
    setTimeout(() => syncTimeWheelPosition(parsed.hour, parsed.minute), 96)
  })
}

function closeTimeModal() {
  isTimeModalOpen.value = false
}

let hourSnapTimer: ReturnType<typeof setTimeout> | null = null
let minuteSnapTimer: ReturnType<typeof setTimeout> | null = null

function resolveWheelElement(target: unknown): HTMLElement | null {
  if (typeof HTMLElement === 'undefined' || !target) return null
  if (target instanceof HTMLElement) return target

  const maybeElement = (target as { $el?: unknown }).$el
  if (maybeElement instanceof HTMLElement) {
    return maybeElement.matches('.time-wheel-column')
      ? maybeElement
      : maybeElement.querySelector('.time-wheel-column')
  }

  return null
}

function applyWheelScrollTop(target: unknown, scrollTop: number) {
  const element = resolveWheelElement(target)
  if (!element) return
  element.scrollTop = scrollTop
}

function syncTimeWheelPosition(hour: number, minute: number) {
  const nextHourTop = hour * TIME_WHEEL_ITEM_HEIGHT
  const nextMinuteTop = minute * TIME_WHEEL_ITEM_HEIGHT

  hourScrollTop.value = nextHourTop
  minuteScrollTop.value = nextMinuteTop
  applyWheelScrollTop(hourWheelRef.value, nextHourTop)
  applyWheelScrollTop(minuteWheelRef.value, nextMinuteTop)
}

function clampIndex(value: number, max: number) {
  return Math.max(0, Math.min(value, max))
}

function scheduleWheelSnap(type: 'hour' | 'minute') {
  const timer = type === 'hour' ? hourSnapTimer : minuteSnapTimer
  if (timer) clearTimeout(timer)

  const nextTimer = setTimeout(() => {
    if (type === 'hour') {
      syncTimeWheelPosition(selectedHour.value, selectedMinute.value)
      hourSnapTimer = null
      return
    }

    syncTimeWheelPosition(selectedHour.value, selectedMinute.value)
    minuteSnapTimer = null
  }, 90)

  if (type === 'hour') {
    hourSnapTimer = nextTimer
  } else {
    minuteSnapTimer = nextTimer
  }
}

function handleWheelScroll(type: 'hour' | 'minute', event: { detail?: { scrollTop?: number } }) {
  const scrollTop = event.detail?.scrollTop ?? 0
  const maxIndex = type === 'hour' ? hourOptions.value.length - 1 : minuteOptions.value.length - 1
  const nextIndex = clampIndex(Math.round(scrollTop / TIME_WHEEL_ITEM_HEIGHT), maxIndex)

  if (type === 'hour') {
    selectedHour.value = nextIndex
  } else {
    selectedMinute.value = nextIndex
  }

  scheduleWheelSnap(type)
}

function selectWheelValue(type: 'hour' | 'minute', index: number) {
  if (type === 'hour') {
    selectedHour.value = index
  } else {
    selectedMinute.value = index
  }

  syncTimeWheelPosition(selectedHour.value, selectedMinute.value)
}

function changeMonth(offset: number) {
  const next = new Date(displayYear.value, displayMonth.value - 1 + offset, 1)
  displayYear.value = next.getFullYear()
  displayMonth.value = next.getMonth() + 1
}

function selectCalendarDay(day: number) {
  if (!day) return
  selectedDay.value = day
}

function formatDateValue(year: number, month: number, day: number) {
  return `${year}.${String(month).padStart(2, '0')}.${String(day).padStart(2, '0')}`
}

function confirmDateModal() {
  const nextValue = formatDateValue(displayYear.value, displayMonth.value, selectedDay.value)

  if (pickerField.value === 'start') {
    startDate.value = nextValue
  } else {
    endDate.value = nextValue
  }

  dateRange.value = `${startDate.value} - ${endDate.value}`
  syncDraft()
  closeDateModal()
}

function confirmTimeModal() {
  const nextValue = `${String(selectedHour.value).padStart(2, '0')}:${String(selectedMinute.value).padStart(2, '0')}`

  if (timeField.value === 'start') {
    startTime.value = nextValue
  } else {
    endTime.value = nextValue
  }

  syncDraft()
  closeTimeModal()
}

function handleVoiceInput() {
  showToast('后续接语音输入')
}

function handleSave() {
  syncDraft()
  showToast(title.value ? '后续接保存逻辑' : '请先填写待办标题')
}
</script>

<template>
  <view class="create-page">
    <view class="create-topbar">
      <button class="nav-button" @tap="goBack" @click="goBack">
        <text class="material-symbols-outlined nav-icon">arrow_back_ios_new</text>
      </button>

      <view class="segment-wrap">
        <view class="segment-control">
          <button
            v-for="tab in categoryTabs"
            :key="tab.key"
            class="segment-btn"
            :class="{ active: category === tab.key }"
            @tap="selectCategory(tab.key as 'daily' | 'important')"
            @click="selectCategory(tab.key as 'daily' | 'important')"
          >
            {{ tab.label }}
          </button>
        </view>
      </view>

      <view class="nav-spacer"></view>
    </view>

    <view class="create-main">
      <section class="input-card">
        <view class="input-stack">
          <input v-model="title" class="title-input" placeholder="想记下什么？" />
          <view class="divider"></view>
          <view class="note-wrap">
            <textarea v-model="note" class="note-input" placeholder="详细描述（选填）" maxlength="-1" />
            <button class="voice-button" @tap="handleVoiceInput" @click="handleVoiceInput">
              <text class="material-symbols-outlined voice-icon">mic</text>
            </button>
          </view>
        </view>
      </section>

      <section class="schedule-card">
        <text class="material-symbols-outlined schedule-decor">event</text>
        <view class="schedule-head">
          <text class="material-symbols-outlined schedule-icon">schedule</text>
          <text class="schedule-title">时间安排</text>
        </view>

        <view class="schedule-list">
          <view class="schedule-row dual-date-row">
            <button class="date-field" @tap="openDateModal('start')" @click="openDateModal('start')">
              <text class="schedule-label">开始日期</text>
              <view class="date-field-main">
                <text class="schedule-value">{{ startDate }}</text>
                <text class="material-symbols-outlined schedule-trailing small">calendar_today</text>
              </view>
            </button>

            <view class="date-divider"></view>

            <button class="date-field" @tap="openDateModal('end')" @click="openDateModal('end')">
              <text class="schedule-label">结束日期</text>
              <view class="date-field-main">
                <text class="schedule-value">{{ endDate }}</text>
                <text class="material-symbols-outlined schedule-trailing small">calendar_today</text>
              </view>
            </button>
          </view>

          <button class="schedule-row schedule-button-row" @tap="openTimeModal('start')" @click="openTimeModal('start')">
            <view class="schedule-copy">
              <text class="schedule-label">开始时间</text>
              <text class="schedule-value">{{ startTime }}</text>
            </view>
            <text class="material-symbols-outlined schedule-trailing">schedule</text>
          </button>

          <button class="schedule-row schedule-button-row no-border" @tap="openTimeModal('end')" @click="openTimeModal('end')">
            <view class="schedule-copy">
              <text class="schedule-label">结束时间</text>
              <text class="schedule-value">{{ endTime }}</text>
            </view>
            <text class="material-symbols-outlined schedule-trailing">schedule</text>
          </button>
        </view>
      </section>
    </view>

    <view class="save-bar">
      <button class="save-button" @tap="handleSave" @click="handleSave">好的，保存它</button>
    </view>

    <view v-if="isDateModalOpen" class="modal-root">
      <view class="modal-backdrop" @tap="closeDateModal" @click="closeDateModal" @touchmove.stop.prevent @wheel.stop.prevent></view>

      <view class="sheet-container">
        <view class="sheet-panel">
          <view class="sheet-header">
            <view class="sheet-side">
              <button class="sheet-close" @tap="closeDateModal" @click="closeDateModal">
                <text class="material-symbols-outlined close-icon">close</text>
              </button>
            </view>
            <text class="sheet-title">选择日期</text>
            <view class="sheet-side end">
              <button class="sheet-confirm" @tap="confirmDateModal" @click="confirmDateModal">确定</button>
            </view>
          </view>

          <view class="sheet-body">
            <view class="month-nav">
              <button class="month-arrow" @tap="changeMonth(-1)" @click="changeMonth(-1)">
                <text class="material-symbols-outlined month-arrow-icon">chevron_left</text>
              </button>
              <text class="month-nav-title">{{ monthTitle }}</text>
              <button class="month-arrow" @tap="changeMonth(1)" @click="changeMonth(1)">
                <text class="material-symbols-outlined month-arrow-icon">chevron_right</text>
              </button>
            </view>

            <view class="weekday-row">
              <text v-for="label in weekdayLabels" :key="label" class="weekday-item">{{ label }}</text>
            </view>

            <view class="calendar-grid">
              <view v-for="(cell, index) in calendarCells" :key="`${displayYear}-${displayMonth}-${index}`" class="calendar-cell">
                <button
                  v-if="cell.currentMonth"
                  class="calendar-day"
                  :class="{ active: cell.day === selectedDay }"
                  @tap="selectCalendarDay(cell.day)"
                  @click="selectCalendarDay(cell.day)"
                >
                  <text>{{ cell.day }}</text>
                  <text v-if="cell.dot && cell.day !== selectedDay" class="day-dot"></text>
                </button>
                <view v-else class="calendar-day muted"></view>
              </view>
            </view>

            <view class="selected-indicator">
              <text class="selected-label">{{ currentFieldLabel }}</text>
              <text class="selected-value">{{ currentFieldValue }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view v-if="isTimeModalOpen" class="modal-root">
      <view class="modal-backdrop" @tap="closeTimeModal" @click="closeTimeModal" @touchmove.stop.prevent @wheel.stop.prevent></view>

      <view class="sheet-container">
        <view class="sheet-panel">
          <view class="sheet-header">
            <view class="sheet-side">
              <button class="sheet-close" @tap="closeTimeModal" @click="closeTimeModal">
                <text class="material-symbols-outlined close-icon">close</text>
              </button>
            </view>
            <text class="sheet-title">选择时间</text>
            <view class="sheet-side end">
              <button class="sheet-confirm" @tap="confirmTimeModal" @click="confirmTimeModal">确定</button>
            </view>
          </view>

          <view class="sheet-body time-sheet-body">
            <view class="selected-indicator time-selected-indicator">
              <text class="selected-label">{{ currentTimeFieldLabel }}</text>
              <text class="selected-value time-selected-value">{{ currentTimeFieldValue }}</text>
            </view>

            <view class="time-picker-shell">
              <view class="time-wheel-frame">
                <view class="time-wheel-highlight"></view>
                <text class="time-separator">:</text>
              </view>
              <view :key="timeWheelRenderKey" class="time-picker">
                <scroll-view
                  ref="hourWheelRef"
                  class="time-wheel-column"
                  scroll-y
                  :scroll-top="hourScrollTop"
                  :show-scrollbar="false"
                  :scroll-with-animation="true"
                  @scroll="handleWheelScroll('hour', $event)"
                  @touchend="scheduleWheelSnap('hour')"
                  @mouseup="scheduleWheelSnap('hour')"
                >
                  <view class="time-wheel-spacer"></view>
                  <button
                    v-for="(hour, index) in hourOptions"
                    :key="`hour-${hour}`"
                    class="time-picker-item"
                    :class="{ active: selectedHour === index }"
                    @tap="selectWheelValue('hour', index)"
                    @click="selectWheelValue('hour', index)"
                  >
                    {{ hour }}
                  </button>
                  <view class="time-wheel-spacer"></view>
                </scroll-view>

                <scroll-view
                  ref="minuteWheelRef"
                  class="time-wheel-column"
                  scroll-y
                  :scroll-top="minuteScrollTop"
                  :show-scrollbar="false"
                  :scroll-with-animation="true"
                  @scroll="handleWheelScroll('minute', $event)"
                  @touchend="scheduleWheelSnap('minute')"
                  @mouseup="scheduleWheelSnap('minute')"
                >
                  <view class="time-wheel-spacer"></view>
                  <button
                    v-for="(minute, index) in minuteOptions"
                    :key="`minute-${minute}`"
                    class="time-picker-item"
                    :class="{ active: selectedMinute === index }"
                    @tap="selectWheelValue('minute', index)"
                    @click="selectWheelValue('minute', index)"
                  >
                    {{ minute }}
                  </button>
                  <view class="time-wheel-spacer"></view>
                </scroll-view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.create-page {
  min-height: 100vh;
  background: #fef8f8;
  color: #1d1b1b;
  padding-bottom: calc(100px + env(safe-area-inset-bottom));
}

.create-topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  height: calc(env(safe-area-inset-top) + 88px);
  padding: env(safe-area-inset-top) 24px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(254, 248, 248, 0.88);
  backdrop-filter: blur(16px);
}

.nav-button,
.segment-btn,
.voice-button,
.save-button {
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-button {
  width: 40px;
  height: 40px;
  background: transparent;
  color: #665c5e;
}

.nav-icon {
  font-size: 24px;
}

.segment-wrap {
  flex: 1;
  display: flex;
  justify-content: center;
}

.segment-control {
  display: inline-flex;
  padding: 4px;
  border-radius: 9999px;
  background: rgba(236, 231, 230, 0.6);
  border: 1px solid rgba(208, 195, 197, 0.12);
}

.segment-btn {
  min-width: 72px;
  height: 34px;
  border-radius: 9999px;
  background: transparent;
  color: #7f7576;
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
}

.segment-btn.active {
  background: #f5e6e8;
  color: #716668;
  box-shadow: 0 2px 6px rgba(102, 92, 94, 0.08);
}

.nav-spacer {
  width: 40px;
  height: 40px;
}

.create-main {
  padding: 16px 24px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.input-card,
.schedule-card {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  background: #f8f2f2;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.input-card {
  padding: 20px;
}

.input-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.title-input,
.note-input {
  width: 100%;
  border: none;
  background: transparent;
  padding: 0;
  color: #1d1b1b;
}

.title-input {
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
}

.title-input::placeholder,
.note-input::placeholder {
  color: #b9acad;
}

.divider {
  width: 100%;
  height: 1px;
  background: rgba(208, 195, 197, 0.3);
}

.note-wrap {
  position: relative;
}

.note-input {
  min-height: 82px;
  font-size: 15px;
  line-height: 24px;
  padding-right: 48px;
}

.voice-button {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background: rgba(245, 230, 232, 0.4);
  color: #665c5e;
}

.voice-icon {
  font-size: 20px;
}

.schedule-card {
  padding: 20px;
}

.schedule-decor {
  position: absolute;
  right: -8px;
  bottom: -8px;
  color: rgba(102, 92, 94, 0.05);
  font-size: 56px;
}

.schedule-head {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  color: #4d4546;
}

.schedule-icon {
  font-size: 18px;
}

.schedule-title {
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
}

.schedule-list {
  position: relative;
  z-index: 1;
}

.schedule-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid rgba(208, 195, 197, 0.14);
}

.schedule-button-row {
  width: 100%;
  border-left: none;
  border-right: none;
  border-top: none;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
}

.dual-date-row {
  align-items: stretch;
  gap: 16px;
}

.schedule-row.no-border {
  border-bottom: none;
}

.schedule-copy {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.date-field {
  flex: 1;
  border: none;
  background: transparent;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: left;
}

.date-field-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.date-divider {
  width: 1px;
  align-self: flex-end;
  height: 34px;
  margin-bottom: 2px;
  background: rgba(208, 195, 197, 0.3);
}

.schedule-label {
  color: rgba(77, 69, 70, 0.7);
  font-size: 11px;
  line-height: 16px;
  font-weight: 600;
}

.schedule-value {
  color: #1d1b1b;
  font-size: 15px;
  line-height: 24px;
}

.schedule-trailing {
  color: #a89b9d;
  font-size: 18px;
}

.schedule-trailing.small {
  font-size: 18px;
}

.save-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
  padding: 48px 24px calc(24px + env(safe-area-inset-bottom));
  background: linear-gradient(to top, #fef8f8 45%, rgba(254, 248, 248, 0));
}

.save-button {
  width: 100%;
  height: 56px;
  border-radius: 9999px;
  background: #5d5454;
  color: #fff;
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.modal-root {
  position: fixed;
  inset: 0;
  z-index: 70;
  overscroll-behavior: contain;
}

.modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(50, 48, 48, 0.4);
  backdrop-filter: blur(4px);
}

.sheet-container {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
}

.sheet-panel {
  width: 100%;
  max-width: 480px;
  border-radius: 32px 32px 0 0;
  background: #fff;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.04);
  padding-bottom: calc(20px + env(safe-area-inset-bottom));
  touch-action: pan-y;
}

.sheet-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
}

.sheet-side {
  width: 64px;
  display: flex;
  align-items: center;
}

.sheet-side.end {
  justify-content: flex-end;
}

.sheet-close,
.sheet-confirm,
.month-arrow,
.calendar-day {
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sheet-close {
  background: transparent;
  color: #4d4546;
}

.close-icon {
  font-size: 24px;
  font-variation-settings: 'FILL' 0;
}

.sheet-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
}

.sheet-confirm {
  height: 34px;
  padding: 0 16px;
  border-radius: 9999px;
  background: #f5e6e8;
  color: #716668;
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
}

.sheet-body {
  padding: 0 24px;
}

.time-sheet-body {
  padding-bottom: 12px;
}

.month-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0 12px;
}

.month-arrow {
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background: transparent;
  color: #7f7576;
}

.month-arrow-icon {
  font-size: 24px;
  font-variation-settings: 'FILL' 0;
}

.month-nav-title {
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
}

.weekday-row {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 4px;
  margin-bottom: 8px;
}

.weekday-item {
  text-align: center;
  color: #7f7576;
  font-size: 11px;
  line-height: 16px;
  font-weight: 600;
  padding: 8px 0;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 8px 4px;
}

.calendar-cell {
  display: flex;
  justify-content: center;
}

.calendar-day {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 9999px;
  background: transparent;
  color: #1d1b1b;
  font-size: 15px;
  line-height: 24px;
  flex-direction: column;
  gap: 2px;
}

.calendar-day.active {
  background: #665c5e;
  color: #fff;
  transform: scale(1.05);
}

.calendar-day.muted {
  opacity: 0;
}

.day-dot {
  width: 4px;
  height: 4px;
  border-radius: 9999px;
  background: #665c5e;
}

.selected-indicator {
  margin-top: 20px;
  padding: 14px 16px;
  border-radius: 16px;
  background: #f8f2f2;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.selected-label {
  color: #7f7576;
  font-size: 11px;
  line-height: 16px;
  font-weight: 600;
}

.selected-value {
  color: #665c5e;
  font-size: 15px;
  line-height: 24px;
  font-weight: 500;
}

.time-selected-indicator {
  margin-top: 0;
  margin-bottom: 20px;
}

.time-selected-value {
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
}

.time-picker {
  display: flex;
  align-items: stretch;
  height: 280px;
  width: 100%;
}

.time-wheel-column {
  flex: 1;
  min-width: 0;
  height: 280px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.time-wheel-spacer {
  height: 112px;
}

.time-picker-shell {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 8px 8px;
  border-radius: 24px;
  background: #f8f2f2;
  overflow: hidden;
}

.time-wheel-frame {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.time-wheel-highlight {
  position: absolute;
  left: 12px;
  right: 12px;
  top: 50%;
  height: 56px;
  transform: translateY(-50%);
  border-radius: 18px;
  background: rgba(102, 92, 94, 0.1);
  box-shadow: inset 0 0 0 1px rgba(102, 92, 94, 0.08);
}

.time-picker-item {
  width: 100%;
  height: 56px;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4d4546;
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
}

.time-picker-item.active {
  color: #514149;
  font-weight: 600;
}

.time-separator {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #665c5e;
  font-size: 28px;
  line-height: 36px;
  font-weight: 600;
  pointer-events: none;
  z-index: 3;
}
</style>
