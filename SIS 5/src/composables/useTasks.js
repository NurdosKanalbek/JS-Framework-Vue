import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '../stores/taskStore'

export function useTasks() {
  const store = useTaskStore()
  const { tasks } = storeToRefs(store)
  const completedCount = computed(() => tasks.value.filter((task) => task.completed).length)

  return {
    tasks,
    completedCount,
    addTask: store.addTask,
    toggleTask: store.toggleTask,
    removeTask: store.removeTask,
  }
}
