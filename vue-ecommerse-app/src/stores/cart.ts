import { defineStore } from "pinia"

export const useCartStore = defineStore("cart", {
    state: () => ({
        items: JSON.parse(localStorage.getItem("cart") || "[]") as any[]
    }),

    getters: {
        count: (state) =>
            state.items.reduce((sum, item) => sum + item.quantity, 0),

        total: (state) =>
            state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },

    actions: {
        save() {
            localStorage.setItem("cart", JSON.stringify(this.items))
        },

        addProduct(product: any) {
            const existing = this.items.find(i => i.id === product.id)

            if (existing) {
                existing.quantity++
            } else {
                this.items.push({
                    ...product,
                    quantity: 1
                })
            }

            this.save()
        },

        increase(id: number) {
            const item = this.items.find(i => i.id === id)
            if (item) item.quantity++
            this.save()
        },

        decrease(id: number) {
            const item = this.items.find(i => i.id === id)
            if (item && item.quantity > 1) item.quantity--
            this.save()
        },

        removeProduct(id: number) {
            this.items = this.items.filter(i => i.id !== id)
            this.save()
        }
    }
})
