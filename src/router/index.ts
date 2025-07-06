import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TvView from '../views/TvView.vue'
import MainHomeView from '../views/MainHomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'movies',
      component: HomeView
    },
    {
      path: '/home',
      name: 'main-home',
      component: MainHomeView
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: () => import('../views/MovieView.vue')
    },
    {
      path: '/tv',
      name: 'tv-list',
      component: TvView
    },
    {
      path: '/tv/:id',
      name: 'tv',
      component: () => import('../views/TvDetailsView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue')
    }
  ]
})

export default router 