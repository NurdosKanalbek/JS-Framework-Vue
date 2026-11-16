import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import dayjs from 'dayjs'
import { TASK_PRIORITY, TASK_STATUS, useTaskStore } from '../stores/taskStore'

export function useTasks() {
  const store = useTaskStore()
  const state = storeToRefs(store)

  const statusOptions = [
    { label: 'To do', value: TASK_STATUS.TODO, color: '#64748b' },
    { label: 'In progress', value: TASK_STATUS.IN_PROGRESS, color: '#7c3aed' },
    { label: 'Completed', value: TASK_STATUS.DONE, color: '#059669' },
  ]

  const priorityOptions = [
    { label: 'Low', value: TASK_PRIORITY.LOW, color: 'blue' },
    { label: 'Medium', value: TASK_PRIORITY.MEDIUM, color: 'gold' },
    { label: 'High', value: TASK_PRIORITY.HIGH, color: 'red' },
  ]

  const hasActiveFilters = computed(
    () =>
      Boolean(state.searchQuery.value) ||
      state.statusFilter.value !== 'all' ||
      state.priorityFilter.value !== 'all',
  )

  const groupedTasks = computed(() => ({
    [TASK_STATUS.TODO]: state.filteredTasks.value.filter(
      (task) => task.status === TASK_STATUS.TODO,
    ),
    [TASK_STATUS.IN_PROGRESS]: state.filteredTasks.value.filter(
      (task) => task.status === TASK_STATUS.IN_PROGRESS,
    ),
    [TASK_STATUS.DONE]: state.filteredTasks.value.filter(
      (task) => task.status === TASK_STATUS.DONE,
    ),
  }))

  function getStatus(value) {
    return statusOptions.find((option) => option.value === value) ?? statusOptions[0]
  }

  function getPriority(value) {
    return priorityOptions.find((option) => option.value === value) ?? priorityOptions[0]
  }

  function formatDueDate(date) {
    const due = dayjs(date)
    const today = dayjs().startOf('day')
    if (due.isSame(today, 'day')) return 'Today'
    if (due.isSame(today.add(1, 'day'), 'day')) return 'Tomorrow'
    return due.format('MMM D')
  }

  function isOverdue(task) {
    return task.status !== TASK_STATUS.DONE && dayjs(task.dueDate).isBefore(dayjs(), 'day')
  }

  return {
    store,
    ...state,
    statusOptions,
    priorityOptions,
    hasActiveFilters,
    groupedTasks,
    getStatus,
    getPriority,
    formatDueDate,
    isOverdue,
  }
}
