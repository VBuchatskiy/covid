<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCovidStore } from "~~/store/covid";
import { ICovid } from "~~/types";

type TCovidView = Pick<ICovid, 'confirmed_diff' | 'date' | 'deaths_diff' | 'active_diff'>
type TCovidHeader = keyof TCovidView

const store = useCovidStore()
const { items, loading }  = storeToRefs(store)

const headers: TCovidHeader[] = ['confirmed_diff', 'date', 'deaths_diff', 'active_diff']

const onRefresh = async () => {
  await store.getCovidReport()
}

const onDelete = async (index: number) => {
  // TODO replace with new map for id
  await store.removeCovidReport(index)
}

</script>

<template>
  <section class="min-h-screen flex flex-col justify-center items-center">
    <header  class="w-full font-medium font-sans text-2xl mb-2 text-white">
      <h5>
        Covid 19
      </h5>
    </header>
   
    <table class="w-full font-sans text-md text-slate-700 mb-2">
      <template v-if="!loading">
        <thead>
          <tr>
            <template v-for="header of headers">
              <th class="capitalize font-sans text-md p-1 text-slate-300 border-2 border-slate-500 rounded-md">
                {{ header.replace('_', ' ') }}
              </th>
            </template>
            <th class="capitalize font-sans text-md p-1 text-slate-300 border-2 border-slate-500 rounded-md">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="items && items.length" v-for="(item, index) of items">
            <tr class="text-center">
              <template v-for="header of headers">
                <td class="border-2 border-slate-500 font-sans text-md text-slate-300 rounded-md">
                  {{ item.data[header as keyof TCovidView] }}
                </td>
              </template>
              <td class="border-2 border-slate-500 font-sans text-md text-slate-300 rounded-md">
                <!-- TODO update button component -->
                <base-button class="bg-transparent" v-on="{
                  click: () => onDelete(index)
                }"> 
                  Delete 
                </base-button>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr class="text-white text-center">
              <span>
                No data
              </span>
            </tr>
          </template>
        </tbody>
      </template>
      <template v-else>
        <tbody>
          <tr>
            <th>
              <p class="text-white text-center">
                Loading
              </p>
            </th>
          </tr>
        </tbody>
      </template>
    </table>
   
    <footer class="w-full flex justify-end">
      <base-button
        v-bind="{
          disabled: loading,
        }"
        v-on="{
          click: onRefresh
        }"
      >
        <template v-slot:default>
          Refresh
        </template>
      </base-button>
    </footer>
  </section>
</template>