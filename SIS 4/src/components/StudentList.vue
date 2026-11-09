<script setup>
defineProps({
  students: {
    type: Array,
    required: true,
  },
})

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'University', dataIndex: 'university', key: 'university' },
]
</script>

<template>
  <a-table :columns="columns" :data-source="students" row-key="id" :pagination="false">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        {{ record.firstName }} {{ record.lastName }}
      </template>
    </template>
  </a-table>
</template>
