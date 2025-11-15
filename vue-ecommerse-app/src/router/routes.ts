import {createRouter, createWebHistory} from 'vue-router'
import ItemsPage from '../views/ItemsPage.vue'
import ShoppingCartPage from '../views/ShoppingCartPage.vue'

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior() {
        return { top: 0 }
    },
    routes: [
        {
            path: '/',
            redirect: '/products'
        },
        {
            path: '/products',
            name: 'products',
            component: ItemsPage
        },
        {
            path: '/cart',
            name: 'cart',
            component: ShoppingCartPage
        }
    ]
})

export default router