<script setup>
import { CheckCircleOutlined, ClockCircleOutlined, UnorderedListOutlined } from '@ant-design/icons-vue'

defineProps({
  total: { type: Number, required: true },
  active: { type: Number, required: true },
  completed: { type: Number, required: true },
  rate: { type: Number, required: true },
})
</script>

<template>
  <section class="stats-grid" aria-label="Task overview">
    <article class="stat-card">
      <div class="stat-icon stat-icon--violet"><UnorderedListOutlined /></div>
      <div><span>All tasks</span><strong>{{ total }}</strong></div>
      <span class="stat-detail">Total</span>
    </article>
    <article class="stat-card">
      <div class="stat-icon stat-icon--amber"><ClockCircleOutlined /></div>
      <div><span>Active</span><strong>{{ active }}</strong></div>
      <span class="stat-detail">In your queue</span>
    </article>
    <article class="stat-card">
      <div class="stat-icon stat-icon--green"><CheckCircleOutlined /></div>
      <div><span>Completed</span><strong>{{ completed }}</strong></div>
      <span class="stat-detail">Nice work!</span>
    </article>
    <article class="stat-card progress-card">
      <div><span>Overall progress</span><strong>{{ rate }}%</strong></div>
      <a-progress :percent="rate" :show-info="false" stroke-color="#7c3aed" trail-color="#ede9fe" />
      <span class="stat-detail">{{ completed }} of {{ total }} tasks done</span>
    </article>
  </section>
</template>
