import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [
      { id: 1, title: 'Learn Pinia', completed: false },
      { id: 2, title: 'Create components', completed: true },
    ],
  }),

  actions: {
    addTask(title) {
      this.tasks.push({
        id: Date.now(),
        title,
        completed: false,
      })
    },

    toggleTask(id) {
      const task = this.tasks.find((item) => item.id === id)
      if (task) task.completed = !task.completed
    },

    removeTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id)
    },
  },
})
