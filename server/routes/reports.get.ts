import { ICovid } from "~/types"
import dayjs from "dayjs"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const authorized = getHeader(event, 'Authorization')

  if (!authorized || authorized !== 'jwt_token') {
    throw createError({
      statusCode: 403,
      message: 'Authorized'
    })
  }

  const days = new Array(5).fill(dayjs())

  // TODO handle error

  try {
    const data = await Promise.all(days.map((day, index) => {
      return $fetch<{ data: ICovid }>('/reports/total', {
        baseURL: config.public.baseURL,
        params: {
          date: day.subtract(index + 1, 'day').format("YYYY-MM-DD"),
          iso: 'UKR',
          pick: ['data']
        }
      })
    }))

    return data
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Error'
    })
  }
})