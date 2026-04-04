<template>
  <header
    class="transition-all duration-300"
    :class="isHome
      ? 'fixed top-0 left-0 right-0 z-50 bg-transparent'
      : 'bg-white shadow-md'"
  >
    <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
      <router-link
        to="/"
        class="text-2xl font-bold transition-colors duration-300"
        :class="isHome ? 'text-white' : 'text-green-700'"
      >
        <img src="/logo.svg">
      </router-link>
      <div class="space-x-6">
        <router-link
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="transition-colors duration-200"
          :class="isHome
            ? 'text-green-100 hover:text-white'
            : 'text-gray-700 hover:text-green-600'"
        >
          {{ link.label }}
        </router-link>
        <router-link
          to="/quote"
          class="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
          :class="isHome
            ? 'bg-white/20 border border-white/40 text-white hover:bg-white/30'
            : 'bg-green-600 text-white hover:bg-green-700'"
        >
          Get a Quote
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route  = useRoute()
const isHome = computed(() => route.name === 'Home')

const navLinks = [
  { to: '/',         label: 'Home'     },
  { to: '/products', label: 'Products' },
  { to: '/about',    label: 'About'    },
  { to: '/blog',     label: 'Blog'     },
]
</script>

<style>
header img {
  height: 48px;
  width: auto;
  display: block;
  object-fit: contain;
}
</style>