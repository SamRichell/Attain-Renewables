<template>
  <header class="bg-white shadow-md">
    <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
      <router-link to="/" class="text-2xl font-bold text-green-700">Attain Renewables</router-link>
      <div class="space-x-6">
        <router-link to="/" class="text-gray-700 hover:text-green-600">Home</router-link>
        <router-link to="/products" class="text-gray-700 hover:text-green-600">Products</router-link>
        <router-link to="/about" class="text-gray-700 hover:text-green-600">About</router-link>
        <router-link to="/blog" class="text-gray-700 hover:text-green-600">Blog</router-link>
        <router-link
          to="/quote"
          class="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition"
        >
          Get a Quote
        </router-link>
      </div>
    </nav>
  </header>
</template>