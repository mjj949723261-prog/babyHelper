<script setup lang="ts">
import { computed, ref } from 'vue'
import { todoCalendarContent } from '../../constants/mock-data'
import { navigateBack, navigateTo, showToast } from '../../utils/runtime-nav'

const selectedDay = ref(todoCalendarContent.days.find((day) => day.active)?.date || todoCalendarContent.days[0]?.date || '')
const selectedFilter = ref(todoCalendarContent.filters.find((filter) => filter.active)?.key || 'all')

const filteredItems = computed(() => {
  if (selectedFilter.value === 'all') {
    return todoCalendarContent.items
  }

  return todoCalendarContent.items.filter((todo) => todo.category === selectedFilter.value)
})

function goBack() {
  navigateBack('/pages/home/index')
}

function openTodoDetail(id: string) {
  navigateTo(`/pages/todos/detail/index?id=${id}`, '打开任务详情失败')
}

function handleMore() {
  showToast('后续接编辑菜单')
}

function handleAdd() {
  navigateTo('/pages/todos/create/index', '打开新增待办失败')
}

function handleCalendarAction() {
  showToast('后续接月历面板')
}

function selectDay(date: string) {
  selectedDay.value = date
}

function selectFilter(key: string) {
  selectedFilter.value = key
}
</script>

<template>
  <view class="schedule-page">
    <view class="schedule-shell">
      <view class="topbar">
        <button class="back-button" @tap="goBack" @click="goBack">
          <text class="material-symbols-outlined topbar-icon">arrow_back_ios_new</text>
        </button>
        <view class="topbar-title">计划日程</view>
        <view class="capsule-space"></view>
      </view>

      <view class="calendar-section">
        <view class="calendar-head">
          <view class="month-switch">
            <text class="month-label">{{ todoCalendarContent.monthLabel }}</text>
            <text class="material-symbols-outlined month-icon">expand_more</text>
          </view>
          <button class="calendar-button" @tap="handleCalendarAction" @click="handleCalendarAction">
            <text class="material-symbols-outlined button-icon">calendar_month</text>
          </button>
        </view>

        <view class="calendar-card">
          <view
            v-for="day in todoCalendarContent.days"
            :key="`${day.label}-${day.date}`"
            class="day-cell"
            @tap="selectDay(day.date)"
            @click="selectDay(day.date)"
          >
            <text class="day-label" :class="{ active: selectedDay === day.date }">{{ day.label }}</text>
            <view class="day-number" :class="{ active: selectedDay === day.date }">{{ day.date }}</view>
          </view>
        </view>
      </view>

      <view class="filter-row">
        <button
          v-for="filter in todoCalendarContent.filters"
          :key="filter.key"
          class="filter-pill"
          :class="{ active: selectedFilter === filter.key }"
          @tap="selectFilter(filter.key)"
          @click="selectFilter(filter.key)"
        >
          {{ filter.label }}
        </button>
      </view>

      <view class="todo-stack">
        <view
          v-for="todo in filteredItems"
          :key="todo.id"
          class="schedule-card"
          :class="{
            special: todo.category === 'special' && !todo.checked,
            done: todo.checked
          }"
          @tap="openTodoDetail(todo.id)"
          @click="openTodoDetail(todo.id)"
        >
          <view v-if="todo.category === 'special' && !todo.checked" class="special-bar"></view>

          <view class="schedule-check" :class="{ checked: todo.checked }">
            <text v-if="todo.checked" class="material-symbols-outlined check-icon">check</text>
          </view>

          <view class="schedule-copy">
            <view v-if="todo.categoryLabel && !todo.checked" class="card-top">
              <view class="todo-type" :class="todo.category">
                <text v-if="todo.category === 'special'" class="material-symbols-outlined type-icon">star</text>
                <text>{{ todo.categoryLabel }}</text>
              </view>
            </view>

            <view class="title-row">
              <text class="todo-time">{{ todo.time }}</text>
              <text class="todo-title">{{ todo.title }}</text>
            </view>

            <text class="todo-note">{{ todo.note }}</text>
          </view>

          <button class="more-button" @tap.stop="handleMore" @click.stop="handleMore">
            <text class="material-symbols-outlined more-icon">more_horiz</text>
          </button>
        </view>
      </view>
    </view>

    <button class="fab-button" @tap="handleAdd" @click="handleAdd">
      <text class="material-symbols-outlined fab-icon">add</text>
    </button>
  </view>
</template>

<style lang="scss" scoped>
.schedule-page {
  min-height: 100vh;
  padding: calc(env(safe-area-inset-top) + 8px) 24px calc(100px + env(safe-area-inset-bottom));
  background: #fef8f8;
  color: #1d1b1b;
}

.schedule-shell {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  margin: 0 -24px;
  padding: 0 24px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(254, 248, 248, 0.92);
  backdrop-filter: blur(14px);
}

.back-button,
.calendar-button,
.more-button,
.fab-button {
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-button {
  width: 48px;
  height: 48px;
  margin-left: -8px;
  background: transparent;
  color: #665c5e;
}

.topbar-icon {
  font-size: 22px;
}

.topbar-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #665c5e;
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
}

.capsule-space {
  width: 95px;
  height: 32px;
}

.calendar-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.calendar-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px;
}

.month-switch {
  display: flex;
  align-items: center;
  gap: 2px;
}

.month-label {
  font-size: 17px;
  line-height: 26px;
  font-weight: 500;
}

.month-icon,
.button-icon,
.more-icon {
  font-size: 18px;
}

.month-icon {
  color: #7f7576;
}

.calendar-button {
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  background: #f2edec;
  color: #665c5e;
}

.calendar-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 16px 14px;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.day-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 36px;
}

.day-label {
  color: #d0c3c5;
  font-size: 11px;
  line-height: 16px;
  font-weight: 600;
}

.day-label.active {
  color: #665c5e;
}

.day-number {
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4d4546;
  font-size: 15px;
  line-height: 24px;
}

.day-number.active {
  background: #f5e6e8;
  color: #716668;
  font-weight: 600;
  box-shadow: 0 0 0 4px rgba(245, 230, 232, 0.3);
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 2px;
}

.filter-pill {
  flex-shrink: 0;
  height: 32px;
  padding: 0 16px;
  border: none;
  border-radius: 9999px;
  background: #ece7e6;
  color: #4d4546;
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
}

.filter-pill.active {
  background: #665c5e;
  color: #fff;
}

.todo-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.schedule-card {
  position: relative;
  width: 100%;
  border: none;
  padding: 20px;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: flex-start;
  gap: 16px;
  text-align: left;
}

.schedule-card.special {
  background: rgba(245, 230, 232, 0.2);
  border: 1px solid rgba(245, 230, 232, 0.7);
}

.schedule-card.done {
  background: rgba(255, 255, 255, 0.5);
  opacity: 0.72;
}

.special-bar {
  position: absolute;
  left: 0;
  top: 50%;
  width: 4px;
  height: 48px;
  border-radius: 0 9999px 9999px 0;
  transform: translateY(-50%);
  background: #665c5e;
}

.schedule-check {
  width: 24px;
  height: 24px;
  margin-top: 2px;
  border-radius: 9999px;
  border: 2px solid #d0c3c5;
  background: #fff;
  flex-shrink: 0;
}

.schedule-check.checked {
  background: #665c5e;
  border-color: #665c5e;
}

.check-icon {
  color: #fff;
  font-size: 16px;
}

.schedule-copy {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.card-top {
  margin-bottom: 2px;
}

.todo-type {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 10px;
  line-height: 14px;
  font-weight: 600;
}

.todo-type.special {
  background: #f5e6e8;
  color: #665c5e;
}

.todo-type.daily {
  background: #e6ebe5;
  color: #656a65;
}

.type-icon {
  font-size: 12px;
  font-variation-settings: 'FILL' 1;
}

.title-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.todo-time {
  color: #1d1b1b;
  font-size: 15px;
  line-height: 24px;
  font-weight: 600;
}

.todo-title {
  color: #1d1b1b;
  font-size: 17px;
  line-height: 26px;
}

.todo-note {
  color: #4d4546;
  font-size: 13px;
  line-height: 18px;
}

.schedule-card.done .todo-time,
.schedule-card.done .todo-title {
  color: #7f7576;
  text-decoration: line-through;
}

.schedule-card.done .todo-note {
  color: #b1a8a9;
}

.more-button {
  width: 32px;
  height: 32px;
  margin-right: -8px;
  background: transparent;
  color: #7f7576;
  flex-shrink: 0;
}

.fab-button {
  position: fixed;
  right: 24px;
  bottom: calc(24px + env(safe-area-inset-bottom));
  width: 56px;
  height: 56px;
  border-radius: 9999px;
  background: #f5e6e8;
  color: #716668;
  box-shadow: 0 8px 24px rgba(102, 92, 94, 0.15);
}

.fab-icon {
  font-size: 28px;
}
</style>
