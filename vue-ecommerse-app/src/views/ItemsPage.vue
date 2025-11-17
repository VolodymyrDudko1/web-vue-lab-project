<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductsFilter from "../componets/ProductsFilter.vue"
import ProductCard from "../componets/ProductCard.vue"
import Pagination from "../componets/Pagination.vue"
import { mockProducts } from "../mock/products"
import {useCartStore} from "../stores/cart";
import {useFavouritesStore} from "../stores/favourites";
import { APIservice } from "../services/APIservice";
import Footer from '../componets/Footer.vue'

const apiService = new APIservice()

const route = useRoute()
const router = useRouter()

const cart = useCartStore()
const favourites = useFavouritesStore()
const page = ref(Number(route.query.page ?? 1))
const search = ref(route.query.search ?? '')
const minPrice = ref(route.query.minPrice ?? '')
const maxPrice = ref(route.query.maxPrice ?? '')
const category = ref(route.query.category ?? '')   // нове

const products = ref<any[]>([])
const totalPages = ref(1)
const isLoading = ref(false)

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

async function loadProducts() {
  isLoading.value = true
  try {
    const allProducts = await apiService.fetchProducts(200, 0)
    
    let filtered = allProducts

    if (search.value) {
      filtered = filtered.filter((p: any) =>
          p.title.toLowerCase().includes(String(search.value).toLowerCase())
      )
    }

    if (minPrice.value) {
      filtered = filtered.filter((p: any) => p.price >= Number(minPrice.value))
    }

    if (maxPrice.value) {
      filtered = filtered.filter((p: any) => p.price <= Number(maxPrice.value))
    }

    if (category.value) {
      filtered = filtered.filter(
          (p: any) => p.category?.name?.toLowerCase() === String(category.value).toLowerCase()
      )
    }

    const perPage = 4
    totalPages.value = Math.max(1, Math.ceil(filtered.length / perPage))

    const start = (page.value - 1) * perPage
    products.value = filtered.slice(start, start + perPage)
  } catch (error) {
    console.error('Failed to load products:', error)
    products.value = []
  } finally {
    isLoading.value = false
  }
}

function addToCart(product: any) {
  cart.addProduct(product)
}

function toggleProduct(product: any) {
  favourites.toggleProduct(product)
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
            @favorite="toggleProduct"
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
