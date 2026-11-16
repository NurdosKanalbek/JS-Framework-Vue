import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { TASK_STATUS, useTaskStore } from './taskStore'

describe('task store', () => {
  beforeEach(() => { localStorage.clear(); setActivePinia(createPinia()) })

  it('creates, updates, completes, and removes a task', () => {
    const store = useTaskStore(); store.tasks = []
    store.addTask({ title: 'Write tests', description: 'Cover the Pinia actions', status: TASK_STATUS.TODO, priority: 'high', dueDate: '2026-11-20' })
    expect(store.totalTasks).toBe(1); expect(store.activeTasks).toBe(1)
    const id = store.tasks[0].id
    store.toggleTask(id)
    expect(store.tasks[0].status).toBe(TASK_STATUS.DONE); expect(store.completedTasks).toBe(1); expect(store.completionRate).toBe(100)
    store.updateTask(id, { title: 'Tests complete' }); expect(store.tasks[0].title).toBe('Tests complete')
    store.removeTask(id); expect(store.tasks).toHaveLength(0)
  })

  it('filters tasks by search, status, and priority', () => {
    const store = useTaskStore()
    store.tasks = [
      { id: '1', title: 'Design dashboard', description: 'Create UI', status: 'in-progress', priority: 'high', dueDate: '2026-11-18', createdAt: '2026-11-17T08:00:00.000Z' },
      { id: '2', title: 'Write notes', description: 'Document work', status: 'todo', priority: 'low', dueDate: '2026-11-22', createdAt: '2026-11-17T09:00:00.000Z' },
    ]
    store.searchQuery = 'dashboard'; store.statusFilter = 'in-progress'; store.priorityFilter = 'high'
    expect(store.filteredTasks.map((task) => task.id)).toEqual(['1'])
    store.clearFilters(); expect(store.filteredTasks).toHaveLength(2)
  })
})
