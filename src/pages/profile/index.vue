<script setup lang="ts">
import { computed } from 'vue'
import HomeBottomBar from '../../components/home/HomeBottomBar.vue'
import HomeTopNav from '../../components/home/HomeTopNav.vue'
import { bottomTabs } from '../../constants/navigation'
import { showToast } from '../../utils/runtime-nav'
import { useNavMetrics } from '../../composables/useNavMetrics'
import homeAvatar from '../../assets/defaults/home-avatar.svg'

type ProfileMenuItem = {
  title: string
  icon: string
  tone: 'primary' | 'secondary' | 'tertiary'
}

const familyMembers = [
  { id: 'mom', name: '妈妈', short: '妈', tone: 'rose' },
  { id: 'dad', name: '爸爸', short: '爸', tone: 'sand' },
  { id: 'grandma', name: '奶奶', short: '奶', tone: 'sage' }
]

const profileGroups: ProfileMenuItem[][] = [
  [
    { title: '宝宝档案', icon: 'child_care', tone: 'secondary' },
    { title: '成员管理', icon: 'manage_accounts', tone: 'tertiary' }
  ],
  [
    { title: '提醒设置', icon: 'notifications_active', tone: 'primary' },
    { title: '周报记录', icon: 'calendar_month', tone: 'secondary' },
    { title: '基础设置', icon: 'settings', tone: 'tertiary' }
  ]
]

const navMetrics = useNavMetrics()

const contentStyle = computed(() => ({
  paddingTop: `${navMetrics.statusBarHeight + navMetrics.navBarHeight + 18}px`,
  paddingBottom: `calc(132px + env(safe-area-inset-bottom))`
}))

function handlePlaceholder(label: string) {
  showToast(`${label}后续接入`)
}
</script>

<template>
  <view class="profile-page">
    <HomeTopNav day-title="Day 45" :avatar-url="homeAvatar" :nav-metrics="navMetrics" />

    <scroll-view class="profile-scroll" scroll-y>
      <view class="profile-main" :style="contentStyle">
        <view class="hero-card">
          <view class="hero-head">
            <view class="hero-copy">
              <text class="hero-title">糯米宝贝</text>
              <text class="hero-subtitle">男宝宝 · 1个月14天</text>
            </view>

            <button class="member-pill" @tap="handlePlaceholder('家庭成员')" @click="handlePlaceholder('家庭成员')">
              <text class="material-symbols-outlined member-pill-icon">groups</text>
              <text class="member-pill-label">3 位家庭成员</text>
            </button>
          </view>

          <view class="family-row">
            <view class="family-stack">
              <view
                v-for="member in familyMembers"
                :key="member.id"
                class="family-avatar"
                :class="`tone-${member.tone}`"
              >
                {{ member.short }}
              </view>
            </view>

            <button class="family-add" @tap="handlePlaceholder('新增成员')" @click="handlePlaceholder('新增成员')">
              <text class="material-symbols-outlined family-add-icon">add</text>
            </button>
          </view>
        </view>

        <view
          v-for="(group, groupIndex) in profileGroups"
          :key="`group-${groupIndex}`"
          class="menu-group"
        >
          <button
            v-for="item in group"
            :key="item.title"
            class="menu-item"
            @tap="handlePlaceholder(item.title)"
            @click="handlePlaceholder(item.title)"
          >
            <view class="menu-item-main">
              <view class="menu-icon-wrap" :class="item.tone">
                <text class="material-symbols-outlined menu-icon">{{ item.icon }}</text>
              </view>
              <text class="menu-title">{{ item.title }}</text>
            </view>

            <text class="material-symbols-outlined menu-arrow">chevron_right</text>
          </button>
        </view>

        <view class="quote-block">
          <text class="material-symbols-outlined quote-icon filled">favorite</text>
          <text class="quote-copy">“陪伴是给宝宝最好的礼物，哪怕是在这安静的、慢节奏的时光里。”</text>
        </view>
      </view>
    </scroll-view>

    <HomeBottomBar :tabs="bottomTabs" current-path="/pages/profile/index" />
  </view>
</template>

<style lang="scss" scoped>
.profile-page {
  min-height: 100vh;
  background: #fef8f8;
  color: #1d1b1b;
}

.capsule-divider {
  width: 1px;
  height: 16px;
  background: rgba(0, 0, 0, 0.1);
}

.capsule-icon {
  color: #1d1b1b;
  font-size: 18px;
  line-height: 1;
}

.capsule-icon.filled,
.quote-icon.filled {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.profile-scroll {
  height: 100vh;
}

.profile-main {
  max-width: 480px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hero-card,
.menu-group {
  border-radius: 26px;
  background: #f5e6e8;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.hero-card {
  padding: 18px 18px 16px;
}

.hero-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hero-title {
  color: #514149;
  font-size: 21px;
  line-height: 28px;
  font-weight: 600;
}

.hero-subtitle {
  color: #6f6466;
  font-size: 14px;
  line-height: 21px;
}

.member-pill,
.family-add,
.menu-item {
  border: none;
  padding: 0;
}

.member-pill {
  min-height: 34px;
  padding: 0 14px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.58);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.member-pill-icon {
  color: #665c5e;
  font-size: 18px;
}

.member-pill-label {
  color: #665c5e;
  font-size: 12px;
  line-height: 18px;
  font-weight: 500;
}

.family-row {
  margin-top: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.family-stack {
  display: flex;
  align-items: center;
}

.family-avatar {
  width: 32px;
  height: 32px;
  margin-left: -8px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #f5e6e8;
  color: #5b4d4f;
  font-size: 12px;
  line-height: 16px;
  font-weight: 700;
}

.family-avatar:first-child {
  margin-left: 0;
}

.family-avatar.tone-rose {
  background: linear-gradient(135deg, #fff0f2, #f3cfd6);
}

.family-avatar.tone-sand {
  background: linear-gradient(135deg, #fdf2e5, #ead0b5);
}

.family-avatar.tone-sage {
  background: linear-gradient(135deg, #edf4ed, #d5e1d4);
}

.family-add {
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.family-add-icon {
  color: #7f7576;
  font-size: 16px;
}

.menu-group {
  padding: 8px;
  background: #f8f2f2;
}

.menu-item {
  width: 100%;
  min-height: 74px;
  padding: 0 16px;
  border-radius: 18px;
  background: #fffdfd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.72);
}

.menu-item + .menu-item {
  margin-top: 8px;
}

.menu-item-main {
  display: flex;
  align-items: center;
  gap: 14px;
}

.menu-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-icon-wrap.primary {
  background: #f5e6e8;
  color: #665c5e;
}

.menu-icon-wrap.secondary {
  background: #ebe1d7;
  color: #645d56;
}

.menu-icon-wrap.tertiary {
  background: #e6ebe5;
  color: #5a605b;
}

.menu-icon {
  font-size: 20px;
}

.menu-title {
  color: #1d1b1b;
  font-size: 16px;
  line-height: 24px;
}

.menu-arrow {
  color: #c3b6b8;
  font-size: 20px;
}

.quote-block {
  padding: 30px 18px 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  opacity: 0.68;
}

.quote-icon {
  color: #7f7576;
  font-size: 28px;
}

.quote-copy {
  margin-top: 10px;
  max-width: 240px;
  color: #7f7576;
  font-size: 14px;
  line-height: 24px;
  font-style: italic;
}
</style>
