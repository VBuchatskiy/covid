import { ICredentials } from "~~/types"

export default defineEventHandler(async (event) => {
  const data: ICredentials | null = await readBody(event)

  if (!data?.username || !data?.password) {
    throw createError({
      statusCode: 400,
      message: 'Invalid credentials'
    })
  }

  return {
    token: 'jwt_token'
  }
})