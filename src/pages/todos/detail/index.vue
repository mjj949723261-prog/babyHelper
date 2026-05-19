<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { todoCalendarContent } from '../../../constants/mock-data'
import { getRouteQuery, navigateBack, showToast } from '../../../utils/runtime-nav'

const selectedId = ref('')

onMounted(() => {
  if (selectedId.value) return
  selectedId.value = getRouteQuery().id || ''
})

const currentTodo = computed(() => {
  return todoCalendarContent.items.find((item) => item.id === selectedId.value) ?? todoCalendarContent.items[0]
})

function goBack() {
  navigateBack('/pages/todos/index')
}

function handleDone() {
  showToast('后续接完成逻辑')
}

function handleEdit() {
  showToast('后续接编辑逻辑')
}

function handleDelete() {
  showToast('后续接删除逻辑')
}
</script>

<template>
  <view class="detail-page">
    <view class="detail-topbar">
      <button class="nav-button" @tap="goBack" @click="goBack">
        <text class="material-symbols-outlined nav-icon">arrow_back_ios_new</text>
      </button>
      <text class="detail-title">任务详情</text>
    </view>

    <view class="detail-main">
      <view class="hero-card">
        <view class="hero-decor"></view>
        <view class="hero-head">
          <view class="hero-copy">
            <view class="hero-meta">
              <text class="hero-tag">{{ currentTodo.categoryLabel }}</text>
              <text class="hero-status">{{ currentTodo.checked ? '已完成' : '未完成' }}</text>
            </view>
            <text class="hero-title">{{ currentTodo.time }} {{ currentTodo.title }}</text>
          </view>
          <view class="hero-icon-wrap">
            <text class="material-symbols-outlined hero-icon">{{ currentTodo.icon }}</text>
          </view>
        </view>
        <text class="hero-note">{{ currentTodo.note }}。</text>
      </view>

      <view class="info-stack">
        <view class="info-card">
          <view class="info-icon-wrap">
            <text class="material-symbols-outlined info-icon">schedule</text>
          </view>
          <view class="info-copy">
            <text class="info-label">任务时间</text>
            <text class="info-value">{{ currentTodo.timeRange }}</text>
          </view>
        </view>

        <view class="info-card">
          <view class="info-icon-wrap">
            <text class="material-symbols-outlined info-icon">update</text>
          </view>
          <view class="info-copy">
            <text class="info-label">循环设置</text>
            <text class="info-value">{{ currentTodo.scheduleLabel }}</text>
          </view>
        </view>

        <view class="info-card note-card">
          <view class="info-icon-wrap note-icon-wrap">
            <text class="material-symbols-outlined info-icon">edit_note</text>
          </view>
          <view class="info-copy">
            <text class="info-label">备忘提醒</text>
            <text class="info-value multiline">保持室内昏暗，播放白噪音。可以尝试轻抚后背安抚入睡。</text>
          </view>
        </view>
      </view>

      <view class="reason-card">
        <text class="material-symbols-outlined reason-icon">favorite</text>
        <view class="reason-copy">
          <text class="reason-title">{{ currentTodo.reasonTitle }}</text>
          <text class="reason-text">{{ currentTodo.reasonText }}</text>
        </view>
        <text class="material-symbols-outlined reason-decor">auto_awesome</text>
      </view>
    </view>

    <view class="action-bar">
      <button class="primary-action" @tap="handleDone" @click="handleDone">
        <text class="material-symbols-outlined primary-icon">check_circle</text>
        <text>标记完成</text>
      </button>

      <view class="secondary-actions">
        <button class="secondary-button" @tap="handleEdit" @click="handleEdit">
          <text class="material-symbols-outlined secondary-icon">edit</text>
          <text>修改任务</text>
        </button>
        <view class="secondary-divider"></view>
        <button class="secondary-button danger" @tap="handleDelete" @click="handleDelete">
          <text class="material-symbols-outlined secondary-icon">delete</text>
          <text>删除任务</text>
        </button>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.detail-page {
  min-height: 100vh;
  padding: calc(env(safe-area-inset-top) + 8px) 24px calc(148px + env(safe-area-inset-bottom));
  background: #fef8f8;
  color: #1d1b1b;
}

.detail-topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  margin: 0 -24px;
  padding: 0 24px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(254, 248, 248, 0.84);
  backdrop-filter: blur(14px);
}

.nav-button,
.primary-action,
.secondary-button {
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-button {
  width: 48px;
  height: 48px;
  margin-left: -8px;
  background: transparent;
  color: #4d4546;
}

.nav-icon {
  font-size: 22px;
}

.detail-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #665c5e;
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
}

.detail-main {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-top: 16px;
}

.hero-card,
.info-card,
.reason-card {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.hero-card {
  padding: 20px;
  background: #f8f2f2;
}

.hero-decor {
  position: absolute;
  top: -32px;
  right: -32px;
  width: 128px;
  height: 128px;
  border-radius: 9999px;
  background: rgba(245, 230, 232, 0.64);
  filter: blur(20px);
}

.hero-head {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.hero-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.hero-tag {
  padding: 4px 12px;
  border-radius: 9999px;
  background: #fff3e0;
  color: #e65100;
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
}

.hero-status {
  color: #4d4546;
  font-size: 13px;
  line-height: 18px;
}

.hero-title {
  color: #1d1b1b;
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
}

.hero-icon-wrap,
.info-icon-wrap {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
}

.hero-icon-wrap {
  width: 48px;
  height: 48px;
  background: #f5e6e8;
  color: #716668;
}

.hero-icon {
  font-size: 24px;
  font-variation-settings: 'FILL' 1;
}

.hero-note {
  position: relative;
  z-index: 1;
  margin-top: 12px;
  color: #4d4546;
  font-size: 15px;
  line-height: 24px;
}

.info-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #fff;
}

.note-card {
  align-items: flex-start;
}

.info-icon-wrap {
  width: 40px;
  height: 40px;
  background: #f2edec;
  color: #665c5e;
}

.note-icon-wrap {
  margin-top: 2px;
}

.info-icon {
  font-size: 20px;
}

.info-copy {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.info-label {
  margin-bottom: 2px;
  color: #7f7576;
  font-size: 11px;
  line-height: 16px;
  font-weight: 600;
}

.info-value {
  color: #1d1b1b;
  font-size: 15px;
  line-height: 24px;
}

.info-value.multiline {
  color: #1d1b1b;
  line-height: 24px;
}

.reason-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  background: rgba(245, 230, 232, 0.4);
  border: 1px solid rgba(209, 195, 197, 0.3);
}

.reason-icon {
  position: relative;
  z-index: 1;
  margin-top: 2px;
  color: #665c5e;
  font-size: 28px;
  font-variation-settings: 'FILL' 1;
}

.reason-copy {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.reason-title {
  color: #716668;
  font-size: 13px;
  line-height: 18px;
  font-weight: 600;
}

.reason-text {
  color: #4d4546;
  font-size: 14px;
  line-height: 22px;
}

.reason-decor {
  position: absolute;
  right: -18px;
  bottom: -14px;
  color: rgba(102, 92, 94, 0.08);
  font-size: 120px;
  transform: rotate(-15deg);
}

.action-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 24px calc(16px + env(safe-area-inset-bottom));
  background: rgba(254, 248, 248, 0.92);
  backdrop-filter: blur(16px);
  border-top: 1px solid rgba(230, 225, 225, 0.8);
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.02);
}

.primary-action {
  width: 100%;
  height: 56px;
  border-radius: 9999px;
  background: #665c5e;
  color: #fff;
  gap: 8px;
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
}

.primary-icon {
  font-size: 22px;
}

.secondary-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
}

.secondary-button {
  height: 48px;
  background: transparent;
  color: #4d4546;
  gap: 4px;
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
}

.secondary-button.danger {
  color: #ba1a1a;
}

.secondary-icon {
  font-size: 18px;
}

.secondary-divider {
  width: 1px;
  height: 16px;
  background: rgba(208, 195, 197, 0.5);
}
</style>
