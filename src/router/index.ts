import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import About from '../views/About.vue'
import Blog from '../views/Blog.vue'
import BlogPost from '../views/BlogPost.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/products', name: 'Products', component: Products },
    { path: '/about', name: 'About', component: About },
    { path: '/blog', name: 'Blog', component: Blog },
    { path: '/blog/:slug', name: 'BlogPost', component: BlogPost, props: true },
  ],
})

export default router