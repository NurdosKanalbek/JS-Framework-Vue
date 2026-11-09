<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  ArrowRightOutlined,
  BookOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileDoneOutlined,
  FireOutlined,
  NotificationOutlined,
  TeamOutlined,
} from '@ant-design/icons-vue'
import { getAnnouncements, getAssignments, getClassmates, getStudent } from '../services/api'
import { courses, weekSchedule } from '../data/academic'
import AsyncState from '../components/AsyncState.vue'
import MetricCard from '../components/MetricCard.vue'

const loading = ref(true)
const error = ref('')
const student = ref(null)
const assignments = ref([])
const announcements = ref([])
const classmates = ref([])

const completedCount = computed(() => assignments.value.filter((item) => item.completed).length)
const upcoming = computed(() => assignments.value.filter((item) => !item.completed).slice(0, 4))
const metrics = computed(() => [
  { title: 'Current GPA', value: 3.78, suffix: '/ 4.0', hint: '+0.12', tone: 'purple', icon: FireOutlined },
  { title: 'Courses enrolled', value: courses.length, hint: '18 credits', tone: 'blue', icon: BookOutlined },
  { title: 'Tasks completed', value: completedCount.value, hint: `${assignments.value.length} total`, tone: 'green', icon: FileDoneOutlined },
  { title: 'Study streak', value: 12, suffix: 'days', hint: 'Personal best', tone: 'orange', icon: ClockCircleOutlined },
])

async function loadDashboard() {
  loading.value = true
  error.value = ''
  try {
    const [studentData, assignmentData, announcementData, classmateData] = await Promise.all([
      getStudent(), getAssignments(14), getAnnouncements(5), getClassmates(6),
    ])
    student.value = studentData
    assignments.value = assignmentData
    announcements.value = announcementData
    classmates.value = classmateData
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(loadDashboard)
</script>

<template>
  <AsyncState :loading="loading" :error="error" @retry="loadDashboard">
    <div class="dashboard-page">
      <section class="welcome-card">
        <div class="welcome-copy">
          <a-tag color="purple" :bordered="false">WEEK 11 · FALL 2026</a-tag>
          <h2>Good morning, {{ student?.firstName }}! <span>👋</span></h2>
          <p>You have <strong>{{ upcoming.length }} tasks</strong> to focus on and two classes scheduled today. You’re making great progress.</p>
          <RouterLink to="/assignments"><a-button type="primary" size="large">View today’s plan <ArrowRightOutlined /></a-button></RouterLink>
        </div>
        <div class="focus-visual" aria-hidden="true">
          <div class="focus-ring"><span><strong>78%</strong>semester<br />progress</span></div>
          <div class="focus-dot focus-dot--one" /><div class="focus-dot focus-dot--two" />
        </div>
      </section>

      <section class="metrics-grid">
        <MetricCard v-for="metric in metrics" :key="metric.title" v-bind="metric" />
      </section>

      <section class="dashboard-columns">
        <a-card class="content-card" :bordered="false">
          <template #title><div class="card-title"><div><span>TO DO</span><h3>Upcoming assignments</h3></div><RouterLink to="/assignments">View all <ArrowRightOutlined /></RouterLink></div></template>
          <a-list :data-source="upcoming" class="assignment-list">
            <template #renderItem="{ item, index }">
              <a-list-item>
                <div class="assignment-row">
                  <span class="course-avatar" :style="{ background: courses[index % courses.length].accent, color: courses[index % courses.length].color }">{{ courses[index % courses.length].code.split(' ')[0] }}</span>
                  <div class="assignment-copy"><strong>{{ item.todo }}</strong><span>{{ courses[index % courses.length].title }}</span></div>
                  <div class="due-copy"><span>Due {{ index === 0 ? 'today' : `${index + 1} days` }}</span><a-tag :color="index === 0 ? 'red' : index === 1 ? 'orange' : 'blue'">{{ index === 0 ? 'Urgent' : 'Upcoming' }}</a-tag></div>
                </div>
              </a-list-item>
            </template>
          </a-list>
        </a-card>

        <a-card class="content-card today-card" :bordered="false">
          <template #title><div class="card-title"><div><span>TODAY · NOV 17</span><h3>Class schedule</h3></div><RouterLink to="/schedule">Full week <ArrowRightOutlined /></RouterLink></div></template>
          <div class="timeline-list">
            <div v-for="event in weekSchedule.slice(0, 3)" :key="event.id" class="timeline-event">
              <div class="event-time"><strong>{{ event.time }}</strong><span>{{ event.end }}</span></div>
              <i :style="{ background: event.color }" />
              <div class="event-copy"><strong>{{ event.title }}</strong><span>{{ event.type }} · {{ event.room }}</span></div>
            </div>
          </div>
          <div class="next-class"><ClockCircleOutlined /><span><small>Next class in</small><strong>42 minutes</strong></span></div>
        </a-card>
      </section>

      <section class="dashboard-columns dashboard-columns--bottom">
        <a-card class="content-card" :bordered="false">
          <template #title><div class="card-title"><div><span><NotificationOutlined /> CAMPUS FEED</span><h3>Latest announcements</h3></div></div></template>
          <a-list :data-source="announcements.slice(0, 3)" item-layout="horizontal">
            <template #renderItem="{ item, index }">
              <a-list-item>
                <a-list-item-meta :description="item.body.slice(0, 92) + '…'">
                  <template #title><a>{{ item.title }}</a></template>
                  <template #avatar><a-avatar :style="{ background: ['#eeeefe','#fff0f2','#e9f8f3'][index], color: ['#5b5ce2','#e56b7e','#1ca37e'][index] }"><NotificationOutlined /></a-avatar></template>
                </a-list-item-meta>
                <span class="feed-time">{{ index + 1 }}h ago</span>
              </a-list-item>
            </template>
          </a-list>
        </a-card>

        <a-card class="content-card" :bordered="false">
          <template #title><div class="card-title"><div><span><TeamOutlined /> STUDY CIRCLE</span><h3>Classmates online</h3></div><a-badge :count="classmates.length" color="#23a881" /></div></template>
          <div class="classmates-grid">
            <div v-for="person in classmates" :key="person.id" class="classmate">
              <a-badge dot color="#23a881" :offset="[-5, 36]"><a-avatar :src="person.image" :size="46" /></a-badge>
              <strong>{{ person.firstName }}</strong><span>{{ person.company?.department }}</span>
            </div>
          </div>
        </a-card>
      </section>
    </div>
  </AsyncState>
</template>
