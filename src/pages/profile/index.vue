<script setup lang="ts">
import IntroCard from '../../components/common/IntroCard.vue'
import PageShell from '../../components/common/PageShell.vue'
import { profileContent } from '../../constants/mock-data'
import { bottomTabs } from '../../constants/navigation'
import companionCard from '../../assets/defaults/companion-card.svg'
import profilePanel from '../../assets/defaults/profile-panel.svg'
</script>

<template>
  <PageShell :tabs="bottomTabs" current-path="/pages/profile/index">
    <IntroCard :eyebrow="profileContent.intro.eyebrow" :title="profileContent.intro.title" :desc="profileContent.intro.desc">
      <image class="profile-image" :src="profilePanel" mode="widthFix" />
    </IntroCard>

    <view class="profile-module soft-card">
      <view class="module-head">
        <view class="module-title">{{ profileContent.module.title }}</view>
        <view class="module-tag">{{ profileContent.module.tag }}</view>
      </view>
      <view class="module-desc">{{ profileContent.module.desc }}</view>
      <image class="module-image" :src="companionCard" mode="widthFix" />
    </view>
  </PageShell>
</template>

<style lang="scss" scoped>
.profile-module {
  padding: 24px 20px;
  border-radius: 24px;
}

.profile-image {
  width: 100%;
  margin-top: 20px;
  border-radius: 20px;
}

.module-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.module-title {
  color: #665c5e;
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
}

.module-tag {
  padding: 4px 10px;
  border-radius: 9999px;
  background: #f5e6e8;
  color: #716668;
  font-size: 11px;
  line-height: 16px;
  font-weight: 600;
}

.module-desc {
  margin-top: 10px;
  color: #7f7576;
  font-size: 14px;
  line-height: 22px;
}

.module-image {
  width: 100%;
  margin-top: 16px;
  border-radius: 18px;
}
</style>
