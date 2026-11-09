import { ref } from 'vue'

export function useAsync(loader) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref('')

  async function execute() {
    loading.value = true
    error.value = ''
    try {
      data.value = await loader()
      return data.value
    } catch (err) {
      error.value = err.message || 'Something went wrong.'
      return null
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, execute }
}
