<template>
  <div class="container mx-auto px-6 py-12">
    <h1 class="text-4xl font-bold text-center mb-4">Blog</h1>
    <p class="text-center text-gray-600 mb-12">Insights, news, and tips from the renewable energy world</p>
 
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="post in paginatedPosts" :key="post.id" class="bg-white rounded-lg shadow-md overflow-hidden">
        <img :src="post.image" :alt="post.title" class="w-full h-48 object-cover">
        <div class="p-6">
          <p class="text-sm text-gray-500 mb-2">{{ post.date }}</p>
          <h2 class="text-xl font-semibold mb-2">{{ post.title }}</h2>
          <p class="text-gray-600 mb-4">{{ post.excerpt }}</p>
          <router-link :to="`/blog/${post.slug}`" class="text-green-600 hover:underline font-medium">Read more →</router-link>
        </div>
      </div>
    </div>
 
    <!--
      Pagination controls.
      These only appear once there's more than one page of content.
      With the JSON approach, every post is still bundled — pagination here
      only improves render performance and UX. See the backend guide in the
      README for how to move this to server-side pagination at scale.
    -->
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
 
    <p v-if="totalPages > 1" class="text-center text-gray-400 text-sm mt-4">
      Page {{ currentPage }} of {{ totalPages }} — {{ allPosts.length }} posts total
    </p>
  </div>
</template>
 
<script setup lang="ts">
import { ref, computed } from 'vue'
import postsData from '../data/posts.json'
 
/*
  SCALABILITY NOTE:
  With the JSON import below, ALL posts are bundled into the JavaScript that
  every visitor downloads — even on the first page. This is acceptable up to
  roughly 50–100 posts before bundle size and memory usage become noticeable.
 
  For hundreds or thousands of posts, replace this import with a fetch() call
  to a backend API (e.g. Strapi) that supports pagination natively. The
  currentPage and POSTS_PER_PAGE logic below maps directly onto
  Strapi's ?pagination[start]=N&pagination[limit]=M query parameters.
*/
const POSTS_PER_PAGE = 6
 
const allPosts = ref(postsData)
const currentPage = ref(1)
 
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
</script>