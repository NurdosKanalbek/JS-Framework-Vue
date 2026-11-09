<script setup>
defineProps({
  title: String,
  value: [String, Number],
  suffix: { type: String, default: '' },
  hint: String,
  tone: { type: String, default: 'purple' },
  icon: Object,
})
</script>

<template>
  <a-card class="metric-card" :bordered="false">
    <div class="metric-card__top">
      <span class="metric-icon" :class="`metric-icon--${tone}`"><component :is="icon" /></span>
      <a-tag color="green">{{ hint }}</a-tag>
    </div>
    <a-statistic :title="title" :value="value" :suffix="suffix" />
  </a-card>
</template>
