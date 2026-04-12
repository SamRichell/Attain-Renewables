<template>
  <header class="transition-all duration-300" :class="headerClass">
    <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
      <!-- Logo -->
      <router-link to="/" class="shrink-0">
        <img :src="logoSrc" class="h-12 w-auto block object-contain" alt="Logo" />
      </router-link>
 
      <!-- Desktop nav -->
      <div class="hidden md:flex items-center gap-6">
        <router-link
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="transition-colors duration-200 text-sm font-medium"
          :class="isTransparent ? 'text-green-100 hover:text-white' : 'text-gray-700 hover:text-green-600'"
        >
          {{ link.label }}
        </router-link>
        <router-link
          to="/quote"
          class="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap"
          :class="isTransparent ? 'bg-white/20 border border-white/40 text-white hover:bg-white/30' : 'bg-green-600 text-white hover:bg-green-700'"
        >
          Get a Quote
        </router-link>
      </div>
 
      <!-- Mobile hamburger button -->
      <button
        class="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg transition"
        :class="isTransparent ? 'text-white' : 'text-gray-700'"
        @click="mobileOpen = !mobileOpen"
        aria-label="Toggle menu"
      >
        <span
          class="block w-6 h-0.5 bg-current transition-all duration-300 origin-center"
          :class="mobileOpen ? 'translate-y-2 rotate-45' : ''"
        ></span>
        <span
          class="block w-6 h-0.5 bg-current transition-all duration-300"
          :class="mobileOpen ? 'opacity-0 scale-x-0' : ''"
        ></span>
        <span
          class="block w-6 h-0.5 bg-current transition-all duration-300 origin-center"
          :class="mobileOpen ? '-translate-y-2 -rotate-45' : ''"
        ></span>
      </button>
    </nav>
 
    <!-- Mobile dropdown menu -->
    <div
      class="md:hidden overflow-hidden transition-all duration-300 border-t border-gray-100"
      :class="mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 border-transparent'"
    >
      <div class="container mx-auto px-6 py-4 flex flex-col gap-1">
        <router-link
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="py-3 px-2 text-sm font-medium rounded-lg transition-colors duration-200 text-gray-700 hover:text-green-600 hover:bg-green-50"
          @click="mobileOpen = false"
        >
          {{ link.label }}
        </router-link>
        <router-link
          to="/quote"
          class="mt-2 px-4 py-3 rounded-full text-sm font-semibold text-center bg-green-600 text-white hover:bg-green-700 transition-all duration-200"
          @click="mobileOpen = false"
        >
          Get a Quote
        </router-link>
      </div>
    </div>
  </header>
</template>
 
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
 
const route = useRoute()
const isHome = computed(() => route.name === 'Home')
const mobileOpen = ref(false)
 
// Transparent only when on the home page AND the mobile menu is closed
const isTransparent = computed(() => isHome.value && !mobileOpen.value)
 
const headerClass = computed(() =>
  isTransparent.value
    ? 'absolute top-0 left-0 right-0 z-50 bg-transparent'
    : 'bg-white shadow-md fixed top-0 left-0 right-0 z-50'
)
 
const logoSrc = computed(() =>
  isTransparent.value ? '/logoWhite.svg' : '/logo.svg'
)
 
// Close mobile menu on route change
watch(() => route.path, () => { mobileOpen.value = false })
 
const navLinks = [
  { to: '/',         label: 'Home'     },
  { to: '/products', label: 'Products' },
  { to: '/about',    label: 'About'    },
  { to: '/blog',     label: 'Blog'     },
]
</script>