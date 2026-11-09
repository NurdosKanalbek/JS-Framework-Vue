<script setup>
import { computed, ref } from 'vue'
import { CalendarOutlined, EnvironmentOutlined, LeftOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons-vue'
import { weekSchedule } from '../data/academic'

const selectedDay = ref('All')
const days = [
  { name: 'Mon', date: 16 }, { name: 'Tue', date: 17 }, { name: 'Wed', date: 18 },
  { name: 'Thu', date: 19 }, { name: 'Fri', date: 20 }, { name: 'Sat', date: 21 }, { name: 'Sun', date: 22 },
]

const visibleEvents = computed(() => selectedDay.value === 'All' ? weekSchedule : weekSchedule.filter((event) => event.day === selectedDay.value))
</script>

<template>
  <div class="schedule-page">
    <a-card class="calendar-header" :bordered="false">
      <div class="calendar-nav"><a-button shape="circle"><LeftOutlined /></a-button><div><span>FALL SEMESTER · WEEK 11</span><h2>November 16–22, 2026</h2></div><a-button shape="circle"><RightOutlined /></a-button></div>
      <a-button type="primary"><PlusOutlined /> Add study session</a-button>
    </a-card>

    <div class="week-picker">
      <button :class="{ active: selectedDay === 'All' }" @click="selectedDay = 'All'"><span>Week</span><strong>All</strong></button>
      <button v-for="day in days" :key="day.name" :class="{ active: selectedDay === day.name, today: day.date === 17 }" @click="selectedDay = day.name"><span>{{ day.name }}</span><strong>{{ day.date }}</strong><i v-if="day.date === 17" /></button>
    </div>

    <div class="schedule-layout">
      <a-card class="content-card schedule-list-card" :bordered="false">
        <template #title><div class="card-title"><div><span>{{ selectedDay === 'All' ? 'FULL WEEK' : selectedDay.toUpperCase() }}</span><h3>{{ visibleEvents.length }} scheduled activities</h3></div></div></template>
        <a-timeline mode="left" class="schedule-timeline">
          <a-timeline-item v-for="event in visibleEvents" :key="event.id" :color="event.color">
            <template #label><div class="schedule-label"><strong>{{ event.day }} {{ event.date }}</strong><span>{{ event.time }}–{{ event.end }}</span></div></template>
            <a-card class="schedule-event" size="small" :style="{ borderLeftColor: event.color }">
              <div><a-tag :color="event.type === 'Lecture' ? 'blue' : event.type === 'Lab' ? 'purple' : 'orange'">{{ event.type }}</a-tag><h3>{{ event.title }}</h3><p><EnvironmentOutlined /> {{ event.room }}</p></div>
              <a-button type="text">Details</a-button>
            </a-card>
          </a-timeline-item>
        </a-timeline>
        <a-empty v-if="!visibleEvents.length" description="No classes scheduled for this day" />
      </a-card>

      <aside class="schedule-sidebar">
        <a-card class="mini-calendar" :bordered="false" title="November 2026"><a-calendar :fullscreen="false" :value="undefined" /></a-card>
        <a-card class="content-card" :bordered="false">
          <template #title><div class="card-title"><div><span>SUMMARY</span><h3>This week</h3></div></div></template>
          <div class="week-summary"><div><span class="summary-dot purple"/><p>Lectures</p><strong>3</strong></div><div><span class="summary-dot coral"/><p>Labs & studios</p><strong>2</strong></div><div><span class="summary-dot green"/><p>Study sessions</p><strong>2</strong></div></div>
        </a-card>
      </aside>
    </div>
  </div>
</template>
