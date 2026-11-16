<script setup>
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'
import { useTasks } from './composables/useTasks'

const { tasks, completedCount } = useTasks()
</script>

<template>
  <div class="container">
    <h1>Task Manager</h1>
    <p class="info">Total: {{ tasks.length }} | Completed: {{ completedCount }}</p>

    <a-card>
      <TaskForm />
      <TaskList />
    </a-card>
  </div>
</template>
