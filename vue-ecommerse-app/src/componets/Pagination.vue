<script setup lang="ts">
import { ref, watch } from "vue"

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits(["change"])

const localPage = ref(props.currentPage)

watch(() => props.currentPage, val => {
  localPage.value = val
})

watch(localPage, val => {
  emit("change", val)
})
</script>

<template>
  <b-pagination
      v-model="localPage"
      :total-rows="totalPages"
      :per-page="1"
      align="center"
      size="md"
      pills
      first-text="«"
      prev-text="‹"
      next-text="›"
      last-text="»"
  />
</template>
