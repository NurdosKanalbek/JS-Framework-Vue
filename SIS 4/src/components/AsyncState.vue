<script setup>
import { CloudServerOutlined, ReloadOutlined } from '@ant-design/icons-vue'

defineProps({
  loading: Boolean,
  error: { type: String, default: '' },
  label: { type: String, default: 'Loading your dashboard…' },
})

defineEmits(['retry'])
</script>

<template>
  <div v-if="loading" class="state-card">
    <a-spin size="large" />
    <p>{{ label }}</p>
    <div class="skeleton-grid">
      <a-skeleton-button v-for="item in 3" :key="item" active block />
    </div>
  </div>
  <a-result v-else-if="error" status="error" title="We couldn't load this page" :sub-title="error" class="state-card state-card--error">
    <template #icon><CloudServerOutlined /></template>
    <template #extra><a-button type="primary" @click="$emit('retry')"><ReloadOutlined /> Try again</a-button></template>
  </a-result>
  <slot v-else />
</template>
