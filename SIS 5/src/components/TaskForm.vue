<script setup>
import { ref } from 'vue'
import { useTasks } from '../composables/useTasks'

const title = ref('')
const { addTask } = useTasks()

function submitTask() {
  if (!title.value.trim()) return
  addTask(title.value)
  title.value = ''
}
</script>

<template>
  <div class="task-form">
    <a-input
      v-model:value="title"
      placeholder="Enter a task"
      @press-enter="submitTask"
    />
    <a-button type="primary" @click="submitTask">Add task</a-button>
  </div>
</template>
