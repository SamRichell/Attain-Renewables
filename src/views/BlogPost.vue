<template>
  <div class="container mx-auto px-6 py-12">
    <div v-if="post" class="max-w-3xl mx-auto">
      <router-link to="/blog" class="text-green-600 hover:underline mb-6 inline-block font-medium">
        ← Back to blog
      </router-link>
      <h1 class="text-4xl font-bold mb-2">{{ post.title }}</h1>
      <p class="text-gray-500 mb-10">{{ post.date }}</p>
      <div class="prose prose-lg max-w-none" v-html="post.content"></div>
    </div>
 
    <div v-else class="text-center py-12">
      <h2 class="text-2xl font-bold mb-3">Post not found</h2>
      <router-link to="/blog" class="text-green-600 hover:underline">Return to blog</router-link>
    </div>
  </div>
</template>
 
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import postsData from '../data/posts.json'
 
const route = useRoute()
 
// Find the post synchronously from the JSON import.
// No async/loading state needed — the data is already in memory.
const post = computed(() =>
  postsData.find(p => p.slug === route.params.slug) ?? null
)
</script>