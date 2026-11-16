<script setup>
import { BellOutlined, CheckOutlined, PlusOutlined } from '@ant-design/icons-vue'

defineEmits(['create'])
</script>

<template>
  <header class="app-header">
    <div class="header-inner">
      <a class="brand" href="#" aria-label="TaskFlow home">
        <span class="brand-mark"><CheckOutlined /></span>
        <span>Task<span>Flow</span></span>
      </a>
      <div class="header-actions">
        <a-badge dot color="#7c3aed">
          <a-button class="icon-button" type="text" aria-label="Notifications">
            <template #icon><BellOutlined /></template>
          </a-button>
        </a-badge>
        <div class="profile-chip">
          <a-avatar class="profile-avatar">AK</a-avatar>
          <div class="profile-copy"><strong>Alex Kim</strong><span>Product team</span></div>
        </div>
        <a-button class="mobile-create" type="primary" shape="circle" @click="$emit('create')">
          <template #icon><PlusOutlined /></template>
        </a-button>
      </div>
    </div>
  </header>
</template>
