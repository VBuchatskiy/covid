<template>
  <button
    class="bg-indigo-900 px-4 py-2 font-sans text-lg text-white rounded cursor-pointer"
    v-bind:class="{
      'bg-slate-400': disabled
    }"
    v-bind="{
      disabled: props.disabled || false,
      type: props.type || 'button'
    }"
    v-on="{
      click: (event: Event) => emits('click', event)
    }"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue"

const props = defineProps<{
  disabled?: boolean,
  type?: 'submit' | 'button' | 'reset'
}>()

const emits = defineEmits<{
  (e: 'click', event: Event ) : void
}>()
</script>