<script setup>
import { computed, ref } from 'vue'
import { App as AntApp, message } from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import AppHeader from './components/AppHeader.vue'
import StatsOverview from './components/StatsOverview.vue'
import TaskToolbar from './components/TaskToolbar.vue'
import TaskList from './components/TaskList.vue'
import TaskFormModal from './components/TaskFormModal.vue'
import { useTasks } from './composables/useTasks'

const { store, totalTasks, activeTasks, completedTasks, completionRate } = useTasks()
const isModalOpen = ref(false)
const selectedTask = ref(null)

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
})

function openCreateModal() {
  selectedTask.value = null
  isModalOpen.value = true
}

function openEditModal(task) {
  selectedTask.value = task
  isModalOpen.value = true
}

function saveTask(task) {
  if (selectedTask.value) {
    store.updateTask(selectedTask.value.id, task)
    message.success('Task updated')
  } else {
    store.addTask(task)
    message.success('Task created')
  }
  isModalOpen.value = false
}
</script>

<template>
  <AntApp>
    <div class="app-shell">
      <AppHeader @create="openCreateModal" />

      <main class="page-content">
        <section class="welcome-row">
          <div>
            <p class="eyebrow">MY WORKSPACE</p>
            <h1>{{ greeting }}, Alex <span aria-hidden="true">👋</span></h1>
            <p class="welcome-copy">Here’s what’s happening with your tasks today.</p>
          </div>
          <a-button class="desktop-create" type="primary" size="large" @click="openCreateModal">
            <template #icon><PlusOutlined /></template>
            New task
          </a-button>
        </section>

        <StatsOverview
          :total="totalTasks"
          :active="activeTasks"
          :completed="completedTasks"
          :rate="completionRate"
        />

        <section class="task-section">
          <div class="section-heading">
            <div>
              <h2>Your tasks</h2>
              <p>Stay focused and keep your work moving.</p>
            </div>
          </div>
          <TaskToolbar />
          <TaskList @create="openCreateModal" @edit="openEditModal" />
        </section>
      </main>

      <TaskFormModal
        v-model:open="isModalOpen"
        :task="selectedTask"
        @submit="saveTask"
      />
    </div>
  </AntApp>
</template>
