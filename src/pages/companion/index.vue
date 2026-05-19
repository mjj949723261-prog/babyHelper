<script setup lang="ts">
import IntroCard from '../../components/common/IntroCard.vue'
import PageShell from '../../components/common/PageShell.vue'
import { companionContent } from '../../constants/mock-data'
import { bottomTabs } from '../../constants/navigation'
import companionCard from '../../assets/defaults/companion-card.svg'
</script>

<template>
  <PageShell :tabs="bottomTabs" current-path="/pages/companion/index">
    <IntroCard
      :eyebrow="companionContent.intro.eyebrow"
      :title="companionContent.intro.title"
      :desc="companionContent.intro.desc"
    >
      <image class="companion-image" :src="companionCard" mode="widthFix" />
    </IntroCard>

    <view class="suggestion-card soft-card">
      <view class="suggestion-title">{{ companionContent.suggestionsTitle }}</view>
      <view class="suggestion-list">
        <view v-for="item in companionContent.suggestions" :key="item.text" class="suggestion-item">{{ item.text }}</view>
      </view>
    </view>
  </PageShell>
</template>

<style lang="scss" scoped>
.suggestion-card {
  padding: 24px 20px;
  border-radius: 24px;
}

.companion-image {
  width: 100%;
  margin-top: 18px;
  border-radius: 18px;
}

.suggestion-title {
  color: #665c5e;
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
}

.suggestion-list {
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.suggestion-item {
  padding: 14px 16px;
  border-radius: 16px;
  background: rgba(245, 230, 232, 0.72);
  color: #665c5e;
  font-size: 14px;
  line-height: 22px;
}
</style>
