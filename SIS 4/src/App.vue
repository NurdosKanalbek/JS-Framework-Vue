<script setup>
import { RouterView } from 'vue-router'

const theme = {
  token: {
    colorPrimary: '#5b5ce2',
    colorInfo: '#5b5ce2',
    colorSuccess: '#23a881',
    colorWarning: '#f4a340',
    colorError: '#e45f72',
    colorText: '#20233c',
    colorTextSecondary: '#73778f',
    colorBgLayout: '#f5f6fa',
    borderRadius: 12,
    borderRadiusLG: 18,
    fontFamily: "Inter, 'Segoe UI', sans-serif",
  },
  components: {
    Card: { paddingLG: 22 },
    Button: { controlHeight: 40 },
    Table: { headerBg: '#f7f8fc', headerColor: '#73778f' },
    Menu: { darkItemBg: '#171a2f', darkSubMenuItemBg: '#171a2f' },
  },
}
</script>

<template>
  <a-config-provider :theme="theme">
    <RouterView />
  </a-config-provider>
</template>
