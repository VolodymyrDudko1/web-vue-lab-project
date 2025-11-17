<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { defineEmits, defineProps } from 'vue'
import { APIservice } from '../services/APIservice'

const emit = defineEmits(['submit-filters'])

const apiService = new APIservice()

const search = ref('')
const minPrice = ref('')
const maxPrice = ref('')
const category = ref('')


const categories = ref<any[]>([{ value: '', text: 'All categories' }])

async function loadCategories() {
  try {
    const apiCategories = await apiService.fetchCategories()
    categories.value = [
      { value: '', text: 'All categories' },
      ...apiCategories.map((cat: any) => ({
        value: cat.name,
        text: cat.name
      }))
    ]
  } catch (error) {
    console.error('Failed to load categories:', error)
  }
}
  

function applyFilters() {
  emit('submit-filters', {
    search: search.value,
    minPrice: minPrice.value,
    maxPrice: maxPrice.value,
    category: category.value,
  })
}

const props = defineProps<{
  initialSearch?: string
  initialMinPrice?: string
  initialMaxPrice?: string
  initialCategory?: string
}>()

onMounted(() => {
  search.value = props.initialSearch ?? ''
  minPrice.value = props.initialMinPrice ?? ''
  maxPrice.value = props.initialMaxPrice ?? ''
  category.value = props.initialCategory ?? ''
  loadCategories()
})
</script>

<template>
  <form @submit.prevent="applyFilters" class="row gy-3">

    <b-col cols="12" md="3">
      <label class="form-label fw-semibold">Search</label>
      <b-form-input v-model="search" placeholder="Search..." />
    </b-col>

    <b-col cols="6" md="2">
      <label class="form-label fw-semibold">Min price</label>
      <b-form-input type="number" v-model="minPrice" />
    </b-col>

    <b-col cols="6" md="2">
      <label class="form-label fw-semibold">Max price</label>
      <b-form-input type="number" v-model="maxPrice" />
    </b-col>

    <b-col cols="12" md="3">
      <label class="form-label fw-semibold">Категорія</label>
      <b-form-select
          v-model="category"
          :options="categories"
      />
    </b-col>

    <b-col cols="12" md="2" class="d-flex align-items-end">
      <b-button type="submit" variant="primary" class="w-100">
        Apply
      </b-button>
    </b-col>

  </form>
</template>

<style scoped>
</style>
