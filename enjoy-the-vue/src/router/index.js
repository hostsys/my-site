import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { nextTick } from 'vue'

const scrollableElementId = 'content'
const scrollPositions = Object.create(null)

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/portfolio',
            name: 'portfolio',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/PortfolioView.vue')
        },
        {
            path: '/music',
            name: 'music',
            component: () => import('../views/MusicView.vue')
        },
        {
            path: '/gallery',
            name: 'gallery',
            component: () => import('../views/GalleryView.vue')
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        const element = document.getElementById(scrollableElementId)

        if (savedPosition && element !== null && to.fullPath in scrollPositions) {
            element.scrollTop = scrollPositions[to.fullPath]
        } else {
            element.scrollTop = 0
        }
    }
})

router.beforeEach((to, from, next) => {
    const element = document.getElementById(scrollableElementId)
    if (element !== null) {
        scrollPositions[from.fullPath] = element.scrollTop
    }
    next()
})

router.afterEach((to, from) => {
    if (to.fullPath === from.fullPath) {
        return
    }
    nextTick(() => {
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                    window.requestAnimationFrame(() => {
                        setTimeout(() => {
                            const element = document.getElementById(scrollableElementId)
                            if (element !== null) {
                                element.scrollTop =
                                    scrollPositions[router.currentRoute.value.fullPath]
                            }
                        }, 100)
                    })
                })
            })
        })
    })
})

export default router
