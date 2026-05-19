<script setup lang="ts">
import IntroCard from '../../components/common/IntroCard.vue'
import PageShell from '../../components/common/PageShell.vue'
import { recordContent } from '../../constants/mock-data'
import { bottomTabs } from '../../constants/navigation'
import companionCard from '../../assets/defaults/companion-card.svg'
</script>

<template>
  <PageShell :tabs="bottomTabs" current-path="/pages/record/index">
    <IntroCard :eyebrow="recordContent.intro.eyebrow" :title="recordContent.intro.title" :desc="recordContent.intro.desc">
      <view class="record-grid">
        <view v-for="option in recordContent.options" :key="option.label" class="record-chip">{{ option.label }}</view>
      </view>
    </IntroCard>

    <view class="record-module soft-card">
      <view class="module-head">
        <view class="module-title">{{ recordContent.module.title }}</view>
        <view class="module-tag">{{ recordContent.module.tag }}</view>
      </view>
      <view class="module-desc">{{ recordContent.module.desc }}</view>
      <image class="module-image" :src="companionCard" mode="widthFix" />
    </view>
  </PageShell>
</template>

<style lang="scss" scoped>
.record-module {
  padding: 24px 20px;
  border-radius: 24px;
}

.record-grid {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.record-chip {
  padding: 14px 16px;
  border-radius: 16px;
  background: #f5e6e8;
  color: #665c5e;
  font-size: 15px;
  line-height: 22px;
  font-weight: 600;
  text-align: center;
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
  margin-top: 12px;
  color: #7f7576;
  font-size: 15px;
  line-height: 24px;
}

.module-image {
  width: 100%;
  margin-top: 16px;
  border-radius: 18px;
}
</style>
