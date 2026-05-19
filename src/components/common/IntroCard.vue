<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  desc: string
}>()
</script>

<template>
  <view class="intro-card soft-card">
    <view class="intro-eyebrow">{{ eyebrow }}</view>
    <view class="intro-title">{{ title }}</view>
    <view class="intro-desc">{{ desc }}</view>
    <slot />
  </view>
</template>

<style lang="scss" scoped>
.intro-card {
  padding: 24px 20px;
  border-radius: 24px;
}

.intro-eyebrow {
  color: rgba(102, 92, 94, 0.55);
  font-size: 11px;
  line-height: 16px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.intro-title {
  margin-top: 6px;
  color: #514149;
  font-size: 28px;
  line-height: 34px;
  font-weight: 700;
}

.intro-desc {
  margin-top: 12px;
  color: #7f7576;
  font-size: 15px;
  line-height: 24px;
}
</style>
