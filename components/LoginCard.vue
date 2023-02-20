<template>
    <form>
      <fieldset>
        <button @click="onLogin">  
          <NuxtLink :to="{ path: '/'}">
            login
          </NuxtLink>
        </button>
      </fieldset>
    </form>
</template>

<script setup lang="ts">
  import { useAuthStore } from "~~/store/auth";
  
  const store = useAuthStore()

  const onLogin = async () => {
    await store.login({ username: 'test', password: 'test'})
  }
</script>

<style scoped>

</style>