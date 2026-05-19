<script setup lang="ts">
import type { QuickAction } from '../../types/home'

defineProps<{
  actions: QuickAction[]
}>()
</script>

<template>
  <view class="action-row">
    <view v-for="action in actions" :key="action.title" class="action-item">
      <button class="action-circle" :class="action.tone">
        <text class="material-symbols-outlined action-icon">{{ action.icon }}</text>
      </button>
      <view class="action-title">{{ action.title }}</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.action-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.action-item {
  text-align: center;
}

.action-circle {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 9999px;
  border: none;
  padding: 0;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.45);
}

.action-circle:active {
  transform: scale(0.95);
}

.action-circle.primary {
  background: #f5e6e8;
}

.action-circle.tertiary {
  background: #e6ebe5;
}

.action-circle.secondary {
  background: #ebe1d7;
}

.action-circle.primary-fixed {
  background: #eedfe1;
}

.action-icon {
  font-size: 28px;
  line-height: 1;
  color: #665c5e;
}

.action-title {
  margin-top: 8px;
  color: #4d4546;
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
  letter-spacing: 0.01em;
}
</style>
