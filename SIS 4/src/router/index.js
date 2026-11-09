import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      component: () => import('../components/AppLayout.vue'),
      children: [
        { path: '', name: 'dashboard', component: () => import('../views/DashboardView.vue'), meta: { title: 'Overview', subtitle: 'Your academic day at a glance' } },
        { path: 'courses', name: 'courses', component: () => import('../views/CoursesView.vue'), meta: { title: 'My Courses', subtitle: 'Learning progress and course resources' } },
        { path: 'assignments', name: 'assignments', component: () => import('../views/AssignmentsView.vue'), meta: { title: 'Assignments', subtitle: 'Track, filter and complete your coursework' } },
        { path: 'schedule', name: 'schedule', component: () => import('../views/ScheduleView.vue'), meta: { title: 'Schedule', subtitle: 'Plan lectures, labs and study sessions' } },
        { path: 'profile', name: 'profile', component: () => import('../views/ProfileView.vue'), meta: { title: 'Student Profile', subtitle: 'Personal and academic information' } },
        { path: ':pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue'), meta: { title: 'Page not found', subtitle: 'The requested page does not exist' } },
      ],
    },
  ],
})

router.afterEach((to) => {
  document.title = `${to.meta.title || 'Dashboard'} — UniFlow`
})

export default router
