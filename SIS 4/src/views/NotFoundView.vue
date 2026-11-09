<script setup>
import { HomeOutlined } from '@ant-design/icons-vue'
</script>

<template>
  <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist." class="not-found-page">
    <template #extra><RouterLink to="/"><a-button type="primary"><HomeOutlined /> Back to dashboard</a-button></RouterLink></template>
  </a-result>
</template>
