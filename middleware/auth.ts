import { useAuthStore } from "@/store/auth"

export default defineNuxtRouteMiddleware(() => {
  const store = useAuthStore()
  
  if (!store.authorized) {
    return navigateTo('/login')
  }
})