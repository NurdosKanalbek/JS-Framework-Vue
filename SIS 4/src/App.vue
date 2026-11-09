<template>
  <a-layout class="layout">
    <a-layout-header class="header">
      <h2>Student Portal</h2>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/students">Students</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </a-layout-header>

    <a-layout-content class="content">
      <RouterView />
    </a-layout-content>
  </a-layout>
</template>
