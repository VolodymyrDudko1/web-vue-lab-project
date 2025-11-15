<script setup lang="ts">
import { useCartStore } from "../stores/cart"

const cart = useCartStore()

function removeItem(id: number) {
  cart.removeProduct(id)
}

function increase(id: number) {
  cart.increase(id)
}

function decrease(id: number) {
  cart.decrease(id)
}
</script>

<template>
  <div class="container py-4">

    <h1 class="fw-bold mb-4">Кошик</h1>

    <b-alert variant="info" show v-if="cart.items.length === 0">
      Ваш кошик порожній
    </b-alert>

    <b-card
        v-for="item in cart.items"
        :key="item.id"
        class="mb-3 shadow-sm p-3 cart-item-card"
    >
      <div class="d-flex gap-3 align-items-start">

        <img
            :src="item.images[0]"
            class="rounded border"
            style="width: 75px; height: 75px; object-fit: cover;"
        />

        <div class="flex-grow-1">
          <h5 class="mb-1 fw-semibold">{{ item.title }}</h5>

          <div class="text-muted small">
            Ціна: <span class="fw-bold">${{ item.price }}</span>
          </div>

          <div class="text-muted small">
            Продавець: <span class="fw-semibold">Fast Sale</span>
          </div>
        </div>

        <div class="text-end">

          <div class="d-flex align-items-center justify-content-end mb-2">

            <b-button
                size="sm"
                variant="outline-secondary"
                @click="decrease(item.id)"
            >–</b-button>

            <span class="px-3 fw-bold">{{ item.quantity }}</span>

            <b-button
                size="sm"
                variant="outline-secondary"
                @click="increase(item.id)"
            >+</b-button>
          </div>

          <div class="fw-bold fs-5">
            ${{ item.price * item.quantity }}
          </div>

          <b-button
              variant="outline-danger"
              size="sm"
              class="mt-2"
              @click="removeItem(item.id)"
          >
            Видалити
          </b-button>

        </div>

      </div>
    </b-card>

    <div v-if="cart.items.length" class="text-end mt-4">
      <h2 class="fw-bold">Загалом: ${{ cart.total }}</h2>
    </div>

  </div>
</template>

<style scoped>
.cart-item-card {
  border-radius: 12px;
}
</style>
