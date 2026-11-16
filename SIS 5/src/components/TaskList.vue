<script setup>
import TaskItem from './TaskItem.vue'
import { useTasks } from '../composables/useTasks'

const { tasks } = useTasks()
</script>

<template>
  <a-empty v-if="tasks.length === 0" description="No tasks" />

  <a-list v-else :data-source="tasks" bordered>
    <template #renderItem="{ item }">
      <TaskItem :task="item" />
    </template>
  </a-list>
</template>
