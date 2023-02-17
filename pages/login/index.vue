<script setup lang="ts">
  import LoginCard from "@/components/LoginCard.vue"
</script>

<template>
  <nuxt-layout name="default">
    <client-only>
      <login-card></login-card>
    </client-only>
  </nuxt-layout>
</template>