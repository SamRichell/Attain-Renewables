<template>
  <div class="container mx-auto px-6 py-12">
    <h1 class="text-4xl font-bold text-center mb-4">Our Products</h1>
    <p class="text-center text-gray-600 mb-10">High-performance renewable energy equipment sourced from around the globe.</p>
 
    <!-- Category filter tabs -->
    <div class="flex flex-wrap justify-center gap-3 mb-10">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="selectCategory(cat)"
        class="px-5 py-2 rounded-full border font-medium transition"
        :class="selectedCategory === cat
          ? 'bg-green-600 text-white border-green-600'
          : 'border-gray-300 text-gray-700 hover:border-green-400 hover:text-green-700'"
      >
        {{ cat }}
      </button>
    </div>
 
    <!-- Product grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="product in paginatedProducts"
        :key="product.id"
        class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
      >
        <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover">
        <div class="p-6 flex flex-col flex-1">
          <span class="text-xs font-semibold text-green-700 uppercase tracking-wide bg-green-50 px-2 py-1 rounded mb-3 inline-block">
            {{ product.category }}
          </span>
          <h3 class="text-xl font-semibold mb-2">{{ product.name }}</h3>
          <p class="text-gray-600 mb-4">{{ product.description }}</p>
          <div class="flex justify-between items-center mt-auto">
            <span class="text-green-700 font-bold text-lg">{{ product.price }}</span>
            <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Inquire</button>
          </div>
        </div>
      </div>
    </div>
 
    <!-- Empty state -->
    <div v-if="filteredProducts.length === 0" class="text-center py-20 text-gray-400">
      <p class="text-xl">No products found in this category.</p>
    </div>
 
    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex justify-center items-center gap-3 mt-12">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
      >
        ← Previous
      </button>
      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        class="w-10 h-10 rounded-lg border transition"
        :class="page === currentPage
          ? 'bg-green-600 text-white border-green-600'
          : 'border-gray-300 text-gray-700 hover:bg-gray-50'"
      >
        {{ page }}
      </button>
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
      >
        Next →
      </button>
    </div>
  </div>
</template>
 
<script setup lang="ts">
import { ref, computed } from 'vue'
import productsData from '../data/products.json'
 
const PRODUCTS_PER_PAGE = 6
 
const allProducts      = productsData
const currentPage      = ref(1)
const selectedCategory = ref('All')
 
// Build category list dynamically from the data so adding a new category
// to products.json automatically appears in the filter tabs.
const categories = computed(() => {
  const unique = new Set(allProducts.map(p => p.category))
  return ['All', ...Array.from(unique)]
})
 
const filteredProducts = computed(() =>
  selectedCategory.value === 'All'
    ? allProducts
    : allProducts.filter(p => p.category === selectedCategory.value)
)
 
const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredProducts.value.length / PRODUCTS_PER_PAGE))
)
 
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * PRODUCTS_PER_PAGE
  return filteredProducts.value.slice(start, start + PRODUCTS_PER_PAGE)
})
 
function selectCategory(cat: string) {
  selectedCategory.value = cat
  currentPage.value      = 1
}
 
function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>