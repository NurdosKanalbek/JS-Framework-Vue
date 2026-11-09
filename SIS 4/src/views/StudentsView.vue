<script setup>
import { onMounted, ref } from 'vue'
import StudentList from '../components/StudentList.vue'
import { useStudents } from '../composables/useStudents'

const search = ref('')
const { loading, error, filteredStudents, totalStudents, averageAge, getStudents } = useStudents(search)

onMounted(getStudents)
</script>

<template>
  <div>
    <h1>Students</h1>
    <p class="subtitle">Students from Kazakhstan universities</p>

    <div class="stats">
      <a-card><a-statistic title="Total students" :value="totalStudents" /></a-card>
      <a-card><a-statistic title="Average age" :value="averageAge" /></a-card>
    </div>

    <a-card title="Student list">
      <a-input-search
        v-model:value="search"
        class="search"
        placeholder="Search by name"
        allow-clear
      />

      <div v-if="loading" class="state"><a-spin /> Loading...</div>
      <a-alert v-else-if="error" :message="error" type="error" show-icon>
        <template #action><a-button @click="getStudents">Retry</a-button></template>
      </a-alert>
      <StudentList v-else :students="filteredStudents" />
    </a-card>
  </div>
</template>
