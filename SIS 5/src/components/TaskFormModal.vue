<script setup>
import { computed, reactive, ref, watch } from 'vue'
import dayjs from 'dayjs'
import { useTasks } from '../composables/useTasks'

const props = defineProps({ task: { type: Object, default: null } })
const emit = defineEmits(['submit'])
const open = defineModel('open', { type: Boolean, default: false })
const formRef = ref()
const { statusOptions, priorityOptions } = useTasks()
const defaultForm = () => ({ title: '', description: '', status: 'todo', priority: 'medium', dueDate: dayjs().add(1, 'day') })
const form = reactive(defaultForm())
const isEditing = computed(() => Boolean(props.task))
const rules = {
  title: [
    { required: true, message: 'Please enter a task title', trigger: 'blur' },
    { min: 3, message: 'Title should be at least 3 characters', trigger: 'blur' },
  ],
  dueDate: [{ required: true, message: 'Please choose a due date', trigger: 'change' }],
}

watch(() => open.value, (isOpen) => {
  if (!isOpen) return
  Object.assign(form, props.task ? { ...props.task, dueDate: dayjs(props.task.dueDate) } : defaultForm())
  formRef.value?.clearValidate()
})

async function handleSubmit() {
  await formRef.value.validate()
  emit('submit', { title: form.title.trim(), description: form.description.trim(), status: form.status, priority: form.priority, dueDate: form.dueDate.format('YYYY-MM-DD') })
}
</script>

<template>
  <a-modal v-model:open="open" :title="isEditing ? 'Edit task' : 'Create a new task'" :ok-text="isEditing ? 'Save changes' : 'Create task'" cancel-text="Cancel" centered :width="560" @ok="handleSubmit">
    <p class="modal-intro">{{ isEditing ? 'Update the details for this task.' : 'Add the details and keep your work on track.' }}</p>
    <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
      <a-form-item label="Task title" name="title"><a-input v-model:value="form.title" size="large" maxlength="80" show-count placeholder="e.g. Prepare monthly report" /></a-form-item>
      <a-form-item label="Description" name="description"><a-textarea v-model:value="form.description" :rows="3" maxlength="240" show-count placeholder="Add a few helpful details..." /></a-form-item>
      <div class="form-grid">
        <a-form-item label="Status" name="status"><a-select v-model:value="form.status" size="large"><a-select-option v-for="option in statusOptions" :key="option.value" :value="option.value">{{ option.label }}</a-select-option></a-select></a-form-item>
        <a-form-item label="Priority" name="priority"><a-select v-model:value="form.priority" size="large"><a-select-option v-for="option in priorityOptions" :key="option.value" :value="option.value">{{ option.label }}</a-select-option></a-select></a-form-item>
      </div>
      <a-form-item label="Due date" name="dueDate"><a-date-picker v-model:value="form.dueDate" size="large" format="MMMM D, YYYY" class="full-width" /></a-form-item>
    </a-form>
  </a-modal>
</template>
