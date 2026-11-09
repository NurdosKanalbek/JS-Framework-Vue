<script setup>
import { computed, onMounted, ref } from 'vue'
import { BookOutlined, ClockCircleOutlined, FileTextOutlined, SearchOutlined, TeamOutlined } from '@ant-design/icons-vue'
import { getAnnouncements } from '../services/api'
import { courses } from '../data/academic'
import AsyncState from '../components/AsyncState.vue'

const search = ref('')
const resources = ref([])
const loading = ref(true)
const error = ref('')
const activeTerm = ref('Fall 2026')

const filteredCourses = computed(() => {
  const term = search.value.toLowerCase().trim()
  return courses.filter((course) => !term || `${course.code} ${course.title} ${course.instructor}`.toLowerCase().includes(term))
})

async function loadResources() {
  loading.value = true
  error.value = ''
  try { resources.value = await getAnnouncements(6) }
  catch (err) { error.value = err.message }
  finally { loading.value = false }
}

onMounted(loadResources)
</script>

<template>
  <AsyncState :loading="loading" :error="error" label="Loading courses and resources…" @retry="loadResources">
    <div class="courses-page">
      <div class="page-toolbar">
        <a-segmented v-model:value="activeTerm" :options="['Fall 2026', 'Spring 2026', 'Archive']" />
        <a-input v-model:value="search" allow-clear placeholder="Search courses…" class="page-search"><template #prefix><SearchOutlined /></template></a-input>
      </div>

      <div class="courses-grid">
        <a-card v-for="(course, index) in filteredCourses" :key="course.id" class="course-card" :bordered="false" hoverable>
          <div class="course-cover" :style="{ background: course.accent }">
            <span class="course-code" :style="{ color: course.color }">{{ course.code }}</span>
            <div class="course-pattern" :style="{ borderColor: course.color }" />
            <a-tag :color="index % 2 ? 'blue' : 'purple'">{{ course.credits }} credits</a-tag>
          </div>
          <div class="course-content">
            <p>{{ course.instructor }}</p><h3>{{ course.title }}</h3>
            <div class="course-meta"><span><ClockCircleOutlined /> Mon & Wed</span><span><TeamOutlined /> {{ 24 + index * 3 }} students</span></div>
            <div class="progress-heading"><span>Course progress</span><strong>{{ course.progress }}%</strong></div>
            <a-progress :percent="course.progress" :show-info="false" :stroke-color="course.color" />
            <div class="course-actions"><a-button><FileTextOutlined /> Resources</a-button><a-button type="primary">Open course</a-button></div>
          </div>
        </a-card>
      </div>

      <a-empty v-if="!filteredCourses.length" description="No courses match your search" />

      <a-card class="resource-card" :bordered="false">
        <template #title><div class="card-title"><div><span>FROM THE API</span><h3>Recent learning resources</h3></div></div></template>
        <a-list :data-source="resources" :grid="{ gutter: 16, xs: 1, sm: 2, lg: 3 }">
          <template #renderItem="{ item, index }"><a-list-item><div class="resource-item"><span :style="{ background: courses[index].accent, color: courses[index].color }"><BookOutlined /></span><div><small>{{ courses[index].code }}</small><strong>{{ item.title }}</strong><p>{{ item.body.slice(0, 70) }}…</p></div></div></a-list-item></template>
        </a-list>
      </a-card>
    </div>
  </AsyncState>
</template>
