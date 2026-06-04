<template>
  <div class="container mx-auto px-6 py-12">
    <!-- Loading skeleton -->
    <div v-if="loading" class="max-w-3xl mx-auto">
      <div class="animate-pulse">
        <div class="h-6 bg-gray-200 rounded w-32 mb-6"></div>
        <div class="h-10 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div class="h-5 bg-gray-200 rounded w-1/4 mb-10"></div>
        <div class="space-y-3">
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded w-5/6"></div>
          <div class="h-4 bg-gray-200 rounded w-4/5"></div>
        </div>
      </div>
    </div>

    <!-- Fetch error (non‑404) -->
    <div v-else-if="error && !isNotFound" class="text-center py-12">
      <p class="text-red-600 mb-4">{{ error }}</p>
      <button
        @click="fetchPost"
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Retry
      </button>
    </div>

    <!-- Post not found (404 or falsy post after fetch) -->
    <div v-else-if="isNotFound || (!loading && !post)" class="text-center py-12">
      <h2 class="text-2xl font-bold mb-3">Post not found</h2>
      <router-link to="/blog" class="text-green-600 hover:underline">Return to blog</router-link>
    </div>

    <!-- Success: full post -->
    <div v-else-if="post" class="max-w-3xl mx-auto">
      <router-link to="/blog" class="text-green-600 hover:underline mb-6 inline-block font-medium">
        ← Back to blog
      </router-link>
      <h1 class="text-4xl font-bold mb-2">{{ post.title }}</h1>
      <p class="text-gray-500 mb-10">{{ post.date }}</p>
      <div class="prose prose-lg max-w-none" v-html="post.content"></div>
      <img :src="'https://cdn.attainrenewables.com/blog/images/' + post.slug" :alt="post.title" class="w-full object-cover" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

interface BlogPost {
  title: string
  slug: string
  date: string
  content: string
  // optional image, etc.
}

const route = useRoute()
const slug = route.params.slug as string

const post = ref<BlogPost | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const isNotFound = ref(false)

let abortController: AbortController | null = null

const fetchPost = async () => {
  // Cancel any ongoing request
  if (abortController) {
    abortController.abort()
  }

  abortController = new AbortController()
  loading.value = true
  error.value = null
  isNotFound.value = false
  post.value = null

  const baseUrl = "https://cdn.attainrenewables.com"
  if (!baseUrl) {
    error.value = 'Missing R2 base URL configuration'
    loading.value = false
    return
  }

  try {
    const url = `${baseUrl}/blog/posts/${slug}.json`
    const response = await fetch(url, {
      signal: abortController.signal,
    })

    if (response.status === 404) {
      isNotFound.value = true
      return
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    post.value = data
  } catch (err) {
    if (err instanceof Error && err.name !== 'AbortError') {
      error.value = err.message || 'Failed to load post'
      console.error('Fetch error:', err)
    }
  } finally {
    if (abortController && !abortController.signal.aborted) {
      loading.value = false
    }
  }
}

onMounted(() => {
  fetchPost()
})

onUnmounted(() => {
  if (abortController) {
    abortController.abort()
  }
})
</script>