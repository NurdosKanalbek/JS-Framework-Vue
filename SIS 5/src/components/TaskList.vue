<script setup>
import { FileAddOutlined } from '@ant-design/icons-vue'
import { useTasks } from '../composables/useTasks'
import TaskCard from './TaskCard.vue'

defineEmits(['create', 'edit'])
const { filteredTasks, groupedTasks, statusOptions, hasActiveFilters, store } = useTasks()
</script>

<template>
  <div v-if="filteredTasks.length" class="task-board">
    <section v-for="column in statusOptions" :key="column.value" class="board-column">
      <header class="column-header">
        <div><span class="status-dot" :style="{ backgroundColor: column.color }"></span><h3>{{ column.label }}</h3></div>
        <span class="column-count">{{ groupedTasks[column.value].length }}</span>
      </header>
      <div class="column-tasks">
        <TaskCard v-for="task in groupedTasks[column.value]" :key="task.id" :task="task" @edit="$emit('edit', $event)" />
        <div v-if="!groupedTasks[column.value].length" class="column-empty">No tasks here</div>
      </div>
    </section>
  </div>
  <a-empty v-else class="task-empty" :description="false">
    <template #image><FileAddOutlined class="empty-icon" /></template>
    <template #default>
      <h3>{{ hasActiveFilters ? 'No matching tasks' : 'Your task list is empty' }}</h3>
      <p>{{ hasActiveFilters ? 'Try adjusting your filters or search terms.' : 'Create your first task and start making progress.' }}</p>
      <a-button v-if="hasActiveFilters" @click="store.clearFilters">Clear filters</a-button>
      <a-button v-else type="primary" @click="$emit('create')">Create a task</a-button>
    </template>
  </a-empty>
</template>
