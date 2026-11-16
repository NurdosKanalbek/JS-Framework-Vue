<script setup>
import { CalendarOutlined, CheckOutlined, DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons-vue'
import { useTasks } from '../composables/useTasks'

defineProps({ task: { type: Object, required: true } })
defineEmits(['edit'])
const { store, statusOptions, getPriority, formatDueDate, isOverdue } = useTasks()
</script>

<template>
  <article class="task-card" :class="{ 'task-card--done': task.status === 'done' }">
    <div class="task-card-top">
      <button class="task-check" :class="{ 'task-check--active': task.status === 'done' }" :aria-label="task.status === 'done' ? 'Mark task active' : 'Mark task complete'" @click="store.toggleTask(task.id)">
        <CheckOutlined v-if="task.status === 'done'" />
      </button>
      <a-dropdown placement="bottomRight" :trigger="['click']">
        <a-button class="more-button" type="text" aria-label="Task actions"><template #icon><MoreOutlined /></template></a-button>
        <template #overlay>
          <a-menu>
            <a-menu-item key="edit" @click="$emit('edit', task)"><EditOutlined /> Edit task</a-menu-item>
            <a-sub-menu key="status" title="Move to">
              <a-menu-item v-for="option in statusOptions" :key="option.value" :disabled="task.status === option.value" @click="store.updateTask(task.id, { status: option.value })">{{ option.label }}</a-menu-item>
            </a-sub-menu>
            <a-menu-divider />
            <a-popconfirm title="Delete this task?" ok-text="Delete" cancel-text="Cancel" @confirm="store.removeTask(task.id)">
              <a-menu-item key="delete" danger><DeleteOutlined /> Delete</a-menu-item>
            </a-popconfirm>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <div class="task-card-body"><h3>{{ task.title }}</h3><p>{{ task.description || 'No description added.' }}</p></div>
    <div class="task-card-footer">
      <a-tag :color="getPriority(task.priority).color" :bordered="false">{{ getPriority(task.priority).label }}</a-tag>
      <span class="due-date" :class="{ 'due-date--overdue': isOverdue(task) }"><CalendarOutlined />{{ isOverdue(task) ? 'Overdue · ' : '' }}{{ formatDueDate(task.dueDate) }}</span>
    </div>
  </article>
</template>
