<template>
  <div>
    <h1>Welcome to Student Portal</h1>
    <p class="subtitle">Simple multi-page application made with Vue 3.</p>

    <div class="home-cards">
      <a-card title="Students">
        View a list of students from universities in Kazakhstan.
      </a-card>
      <a-card title="Technologies">
        Vue Router, Axios and Ant Design Vue are used in this project.
      </a-card>
    </div>

    <RouterLink to="/students">
      <a-button type="primary">Open student list</a-button>
    </RouterLink>
  </div>
</template>
