<script setup lang="ts">
  import CovidList from "@/components/CovidList.vue"

  definePageMeta({
    middleware: ["auth"]
  })
</script>

<template>
  <nuxt-layout name="default">
    <covid-list></covid-list>
  </nuxt-layout>
</template>