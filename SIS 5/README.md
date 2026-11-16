# SIS 5 · TaskFlow

A responsive task management application built with Vue 3, Pinia, and Ant Design Vue.

## Features

- Create, edit, complete, reopen, and delete tasks
- Kanban-style columns for To do, In progress, and Completed
- Search, status/priority filters, and sorting
- Task priorities, deadlines, overdue indicators, and progress statistics
- Persistent browser storage through the Pinia store
- Responsive desktop and mobile layouts
- Reusable task composable and focused Vue components

## Tech stack

- Vue 3 Composition API
- Pinia state management
- Ant Design Vue components and icons
- Vite
- Vitest

## Run locally

```powershell
npm install
npm run dev
```

Open the local address printed by Vite.

## Verify

```powershell
npm test
npm run build
```

The production build is generated in `dist/`.

## Project structure

```text
src/
  components/      UI components
  composables/     Shared task behavior and presentation helpers
  stores/          Pinia task store and tests
  styles/          Responsive global styles
  App.vue          Dashboard composition
  main.js          Application bootstrap
```

