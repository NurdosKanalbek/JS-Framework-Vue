import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  DONE: 'done',
}

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
}

const STORAGE_KEY = 'taskflow-tasks-v1'

const starterTasks = [
  {
    id: 'starter-1',
    title: 'Prepare project presentation',
    description: 'Create the final slides and add a short product demo.',
    status: TASK_STATUS.IN_PROGRESS,
    priority: TASK_PRIORITY.HIGH,
    dueDate: '2026-11-18',
    createdAt: '2026-11-14T09:00:00.000Z',
    completedAt: null,
  },
  {
    id: 'starter-2',
    title: 'Review design system',
    description: 'Check spacing, color tokens, and mobile components.',
    status: TASK_STATUS.TODO,
    priority: TASK_PRIORITY.MEDIUM,
    dueDate: '2026-11-20',
    createdAt: '2026-11-15T11:30:00.000Z',
    completedAt: null,
  },
  {
    id: 'starter-3',
    title: 'Set up team meeting',
    description: 'Share the agenda and confirm the weekly priorities.',
    status: TASK_STATUS.TODO,
    priority: TASK_PRIORITY.LOW,
    dueDate: '2026-11-22',
    createdAt: '2026-11-16T08:15:00.000Z',
    completedAt: null,
  },
  {
    id: 'starter-4',
    title: 'Update project documentation',
    description: 'Document setup steps and the release workflow.',
    status: TASK_STATUS.DONE,
    priority: TASK_PRIORITY.MEDIUM,
    dueDate: '2026-11-16',
    createdAt: '2026-11-12T15:45:00.000Z',
    completedAt: '2026-11-16T10:20:00.000Z',
  },
]

function loadTasks() {
  if (typeof localStorage === 'undefined') return starterTasks

  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : starterTasks
  } catch {
    return starterTasks
  }
}

function createId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `task-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref(loadTasks())
  const searchQuery = ref('')
  const statusFilter = ref('all')
  const priorityFilter = ref('all')
  const sortBy = ref('dueDate')

  const totalTasks = computed(() => tasks.value.length)
  const completedTasks = computed(
    () => tasks.value.filter((task) => task.status === TASK_STATUS.DONE).length,
  )
  const activeTasks = computed(
    () => tasks.value.filter((task) => task.status !== TASK_STATUS.DONE).length,
  )
  const completionRate = computed(() =>
    totalTasks.value ? Math.round((completedTasks.value / totalTasks.value) * 100) : 0,
  )

  const filteredTasks = computed(() => {
    const query = searchQuery.value.trim().toLowerCase()
    const priorityRank = { high: 0, medium: 1, low: 2 }

    return tasks.value
      .filter((task) => {
        const matchesSearch =
          !query ||
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query)
        const matchesStatus = statusFilter.value === 'all' || task.status === statusFilter.value
        const matchesPriority =
          priorityFilter.value === 'all' || task.priority === priorityFilter.value
        return matchesSearch && matchesStatus && matchesPriority
      })
      .slice()
      .sort((a, b) => {
        if (sortBy.value === 'priority') return priorityRank[a.priority] - priorityRank[b.priority]
        if (sortBy.value === 'createdAt') return new Date(b.createdAt) - new Date(a.createdAt)
        return a.dueDate.localeCompare(b.dueDate)
      })
  })

  function addTask(task) {
    tasks.value.unshift({
      ...task,
      id: createId(),
      createdAt: new Date().toISOString(),
      completedAt: task.status === TASK_STATUS.DONE ? new Date().toISOString() : null,
    })
  }

  function updateTask(id, updates) {
    const task = tasks.value.find((item) => item.id === id)
    if (!task) return

    const wasDone = task.status === TASK_STATUS.DONE
    Object.assign(task, updates)
    if (!wasDone && task.status === TASK_STATUS.DONE) task.completedAt = new Date().toISOString()
    if (wasDone && task.status !== TASK_STATUS.DONE) task.completedAt = null
  }

  function removeTask(id) {
    tasks.value = tasks.value.filter((task) => task.id !== id)
  }

  function toggleTask(id) {
    const task = tasks.value.find((item) => item.id === id)
    if (!task) return
    updateTask(id, {
      status: task.status === TASK_STATUS.DONE ? TASK_STATUS.TODO : TASK_STATUS.DONE,
    })
  }

  function clearFilters() {
    searchQuery.value = ''
    statusFilter.value = 'all'
    priorityFilter.value = 'all'
  }

  watch(
    tasks,
    (value) => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
      }
    },
    { deep: true },
  )

  return {
    tasks,
    searchQuery,
    statusFilter,
    priorityFilter,
    sortBy,
    totalTasks,
    completedTasks,
    activeTasks,
    completionRate,
    filteredTasks,
    addTask,
    updateTask,
    removeTask,
    toggleTask,
    clearFilters,
  }
})
