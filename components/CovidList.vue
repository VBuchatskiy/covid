<script setup lang="ts">
import { useCovidStore } from "~~/store/covid";
import { TCovidView } from "~~/store/covid"
import { storeToRefs } from "pinia";

const store = useCovidStore()

const { item } = storeToRefs(store)

const onRefresh = async () => {
  await store.getCovidReports()
}

onMounted(async() => {
  await store.getCovidReports()
})

</script>

<template>
  <section>
    <header>
      <h5> 
        Covid 19
      </h5>
    </header>
    <main>
      <table>
        <template v-if="item">
          <thead>
            <tr>
              <template v-for="header of Object.keys(item)">
                  <th> 
                    {{ header }} 
                  </th>
              </template>
            </tr>
          </thead>
          <tbody>
            <tr>
              <template v-if="item" v-for="header of Object.keys(item)">
                <th> 
                  {{ item[header as keyof TCovidView] }} 
                </th>
              </template>
            </tr>
          </tbody>
        </template>
        <template v-else>
          <tbody>
            <tr>
              <th>
                No data
              </th>
            </tr>
          </tbody>
        </template>
      </table>
    </main>
    <footer>
      <button
        v-on="{
          click: onRefresh
        }"> 
          refresh 
      </button>
    </footer>
  </section>
</template>