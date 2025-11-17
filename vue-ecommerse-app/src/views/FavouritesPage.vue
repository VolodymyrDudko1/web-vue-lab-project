<script setup lang="ts">
import ProductCard from "../componets/ProductCard.vue";
import { useFavouritesStore } from "../stores/favourites"
const favourites = useFavouritesStore()

function removeItem(id: number) {
  favourites.removeProduct(id)
}
console.log(favourites.items)



</script>

<template>
    <div class="container py-4">
    
        <h1 class="fw-bold mb-4">Вибране</h1>

        <b-alert variant="info" show v-if="favourites.items.length === 0">
          Ваш список вибраного порожній
        </b-alert>

        <b-row class="g-4" v-if="favourites.items.length > 0">
          <b-col
              v-for="item in favourites.items"
              :key="item.id"
              cols="12" sm="6" md="4" lg="3"
          >
            <ProductCard
                :product="item"
                @favorite="removeItem(item.id)"
            />
          </b-col>
        </b-row>
    </div>
</template>