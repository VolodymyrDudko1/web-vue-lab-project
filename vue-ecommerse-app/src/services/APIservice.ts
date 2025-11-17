export class APIservice {
    private baseURL: string

    constructor() {
        this.baseURL = "https://api.escuelajs.co/api/v1/products"
    }
    async fetchProducts(limit = 50, offset = 0) {
        const response = await fetch(
            `${this.baseURL}?offset=${offset}&limit=${limit}`
        )
        return await response.json()
    }
    async fetchProduct(id: number) {
        const response = await fetch(`${this.baseURL}/${id}`)
        return await response.json()
    }
    async fetchCategories() {
        const response = await fetch(`https://api.escuelajs.co/api/v1/categories`)
        return await response.json()
    }
}