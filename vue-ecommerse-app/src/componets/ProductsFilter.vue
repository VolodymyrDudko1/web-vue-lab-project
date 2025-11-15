<script setup lang="ts">
import { ref, onMounted } from 'vue'

const emit = defineEmits(['submit-filters'])

const search = ref('')
const minPrice = ref('')
const maxPrice = ref('')
const category = ref('')

// тоже поки фіксовані, поки немає апішних
const categories = [
  { value: '', text: 'Усі категорії' },
  { value: 'clothes', text: 'Clothes' },
  { value: 'electronics', text: 'Electronics' },
  { value: 'accessories', text: 'Accessories' },
  { value: 'sport', text: 'Sport' },
]

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
