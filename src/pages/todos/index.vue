<script setup lang="ts">
import IntroCard from '../../components/common/IntroCard.vue'
import { homeContent, todoDetailContent } from '../../constants/mock-data'

function goBack() {
  uni.navigateBack()
}
</script>

<template>
  <view class="todos-page">
    <view class="todos-shell">
      <view class="topbar">
        <button class="back-button" @tap="goBack">
          <text class="material-symbols-outlined">arrow_back</text>
        </button>
        <view class="topbar-title">待办详情</view>
        <view class="topbar-space"></view>
      </view>

      <IntroCard
        :eyebrow="todoDetailContent.intro.eyebrow"
        :title="todoDetailContent.intro.title"
        :desc="todoDetailContent.intro.desc"
      />

      <view class="todo-detail-card soft-card">
        <view class="todo-detail-head">
          <view class="todo-detail-helper">{{ todoDetailContent.helper }}</view>
          <button class="todo-add">{{ todoDetailContent.ctaLabel }}</button>
        </view>

        <view class="todo-detail-list">
          <view v-for="todo in homeContent.todos" :key="todo.id" class="todo-detail-row" :class="{ done: todo.checked }">
            <view class="detail-check" :class="{ checked: todo.checked }"></view>
            <view class="detail-copy">
              <view class="detail-title">{{ todo.title }}</view>
              <view v-if="todo.note" class="detail-note">{{ todo.note }}</view>
            </view>
            <view v-if="todo.tag" class="detail-tag">{{ todo.tag }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.todos-page {
  min-height: 100vh;
  padding: 24px 24px 32px;
  background: #fff7f6;
}

.todos-shell {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
}

.back-button {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 9999px;
  background: #f5e6e8;
  color: #665c5e;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.topbar-title {
  color: #665c5e;
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
}

.topbar-space {
  width: 36px;
  height: 36px;
}

.todo-detail-card {
  padding: 22px 20px;
  border-radius: 24px;
}

.todo-detail-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.todo-detail-helper {
  color: #7f7576;
  font-size: 13px;
  line-height: 20px;
}

.todo-add {
  height: 32px;
  padding: 0 14px;
  border: none;
  border-radius: 9999px;
  background: #f5e6e8;
  color: #665c5e;
  font-size: 12px;
  line-height: 18px;
  font-weight: 600;
  flex-shrink: 0;
}

.todo-detail-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.todo-detail-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(208, 195, 197, 0.35);
}

.todo-detail-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.detail-check {
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 1px solid #d0c3c5;
  background: #fff;
  flex-shrink: 0;
}

.detail-check.checked {
  background: #665c5e;
  border-color: #665c5e;
  position: relative;
}

.detail-check.checked::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 2px;
  width: 6px;
  height: 10px;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(45deg);
}

.detail-copy {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-title {
  color: #1d1b1b;
  font-size: 15px;
  line-height: 22px;
  font-weight: 500;
}

.detail-note {
  color: #9f8f95;
  font-size: 12px;
  line-height: 18px;
}

.detail-tag {
  padding: 4px 8px;
  border-radius: 9999px;
  background: #f8f2f2;
  color: #7f7576;
  font-size: 10px;
  line-height: 14px;
  font-weight: 600;
}

.todo-detail-row.done .detail-title,
.todo-detail-row.done .detail-note {
  opacity: 0.5;
}

.todo-detail-row.done .detail-title {
  text-decoration: line-through;
}
</style>
