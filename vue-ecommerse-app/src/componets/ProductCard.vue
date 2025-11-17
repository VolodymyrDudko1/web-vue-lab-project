<script setup lang="ts">
import { useFavouritesStore } from '../stores/favourites';
const favourites = useFavouritesStore();


defineProps<{ product: any }>()

function isFavorite(productId: number) {
  return favourites.isItemInFavourites(productId);
}
</script>

<template>
  <b-card
      :title="product.title"
      class="h-100 shadow-sm position-relative product-card"
      img-top
      :img-src="product.images?.[0]"
  >
    <i
        class="bi favorite-icon"
        :class="isFavorite(product.id) ? 'bi-heart-fill' : 'bi-heart'"
        @click="$emit('favorite', product)"
    ></i>

    <template #footer>
      <div class="d-flex justify-content-between align-items-center">
        <span class="fw-bold fs-5">{{ product.price }}$</span>

        <b-button
            size="sm"
            variant="primary"
            @click="$emit('add-to-cart', product)"
        >
          Add to cart
        </b-button>
      </div>
    </template>
  </b-card>
</template>

<style scoped>
.product-card {
  transition: 0.2s ease-in-out;
}

.product-card:hover {
  transform: translateY(-3px);
}

.favorite-icon {
  position: absolute;
  top: 10px;
  right: 12px;
  font-size: 1.4rem;
  color: #dc3545;
  cursor: pointer;
  transition: 0.2s ease;
  text-shadow: 0 0 3px rgba(255,255,255,0.7);
}

.favorite-icon:hover {
  transform: scale(1.15);
}
</style>
