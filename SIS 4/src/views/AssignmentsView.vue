<script setup>
import { computed, onMounted, ref } from 'vue'
import { CheckCircleOutlined, ClockCircleOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { getAssignments, updateAssignment } from '../services/api'
import { courses } from '../data/academic'
import AsyncState from '../components/AsyncState.vue'

const assignments = ref([])
const loading = ref(true)
const error = ref('')
const filter = ref('All')
const search = ref('')
const updatingId = ref(null)

const filteredAssignments = computed(() => assignments.value.filter((item) => {
  const matchesStatus = filter.value === 'All' || (filter.value === 'Completed' ? item.completed : !item.completed)
  return matchesStatus && item.todo.toLowerCase().includes(search.value.toLowerCase())
}))

const completion = computed(() => assignments.value.length ? Math.round(assignments.value.filter((item) => item.completed).length / assignments.value.length * 100) : 0)

async function loadAssignments() {
  loading.value = true; error.value = ''
  try { assignments.value = await getAssignments(24) }
  catch (err) { error.value = err.message }
  finally { loading.value = false }
}

async function toggleAssignment(record) {
  updatingId.value = record.id
  try {
    const updated = await updateAssignment(record.id, !record.completed)
    record.completed = updated.completed
    message.success(record.completed ? 'Assignment marked as complete' : 'Assignment returned to your list')
  } catch (err) { message.error(err.message) }
  finally { updatingId.value = null }
}

const columns = [
  { title: 'Assignment', key: 'assignment', width: '42%' },
  { title: 'Course', key: 'course' },
  { title: 'Due date', key: 'due' },
  { title: 'Status', key: 'status' },
  { title: '', key: 'action', align: 'right' },
]

onMounted(loadAssignments)
</script>

<template>
  <AsyncState :loading="loading" :error="error" label="Fetching assignments…" @retry="loadAssignments">
    <div class="assignments-page">
      <a-card class="assignment-summary" :bordered="false">
        <div><span class="summary-icon"><CheckCircleOutlined /></span><div><p>Overall completion</p><strong>{{ completion }}%</strong><span>{{ assignments.filter((item) => item.completed).length }} of {{ assignments.length }} tasks finished</span></div></div>
        <a-progress type="circle" :percent="completion" :size="92" stroke-color="#5b5ce2" />
      </a-card>

      <a-card class="content-card assignment-table-card" :bordered="false">
        <div class="assignment-toolbar">
          <a-segmented v-model:value="filter" :options="['All', 'Pending', 'Completed']" />
          <a-input v-model:value="search" placeholder="Search assignments…" allow-clear class="page-search"><template #prefix><SearchOutlined /></template></a-input>
          <a-button @click="loadAssignments"><ReloadOutlined /> Refresh</a-button>
        </div>
        <a-table :columns="columns" :data-source="filteredAssignments" :row-key="(record) => record.id" :pagination="{ pageSize: 8, showSizeChanger: false }" :scroll="{ x: 850 }">
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'assignment'"><div class="table-assignment"><a-checkbox :checked="record.completed" :disabled="updatingId === record.id" @change="toggleAssignment(record)" /><div><strong :class="{ completed: record.completed }">{{ record.todo }}</strong><span>Updated {{ index + 1 }}h ago</span></div></div></template>
            <template v-else-if="column.key === 'course'"><a-tag :color="['purple','blue','green','orange'][index % 4]">{{ courses[index % courses.length].code }}</a-tag></template>
            <template v-else-if="column.key === 'due'"><span class="due-date"><ClockCircleOutlined /> {{ index < 2 ? 'Today' : `Nov ${18 + index}` }}</span></template>
            <template v-else-if="column.key === 'status'"><a-badge :status="record.completed ? 'success' : index < 2 ? 'error' : 'processing'" :text="record.completed ? 'Completed' : index < 2 ? 'Urgent' : 'In progress'" /></template>
            <template v-else-if="column.key === 'action'"><a-button type="link" :loading="updatingId === record.id" @click="toggleAssignment(record)">{{ record.completed ? 'Reopen' : 'Complete' }}</a-button></template>
          </template>
          <template #emptyText><a-empty description="No assignments found" /></template>
        </a-table>
      </a-card>
    </div>
  </AsyncState>
</template>
