<script setup lang="ts">
import HomePage from './pages/home/index.vue'
</script>

<template>
  <HomePage />
</template>

<style lang="scss">
page {
  background: #fff7f6;
  color: #4b4046;
  font-family: "Plus Jakarta Sans", "PingFang SC", "Helvetica Neue", Arial, sans-serif;
}

view,
text {
  box-sizing: border-box;
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.soft-card {
  background: rgba(255, 255, 255, 0.94);
  border-radius: 32rpx;
  box-shadow: 0 16rpx 40rpx rgba(233, 150, 173, 0.12);
}
</style>
