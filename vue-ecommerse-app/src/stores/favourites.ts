import { defineStore } from "pinia"

export const useFavouritesStore = defineStore("favourites", {
    state: () => ({
        items: JSON.parse(localStorage.getItem("favourites") || "[]") as any[]
    }),

    getters: {
        count: (state) => state.items.length
    },
    
    actions: {
        save() {
            localStorage.setItem("favourites", JSON.stringify(this.items))
        },
        toggleProduct(product: any) {
            const existing = this.items.find(i => i.id === product.id)

            if (existing) {
                this.items = this.items.filter(i => i.id !== product.id)
            } else {
                this.items.push(product)
            }

            this.save()
        },
        removeProduct(id: number) {
            this.items = this.items.filter(i => i.id !== id)
            this.save()
        },
        isItemInFavourites(id: number) {
            return this.items.some(item => item.id === id);
        }
    }
})