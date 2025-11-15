<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductsFilter from "../componets/ProductsFilter.vue"
import ProductCard from "../componets/ProductCard.vue"
import Pagination from "../componets/Pagination.vue"
import { mockProducts } from "../mock/products"
import {useCartStore} from "../stores/cart";


const route = useRoute()
const router = useRouter()

const cart = useCartStore()
const page = ref(Number(route.query.page ?? 1))
const search = ref(route.query.search ?? '')
const minPrice = ref(route.query.minPrice ?? '')
const maxPrice = ref(route.query.maxPrice ?? '')
const category = ref(route.query.category ?? '')   // нове

const products = ref<any[]>([])
const totalPages = ref(1)

function applyFilters(filters: any) {
  router.push({
    query: {
      search: filters.search || undefined,
      minPrice: filters.minPrice || undefined,
      maxPrice: filters.maxPrice || undefined,
      category: filters.category || undefined,
      page: 1
    }
  })
}

function setPage(newPage: number) {
  router.push({
    query: {
      ...route.query,
      page: newPage
    }
  })
}

function loadProducts() {
  let filtered = [...mockProducts]

  if (search.value) {
    filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(String(search.value).toLowerCase())
    )
  }

  if (minPrice.value) {
    filtered = filtered.filter(p => p.price >= Number(minPrice.value))
  }

  if (maxPrice.value) {
    filtered = filtered.filter(p => p.price <= Number(maxPrice.value))
  }

  if (category.value) {
    filtered = filtered.filter(p => p.category === category.value)
  }

  if (category.value) {
    filtered = filtered.filter(
        p => p.category?.toLowerCase() === String(category.value).toLowerCase()
    )
  }

  const perPage = 4
  totalPages.value = Math.max(1, Math.ceil(filtered.length / perPage))

  const start = (page.value - 1) * perPage
  products.value = filtered.slice(start, start + perPage)
}

function addToCart(product: any) {
  cart.addProduct(product)
}

watch(() => route.query, () => {
  page.value = Number(route.query.page ?? 1)
  search.value = route.query.search ?? ''
  minPrice.value = route.query.minPrice ?? ''
  maxPrice.value = route.query.maxPrice ?? ''
  category.value = route.query.category ?? ''

  loadProducts()
})

loadProducts()
</script>

<template>
  <div class="container py-4">

    <h1 class="mb-4 fw-bold text-center">Products</h1>

    <b-card class="shadow-sm mb-4 p-3">
      <ProductsFilter
          @submit-filters="applyFilters"
          :initial-search="search"
          :initial-min-price="minPrice"
          :initial-max-price="maxPrice"
          :initial-category="category"
      />
    </b-card>

    <b-row class="g-4">
      <b-col
          v-for="product in products"
          :key="product.id"
          cols="12" sm="6" md="4" lg="3"
      >
        <ProductCard
            :product="product"
            @add-to-cart="addToCart"
        />
      </b-col>
    </b-row>

    <div class="d-flex justify-content-center mt-4">
      <Pagination
          :current-page="page"
          :total-pages="totalPages"
          @change="setPage"
      />
    </div>

  </div>
</template>

<style scoped></style>
