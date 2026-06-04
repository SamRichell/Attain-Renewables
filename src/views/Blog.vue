<template>
  <div class="container mx-auto px-6 py-12">
    <h1 class="text-4xl font-bold text-center mb-4">Blog</h1>
    <p class="text-center text-gray-600 mb-12">Insights, news, and tips from the renewable energy world</p>

    <!-- Error state -->
    <div v-if="error" class="text-center py-12">
      <p class="text-red-600 mb-4">{{ error }}</p>
      <button
        @click="fetchPosts"
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Retry
      </button>
    </div>

    <!-- Loading skeleton (3 cards) -->
    <div v-else-if="loading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="n in 3" :key="n" class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="w-full h-48 bg-gray-200 animate-pulse"></div>
        <div class="p-6">
          <div class="h-4 bg-gray-200 rounded animate-pulse mb-2 w-1/3"></div>
          <div class="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div class="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
          <div class="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        </div>
      </div>
    </div>

    <!-- Posts grid -->
    <div v-else>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="post in paginatedPosts"
          :key="post.id"
          class="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <img :src="'cdn.attainrenewables.com' + post.image" :alt="post.title" class="w-full h-48 object-cover" />
          <div class="p-6">
            <p class="text-sm text-gray-500 mb-2">{{ post.date }}</p>
            <h2 class="text-xl font-semibold mb-2">{{ post.title }}</h2>
            <p class="text-gray-600 mb-4">{{ post.excerpt }}</p>
            <router-link :to="`/blog/${post.slug}`" class="text-green-600 hover:underline font-medium">
              Read more →
            </router-link>
          </div>
        </div>
      </div>

      <!-- Pagination controls -->
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
          :class="
            page === currentPage
              ? 'bg-green-600 text-white border-green-600'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          "
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

      <p v-if="totalPages > 1" class="text-center text-gray-400 text-sm mt-4">
        Page {{ currentPage }} of {{ totalPages }} — {{ allPosts.length }} posts total
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Types for blog post metadata
interface BlogPost {
  id: number | string
  title: string
  slug: string
  date: string
  excerpt: string
  image: string
}

const POSTS_PER_PAGE = 6

const allPosts = ref<BlogPost[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const currentPage = ref(1)

let abortController: AbortController | null = null

// Fetch posts from R2
const fetchPosts = async () => {
  // Cancel any ongoing fetch
  if (abortController) {
    abortController.abort()
  }

  abortController = new AbortController()
  loading.value = true
  error.value = null

  const baseUrl = "https://cdn.attainrenewables.com"
  if (!baseUrl) {
    error.value = 'Missing R2 base URL configuration'
    loading.value = false
    return
  }

  try {
    const response = await fetch(`${baseUrl}/blog/index.json`, {
      signal: abortController.signal,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    // Assume the JSON is an array of BlogPost objects
    allPosts.value = data
    currentPage.value = 1 // Reset to first page on new data
  } catch (err) {
    if (err instanceof Error && err.name !== 'AbortError') {
      error.value = err.message || 'Failed to load blog posts'
      console.error('Fetch error:', err)
    }
  } finally {
    if (abortController && !abortController.signal.aborted) {
      loading.value = false
    }
  }
}

// Pagination computed
const totalPages = computed(() =>
  Math.max(1, Math.ceil(allPosts.value.length / POSTS_PER_PAGE))
)

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * POSTS_PER_PAGE
  return allPosts.value.slice(start, start + POSTS_PER_PAGE)
})

function goToPage(page: number) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Lifecycle
onMounted(() => {
  fetchPosts()
})

onUnmounted(() => {
  if (abortController) {
    abortController.abort()
  }
})
</script>