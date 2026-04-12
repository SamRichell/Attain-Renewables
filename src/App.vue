<template>
  <Header />
  <main :class="isHome ? 'min-h-screen' : 'min-h-screen pt-20'">
    <router-view />
  </main>
  <Footer />
</template>
 
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
 
const route = useRoute()
const isHome = computed(() => route.name === 'Home')
</script>