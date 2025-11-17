import {createRouter, createWebHistory} from 'vue-router'
import ItemsPage from '../views/ItemsPage.vue'
import ShoppingCartPage from '../views/ShoppingCartPage.vue'
import FavouritesPage from '../views/FavouritesPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'

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
        },
        {
            path: '/favourites',
            name: 'favourites',
            component: FavouritesPage
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundPage
        }
    ]
})

export default router