import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const friendlyError = new Error(
      error.code === 'ECONNABORTED'
        ? 'The request took too long. Please try again.'
        : error.response
          ? `The server returned an error (${error.response.status}).`
          : 'Could not connect to the data service.',
    )
    friendlyError.cause = error
    return Promise.reject(friendlyError)
  },
)

export async function getStudent(id = 1) {
  const { data } = await api.get(`/users/${id}`)
  return data
}

export async function getClassmates(limit = 8) {
  const { data } = await api.get('/users', { params: { limit, skip: 1 } })
  return data.users
}

export async function getAssignments(limit = 18) {
  const { data } = await api.get('/todos', { params: { limit } })
  return data.todos
}

export async function getAnnouncements(limit = 6) {
  const { data } = await api.get('/posts', { params: { limit } })
  return data.posts
}

export async function updateAssignment(id, completed) {
  const { data } = await api.put(`/todos/${id}`, { completed })
  return data
}

export default api
