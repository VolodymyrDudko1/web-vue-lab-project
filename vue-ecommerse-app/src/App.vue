<script setup lang="ts">
import { computed } from "vue"
import { useCartStore } from "./stores/cart"

const cart = useCartStore()

const cartCount = computed(() => cart.count)
</script>

<template>
  <div>

    <b-navbar type="light" variant="light" class="shadow-sm px-3 mb-4">

      <b-navbar-brand to="/" class="fw-bold">
        Shop
      </b-navbar-brand>

      <b-navbar-nav class="ms-auto d-flex align-items-center">

        <b-nav-item to="/products" class="me-3">
          Products
        </b-nav-item>

        <b-nav-item to="/cart" class="position-relative">

          <i class="bi bi-cart3 fs-4"></i>

          <transition name="badge-anim">
            <span
                v-if="cartCount > 0"
                class="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle shadow-sm"
            >
              {{ cartCount }}
            </span>
          </transition>

        </b-nav-item>

      </b-navbar-nav>
    </b-navbar>
    <router-view />

  </div>
</template>

<style scoped>
.badge-anim-enter-active,
.badge-anim-leave-active {
  transition: 0.2s ease;
}
.badge-anim-enter-from,
.badge-anim-leave-to {
  transform: scale(0.5);
  opacity: 0;
}
</style>
