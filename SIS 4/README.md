# UniFlow Student Dashboard

A responsive multi-page student dashboard built with Vue 3 and Ant Design Vue. The application fetches live data from the public DummyJSON REST API through Axios and handles loading, success, empty, and error states.

## Features

- Dashboard overview with GPA, progress, tasks, announcements, schedule, and classmates
- Course library with search and API-backed learning resources
- Assignment tracker with filtering, pagination, and Axios `PUT` updates
- Weekly schedule with day filtering and calendar
- API-backed student profile
- Responsive sidebar and mobile drawer
- Lazy-loaded Vue Router pages and custom 404 route
- Reusable loading and error state component with retry actions

## Pages

- `/` — Overview
- `/courses` — Courses and resources
- `/assignments` — Assignment tracker
- `/schedule` — Weekly schedule
- `/profile` — Student profile
- Unknown routes — 404 page

## Technology

- Vue 3 Composition API
- Ant Design Vue 4
- Vue Router 4
- Axios
- DummyJSON REST API
- Vite

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

> DummyJSON simulates update requests without permanently changing its database. Successful assignment updates are applied to the current UI state.
