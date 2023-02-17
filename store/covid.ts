import { defineStore } from 'pinia'
import { ref } from "vue"
import { ICovid } from "~/types"

export const useCovidStore = defineStore('covid', () => {
  const items = ref<{ data: ICovid }[] | null>(null)
  const loading = ref<boolean>(false)

  const getCovidReport = async (persistent?: boolean) => {
    loading.value = true

    const storage = localStorage.getItem('items')

    if (storage && persistent) {
      items.value = JSON.parse(storage)
      loading.value = false
      return
    }

    // TODO make wrapper with config
    const { data, error, pending } = await useFetch('/reports',
      {
        headers: {
          'Authorization': JSON.parse(localStorage.getItem('token') || "")?.token || ""
        },
      },
    )

    if (error.value) {
      loading.value = false
      throw error.value
    }

    localStorage.setItem('items', JSON.stringify(data.value))

    items.value = data.value
    loading.value = pending.value
  }

  const removeCovidReport = async (index: number) => {
    loading.value = true

    // TODO add remove on server
    items.value = items.value?.filter((item, $index) => index !== $index) || items.value

    localStorage.setItem('items', JSON.stringify(items.value))

    if (!items.value?.length) {
      localStorage.removeItem('items')
    }

    loading.value = false
  }

  return { items, loading, getCovidReport, removeCovidReport }
})