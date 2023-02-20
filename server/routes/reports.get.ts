import { ICovid } from "~/types"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const params = getQuery(event)
  const authorized = getHeader(event, 'Authorization')

  if (!authorized || authorized !== 'jwt_token') {
    throw createError({
      statusCode: 400,
      message: 'Authorized'
    })
  }

  const { data } = await $fetch<{ data: ICovid }>('/reports/total', {
    baseURL: config.public.baseURL,
    params,
  })

  if (!data) {
    throw createError({
      statusCode: 404,
      message: 'Not Found'
    })
  }

  return data
})