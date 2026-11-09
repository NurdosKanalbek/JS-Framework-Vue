<script setup>
import { computed, h, ref } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import {
  AppstoreOutlined,
  BookOutlined,
  CalendarOutlined,
  CheckSquareOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  SearchOutlined,
  UserOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  RocketOutlined,
} from '@ant-design/icons-vue'

const route = useRoute()
const router = useRouter()
const collapsed = ref(false)
const mobileOpen = ref(false)
const selectedKeys = computed(() => [route.path])

const menuItems = [
  { key: '/', icon: () => h(AppstoreOutlined), label: 'Overview' },
  { key: '/courses', icon: () => h(BookOutlined), label: 'My Courses' },
  { key: '/assignments', icon: () => h(CheckSquareOutlined), label: 'Assignments' },
  { key: '/schedule', icon: () => h(CalendarOutlined), label: 'Schedule' },
  { key: '/profile', icon: () => h(UserOutlined), label: 'Profile' },
]

function navigate({ key }) {
  router.push(key)
  mobileOpen.value = false
}
</script>

<template>
  <a-layout class="app-layout">
    <a-layout-sider
      v-model:collapsed="collapsed"
      class="sidebar"
      :width="246"
      :collapsed-width="82"
      breakpoint="lg"
      collapsible
      :trigger="null"
    >
      <div class="sidebar-inner">
        <RouterLink to="/" class="logo">
          <span class="logo-mark"><RocketOutlined /></span>
          <span v-if="!collapsed" class="logo-text">Uni<span>Flow</span></span>
        </RouterLink>

        <p v-if="!collapsed" class="menu-label">Student workspace</p>
        <a-menu theme="dark" mode="inline" :selected-keys="selectedKeys" :items="menuItems" @click="navigate" />

        <div v-if="!collapsed" class="semester-card">
          <div class="semester-card__icon"><BookOutlined /></div>
          <p>Fall semester</p>
          <strong>Week 11 of 16</strong>
          <a-progress :percent="69" :show-info="false" stroke-color="#7f81ff" trail-color="rgba(255,255,255,.12)" size="small" />
        </div>

        <div class="sidebar-bottom">
          <a-button type="text" class="help-button"><QuestionCircleOutlined /><span v-if="!collapsed">Help center</span></a-button>
          <a-button type="text" class="help-button"><LogoutOutlined /><span v-if="!collapsed">Sign out</span></a-button>
        </div>
      </div>
    </a-layout-sider>

    <a-drawer v-model:open="mobileOpen" placement="left" :width="280" :closable="false" class="mobile-drawer">
      <div class="mobile-drawer__brand"><span class="logo-mark"><RocketOutlined /></span><span class="logo-text">Uni<span>Flow</span></span></div>
      <a-menu mode="inline" :selected-keys="selectedKeys" :items="menuItems" @click="navigate" />
    </a-drawer>

    <a-layout>
      <a-layout-header class="topbar">
        <div class="topbar-left">
          <a-button class="collapse-button desktop-collapse" type="text" @click="collapsed = !collapsed">
            <MenuUnfoldOutlined v-if="collapsed" />
            <MenuFoldOutlined v-else />
          </a-button>
          <a-button class="collapse-button mobile-collapse" type="text" @click="mobileOpen = true"><MenuUnfoldOutlined /></a-button>
          <div class="page-heading">
            <h1>{{ route.meta.title }}</h1>
            <p>{{ route.meta.subtitle }}</p>
          </div>
        </div>
        <div class="topbar-actions">
          <a-input class="global-search" placeholder="Search anything…" allow-clear>
            <template #prefix><SearchOutlined /></template>
            <template #suffix><kbd>⌘ K</kbd></template>
          </a-input>
          <a-badge dot :offset="[-5, 5]"><a-button shape="circle" class="topbar-icon"><BellOutlined /></a-button></a-badge>
          <RouterLink to="/profile" class="student-chip">
            <a-avatar src="https://dummyjson.com/icon/emilys/128" :size="38" />
            <span><strong>Emily Johnson</strong><small>Computer Science</small></span>
          </RouterLink>
        </div>
      </a-layout-header>

      <a-layout-content class="content-area">
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
