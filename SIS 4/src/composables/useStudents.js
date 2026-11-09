import { computed, ref } from "vue";
import axios from "axios";

const Students = [
  {
    firstName: "Ayan",
    lastName: "Sarsenov",
    age: 18,
    email: "ayan@mail.kz",
    university: "Nazarbayev University",
  },
  {
    firstName: "Aigerim",
    lastName: "Nurlanova",
    age: 19,
    email: "aigerim@mail.kz",
    university: "Al-Farabi KazNU",
  },
  {
    firstName: "Dias",
    lastName: "Bekov",
    age: 20,
    email: "dias@mail.kz",
    university: "Satbayev University",
  },
  {
    firstName: "Madina",
    lastName: "Zhaksylyk",
    age: 18,
    email: "madina@mail.kz",
    university: "KBTU",
  },
  {
    firstName: "Alikhan",
    lastName: "Omarov",
    age: 21,
    email: "alikhan@mail.kz",
    university: "L.N. Gumilyov ENU",
  },
  {
    firstName: "Aruzhan",
    lastName: "Tolegenova",
    age: 19,
    email: "aruzhan@mail.kz",
    university: "SDU University",
  },
  {
    firstName: "Nursultan",
    lastName: "Akhmetov",
    age: 20,
    email: "nursultan@mail.kz",
    university: "Astana IT University",
  },
  {
    firstName: "Dana",
    lastName: "Kassymova",
    age: 21,
    email: "dana@mail.kz",
    university: "KIMEP University",
  },
];

export function useStudents(search) {
  const students = ref([]);
  const loading = ref(false);
  const error = ref("");

  const filteredStudents = computed(() => {
    const text = search.value.toLowerCase();
    return students.value.filter((student) =>
      `${student.firstName} ${student.lastName}`.toLowerCase().includes(text),
    );
  });

  const totalStudents = computed(() => students.value.length);
  const averageAge = computed(() => {
    if (!students.value.length) return 0;
    const sum = students.value.reduce(
      (total, student) => total + student.age,
      0,
    );
    return Math.round(sum / students.value.length);
  });

  async function getStudents() {
    loading.value = true;
    error.value = "";

    try {
      const response = await axios.get("https://dummyjson.com/users?limit=8");
      students.value = response.data.users.map((user, index) => ({
        id: user.id,
        ...Students[index],
      }));
    } catch {
      error.value = "Could not load students";
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    error,
    filteredStudents,
    totalStudents,
    averageAge,
    getStudents,
  };
}
