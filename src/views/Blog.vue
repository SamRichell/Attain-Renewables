<template>
  <div class="container mx-auto px-6 py-12">
    <h1 class="text-4xl font-bold text-center mb-4">Blog</h1>
    <p class="text-center text-gray-600 mb-12">Insights, news, and tips from the renewable energy world</p>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="post in posts" :key="post.id" class="bg-white rounded-lg shadow-md overflow-hidden">
        <img :src="post.image" :alt="post.title" class="w-full h-48 object-cover">
        <div class="p-6">
          <p class="text-sm text-gray-500 mb-2">{{ post.date }}</p>
          <h2 class="text-xl font-semibold mb-2">{{ post.title }}</h2>
          <p class="text-gray-600 mb-4">{{ post.excerpt }}</p>
          <router-link :to="`/blog/${post.slug}`" class="text-green-600 hover:underline font-medium">Read more →</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import postsData from '../data/posts.json'

const posts = ref([])

onMounted(() => {
  posts.value = postsData
})
</script>