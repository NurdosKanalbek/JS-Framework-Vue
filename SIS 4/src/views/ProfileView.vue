<script setup>
import { onMounted, ref } from 'vue'
import { EditOutlined, MailOutlined, PhoneOutlined, SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons-vue'
import { getStudent } from '../services/api'
import AsyncState from '../components/AsyncState.vue'

const student = ref(null)
const loading = ref(true)
const error = ref('')
const editMode = ref(false)
const activeTab = ref('academic')

async function loadStudent() {
  loading.value = true; error.value = ''
  try { student.value = await getStudent() }
  catch (err) { error.value = err.message }
  finally { loading.value = false }
}

onMounted(loadStudent)
</script>

<template>
  <AsyncState :loading="loading" :error="error" label="Loading your profile…" @retry="loadStudent">
    <div v-if="student" class="profile-page">
      <section class="profile-hero">
        <div class="profile-cover"><div class="profile-orb profile-orb--one"/><div class="profile-orb profile-orb--two"/></div>
        <div class="profile-main">
          <a-avatar :src="student.image" :size="104" class="profile-avatar" />
          <div class="profile-identity"><a-tag color="green">Active student</a-tag><h2>{{ student.firstName }} {{ student.lastName }}</h2><p>B.Sc. Computer Science · Class of 2027</p></div>
          <a-button type="primary" @click="editMode = !editMode"><EditOutlined /> {{ editMode ? 'Save profile' : 'Edit profile' }}</a-button>
        </div>
      </section>

      <div class="profile-layout">
        <aside>
          <a-card class="content-card profile-contact" :bordered="false">
            <h3>Contact information</h3>
            <div><span><MailOutlined /></span><p>Email<strong>{{ student.email }}</strong></p></div>
            <div><span><PhoneOutlined /></span><p>Phone<strong>{{ student.phone }}</strong></p></div>
            <div><span><UserOutlined /></span><p>Student ID<strong>UF-2026-{{ String(student.id).padStart(4, '0') }}</strong></p></div>
          </a-card>
          <a-card class="content-card advisor-card" :bordered="false"><span><SafetyCertificateOutlined /></span><div><small>ACADEMIC ADVISOR</small><strong>Dr. Maya Chen</strong><p>maya.chen@uniflow.edu</p></div></a-card>
        </aside>

        <a-card class="content-card profile-details" :bordered="false">
          <a-tabs v-model:activeKey="activeTab">
            <a-tab-pane key="academic" tab="Academic details">
              <div class="detail-grid">
                <label><span>Program</span><a-input :value="'Computer Science'" :disabled="!editMode" /></label>
                <label><span>Faculty</span><a-input :value="student.company?.department || 'Engineering'" :disabled="!editMode" /></label>
                <label><span>Current semester</span><a-input value="Fall 2026 · Semester 5" :disabled="!editMode" /></label>
                <label><span>Expected graduation</span><a-input value="May 2027" :disabled="!editMode" /></label>
              </div>
              <a-divider />
              <h3>Academic standing</h3>
              <div class="standing-grid"><div><span>Current GPA</span><strong>3.78</strong><a-progress :percent="94" :show-info="false" /></div><div><span>Credits completed</span><strong>86 / 120</strong><a-progress :percent="72" :show-info="false" stroke-color="#23a881" /></div><div><span>Attendance</span><strong>96%</strong><a-progress :percent="96" :show-info="false" stroke-color="#f4a340" /></div></div>
            </a-tab-pane>
            <a-tab-pane key="personal" tab="Personal information"><div class="detail-grid"><label><span>First name</span><a-input :value="student.firstName" :disabled="!editMode" /></label><label><span>Last name</span><a-input :value="student.lastName" :disabled="!editMode" /></label><label><span>Email</span><a-input :value="student.email" :disabled="!editMode" /></label><label><span>Phone</span><a-input :value="student.phone" :disabled="!editMode" /></label></div></a-tab-pane>
          </a-tabs>
        </a-card>
      </div>
    </div>
  </AsyncState>
</template>
