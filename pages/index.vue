<script setup lang="ts">
import { useCovidStore } from "~~/store/covid";
import CovidList from "@/components/CovidList.vue"

const { getCovidReport } = useCovidStore()

definePageMeta({
  middleware: ["auth"]
})

await getCovidReport(true)

</script>

<template>
  <nuxt-layout name="default">
    <covid-list></covid-list>
  </nuxt-layout>
</template>