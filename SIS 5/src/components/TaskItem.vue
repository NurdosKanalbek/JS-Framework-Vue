<script setup>
import { useTasks } from '../composables/useTasks'

defineProps({
  task: {
    type: Object,
    required: true,
  },
})

const { toggleTask, removeTask } = useTasks()
</script>

<template>
  <a-list-item>
    <a-checkbox :checked="task.completed" @change="toggleTask(task.id)">
      <span :class="{ completed: task.completed }">{{ task.title }}</span>
    </a-checkbox>

    <template #actions>
      <a-button danger size="small" @click="removeTask(task.id)">Delete</a-button>
    </template>
  </a-list-item>
</template>
