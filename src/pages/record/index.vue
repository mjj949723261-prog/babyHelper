<script setup lang="ts">
import { ref } from 'vue'
import HomeBottomBar from '../../components/home/HomeBottomBar.vue'
import HomeTopNav from '../../components/home/HomeTopNav.vue'
import { useNavMetrics } from '../../composables/useNavMetrics'
import { bottomTabs } from '../../constants/navigation'
import topAvatarPlaceholder from '../../assets/defaults/home-avatar.svg'

type RecordType = 'feeding' | 'sleep' | 'diaper' | 'temperature' | 'medicine' | 'other'

interface RecordCardItem {
  key: RecordType
  label: string
  icon: string
  hint: string
  large?: boolean
}

const activeType = ref<RecordType>('feeding')

const recordTypes: RecordCardItem[] = [
  { key: 'feeding', label: '喂奶', icon: 'content_paste', hint: '母乳 / 配方 / 辅食' },
  { key: 'sleep', label: '睡眠', icon: 'bedtime', hint: '小睡 / 夜醒 / 入睡' },
  { key: 'diaper', label: '尿布', icon: 'baby_changing_station', hint: '尿湿 / 便便 / 清理' },
  { key: 'temperature', label: '体温', icon: 'thermostat', hint: '晨起 / 发热 / 观察' },
  { key: 'medicine', label: '用药记录', icon: 'medication', hint: '喂药时间与剂量', large: true },
  { key: 'other', label: '其他', icon: 'more_horiz', hint: '补充临时事项与备注', large: true }
]

const navMetrics = useNavMetrics()

function selectType(type: RecordType) {
  activeType.value = type
}
</script>

<template>
  <view class="record-page">
    <HomeTopNav day-title="Day 45" :avatar-url="topAvatarPlaceholder" :nav-metrics="navMetrics" />

    <view class="record-main">
      <view class="record-grid">
        <button
          v-for="item in recordTypes"
          :key="item.key"
          class="record-card"
          :class="{
            active: activeType === item.key,
            large: item.large
          }"
          @tap="selectType(item.key)"
          @click="selectType(item.key)"
        >
          <view class="record-card-glow"></view>
          <view class="record-card-check" :class="{ active: activeType === item.key }">
            <text class="material-symbols-outlined record-card-check-icon">check</text>
          </view>
          <text class="material-symbols-outlined record-icon" :class="{ fill: activeType === item.key }">{{ item.icon }}</text>
          <view class="record-copy">
            <text class="record-label">{{ item.label }}</text>
            <text class="record-hint">{{ item.hint }}</text>
          </view>
        </button>
      </view>
    </view>

    <view class="record-orb orb-right"></view>
    <view class="record-orb orb-left"></view>

    <HomeBottomBar :tabs="bottomTabs" current-path="/pages/record/index" />
  </view>
</template>

<style lang="scss" scoped>
.record-page {
  position: relative;
  min-height: 100vh;
  background: #fef8f8;
  padding-bottom: calc(132px + env(safe-area-inset-bottom));
  padding-left: 24px;
  padding-right: 24px;
}

.record-main {
  position: relative;
  z-index: 1;
  top: calc(v-bind('navMetrics.statusBarHeight') * 1px + 48px);
}

.section-title {
  color: #514149;
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  letter-spacing: 0;
}

.record-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 16px;
}

.record-card {
  position: relative;
  min-height: 132px;
  border: none;
  border-radius: 24px;
  background: #f8f2f2;
  color: #1d1b1b;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  text-align: center;
}

.record-card.large {
  grid-column: 1 / -1;
  min-height: 88px;
  flex-direction: row;
  justify-content: flex-start;
  gap: 16px;
  padding-inline: 22px;
  text-align: left;
}

.record-card.active {
  background: #f5e6e8;
  color: #716668;
  box-shadow: 0 10px 24px rgba(102, 92, 94, 0.12);
}

.record-card-glow {
  position: absolute;
  inset: auto -26px -42px auto;
  width: 96px;
  height: 96px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.35);
  filter: blur(12px);
}

.record-card-check {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(127, 117, 118, 0.08);
  color: transparent;
}

.record-card-check.active {
  background: rgba(113, 102, 104, 0.18);
  color: #665c5e;
}

.record-card-check-icon {
  font-size: 16px;
  line-height: 1;
}

.record-icon {
  position: relative;
  z-index: 1;
  font-size: 36px;
  line-height: 1;
  color: currentColor;
}

.record-icon.fill {
  font-variation-settings: 'FILL' 1;
}

.record-label {
  position: relative;
  z-index: 1;
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
}

.record-copy {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.record-hint {
  color: rgba(77, 69, 70, 0.72);
  font-size: 11px;
  line-height: 16px;
  font-weight: 600;
}

.record-orb {
  position: fixed;
  z-index: 0;
  border-radius: 9999px;
  filter: blur(56px);
  pointer-events: none;
}

.orb-right {
  top: 20%;
  right: -18%;
  width: 256px;
  height: 256px;
  background: rgba(245, 230, 232, 0.24);
}

.orb-left {
  left: -12%;
  bottom: 18%;
  width: 192px;
  height: 192px;
  background: rgba(230, 235, 229, 0.3);
}
</style>
