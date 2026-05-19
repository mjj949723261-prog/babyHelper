<script setup lang="ts">
import { computed } from 'vue'
import type { ActivityItem, TodoItem } from '../../types/home'
import { navigateTo, showToast } from '../../utils/runtime-nav'

const props = defineProps<{
  title: string
  addIcon: string
  todos: TodoItem[]
  todoMoreLabel: string
  todoHelper: string
  recentTitle: string
  recentMoreLabel: string
  activities: ActivityItem[]
  weeklySummaryTitle: string
  weeklySummaryIcon: string
}>()

const pendingTodos = computed(() => props.todos.filter((todo) => !todo.checked))
const visibleTodos = computed(() => pendingTodos.value.slice(0, 3))
const shouldShowTodoMore = computed(() => pendingTodos.value.length > visibleTodos.value.length)

function openTodoPage() {
  navigateTo('/pages/todos/index', '打开计划页失败')
}

function openTodoCreatePage() {
  navigateTo('/pages/todos/create/index', '打开新增页失败')
}

function openTodoDetail(id: string) {
  if (!id) {
    showToast('任务信息缺失')
    return
  }

  navigateTo(`/pages/todos/detail/index?id=${id}`, '打开详情失败')
}

function openTimelinePage() {
  navigateTo('/pages/timeline/index', '打开时间线失败')
}

function openWeeklySummary() {
  showToast('后续接成长报告详情')
}
</script>

<template>
  <section class="todo-section">
    <view class="section-head">
      <view class="todo-head-copy">
        <h3 class="section-title">{{ title }}</h3>
      </view>
      <view class="add-button" hover-class="is-hover" @tap="openTodoCreatePage" @click="openTodoCreatePage">
        <text class="material-symbols-outlined add-icon">{{ addIcon }}</text>
      </view>
    </view>
    <view class="todo-card">
      <view class="todo-list">
        <view
          v-for="todo in visibleTodos"
          :key="todo.id"
          class="todo-row"
          @tap="openTodoDetail(todo.id)"
          @click="openTodoDetail(todo.id)"
        >
          <view
            v-if="todo.categoryLabel || todo.tag"
            class="todo-icon-wrap"
            :class="todo.category === 'special' ? 'primary' : 'secondary'"
          >
            <text class="todo-tag">{{ todo.categoryLabel || todo.tag }}</text>
          </view>
          <view class="todo-copy">
            <view class="todo-top">
              <text class="todo-label">{{ todo.title }}</text>
              <text v-if="todo.time" class="todo-time">{{ todo.time }}</text>
            </view>
            <text v-if="todo.note" class="todo-note">{{ todo.note }}</text>
          </view>
        </view>
      </view>
      <view
        v-if="shouldShowTodoMore"
        class="todo-footer-link"
        hover-class="is-hover"
        @tap="openTodoPage"
        @click="openTodoPage"
      >
        <text>{{ todoMoreLabel }}</text>
        <text class="material-symbols-outlined todo-footer-icon">chevron_right</text>
      </view>
    </view>
  </section>

  <section class="recent-section">
    <view class="recent-head">
      <h3 class="section-title">{{ recentTitle }}</h3>
      <text class="recent-more" @tap="openTimelinePage" @click="openTimelinePage">{{ recentMoreLabel }}</text>
    </view>
    <view class="activity-list">
      <view v-for="activity in activities" :key="activity.title" class="activity-card">
        <view class="activity-icon-wrap" :class="activity.tone">
          <text class="material-symbols-outlined activity-icon">{{ activity.icon }}</text>
        </view>
        <view class="activity-copy">
          <view class="activity-top">
            <text class="activity-title">{{ activity.title }}</text>
            <text class="activity-time">{{ activity.time }}</text>
          </view>
          <text class="activity-detail">{{ activity.detail }}</text>
        </view>
      </view>
    </view>
  </section>

  <section class="summary-section">
    <view class="summary-card" @tap="openWeeklySummary" @click="openWeeklySummary">
      <view class="summary-left">
        <text class="material-symbols-outlined summary-icon">{{ weeklySummaryIcon }}</text>
        <text class="summary-title">{{ weeklySummaryTitle }}</text>
      </view>
      <text class="material-symbols-outlined summary-arrow">chevron_right</text>
    </view>
  </section>
</template>

<style lang="scss" scoped>

.summary-section {
  margin-top: 22px;
}

.section-head,
.recent-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 4px;
}

.recent-more,
.summary-card {
  cursor: pointer;
}

.todo-head-copy {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.section-title {
  color: #665c5e;
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
}

.add-button {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 9999px;
  background: #f5e6e8;
  color: #716668;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.add-button:active {
  transform: scale(0.95);
}

.add-icon {
  font-size: 20px;
}

.todo-card {
  border-radius: 24px;
  border: 1px solid rgba(245, 230, 232, 0.6);
  padding: 18px 20px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 14px 32px rgba(173, 138, 142, 0.08);
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.todo-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(245, 230, 232, 0.54);
}

.todo-icon-wrap {
  min-width: 40px;
  height: 40px;
  padding: 0 10px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.todo-icon-wrap.primary {
  background: #f5e6e8;
}

.todo-icon-wrap.secondary {
  background: #ebe1d7;
}

.todo-label {
  color: #1d1b1b;
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
}

.todo-copy {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.todo-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.todo-time {
  flex-shrink: 0;
  color: #665c5e;
  font-size: 12px;
  line-height: 18px;
  font-weight: 600;
}

.todo-note {
  color: #4d4546;
  font-size: 11px;
  line-height: 16px;
}

.todo-tag {
  color: #7f7576;
  font-size: 10px;
  line-height: 14px;
  font-weight: 600;
  white-space: nowrap;
}

.todo-footer-link {
  margin-top: 16px;
  height: 38px;
  width: 100%;
  border: none;
  border-radius: 16px;
  background: #fbf5f4;
  color: #665c5e;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 12px;
  line-height: 18px;
  font-weight: 600;
}

.todo-footer-icon {
  font-size: 16px;
}

.recent-more {
  color: #7f7576;
  font-size: 11px;
  line-height: 16px;
  font-weight: 600;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.activity-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(245, 230, 232, 0.54);
}

.activity-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.activity-icon-wrap.primary {
  background: #f5e6e8;
  color: #665c5e;
}

.activity-icon-wrap.tertiary {
  background: #e6ebe5;
  color: #5a605b;
}

.activity-icon {
  font-size: 20px;
}

.activity-copy {
  flex: 1;
}

.activity-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.activity-title {
  color: #1d1b1b;
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
}

.activity-time {
  color: #7f7576;
  font-size: 11px;
  line-height: 16px;
  font-weight: 600;
}

.activity-detail {
  display: block;
  margin-top: 2px;
  color: #4d4546;
  font-size: 11px;
  line-height: 16px;
}

.summary-card {
  border-radius: 16px;
  padding: 12px 16px;
  background: rgba(102, 92, 94, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(102, 92, 94, 0.08);
}

.summary-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.summary-icon {
  color: rgba(102, 92, 94, 0.6);
  font-size: 24px;
}

.summary-title {
  color: #665c5e;
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
}

.summary-arrow {
  color: rgba(102, 92, 94, 0.4);
  font-size: 20px;
}
</style>
