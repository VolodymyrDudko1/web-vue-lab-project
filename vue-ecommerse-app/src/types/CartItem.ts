import type { Product } from "./Products"

export interface CartItem extends Product {
    quantity: number
}
