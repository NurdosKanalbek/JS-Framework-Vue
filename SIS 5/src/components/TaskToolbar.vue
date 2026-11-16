<script setup>
import { SearchOutlined, SortAscendingOutlined } from '@ant-design/icons-vue'
import { useTasks } from '../composables/useTasks'

const { store, searchQuery, statusFilter, priorityFilter, sortBy, statusOptions, priorityOptions, hasActiveFilters } = useTasks()
</script>

<template>
  <div class="task-toolbar">
    <a-input v-model:value="searchQuery" class="search-input" size="large" allow-clear placeholder="Search tasks..." aria-label="Search tasks">
      <template #prefix><SearchOutlined /></template>
    </a-input>
    <div class="toolbar-filters">
      <a-select v-model:value="statusFilter" size="large" aria-label="Filter by status">
        <a-select-option value="all">All statuses</a-select-option>
        <a-select-option v-for="option in statusOptions" :key="option.value" :value="option.value">{{ option.label }}</a-select-option>
      </a-select>
      <a-select v-model:value="priorityFilter" size="large" aria-label="Filter by priority">
        <a-select-option value="all">All priorities</a-select-option>
        <a-select-option v-for="option in priorityOptions" :key="option.value" :value="option.value">{{ option.label }}</a-select-option>
      </a-select>
      <a-select v-model:value="sortBy" size="large" aria-label="Sort tasks">
        <template #suffixIcon><SortAscendingOutlined /></template>
        <a-select-option value="dueDate">Due date</a-select-option>
        <a-select-option value="priority">Priority</a-select-option>
        <a-select-option value="createdAt">Recently added</a-select-option>
      </a-select>
      <a-button v-if="hasActiveFilters" class="clear-button" type="link" @click="store.clearFilters">Clear</a-button>
    </div>
  </div>
</template>
