<template>
  <div class="container mx-auto px-6 py-12">
    <h1 class="text-4xl font-bold text-center mb-4">Our Products</h1>
    <p class="text-center text-gray-600 mb-12">High‑performance renewable energy equipment sourced from around the globe.</p>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="product in products" :key="product.id" class="bg-white rounded-lg shadow-md overflow-hidden">
        <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover">
        <div class="p-6">
          <h3 class="text-xl font-semibold mb-2">{{ product.name }}</h3>
          <p class="text-gray-600 mb-4">{{ product.description }}</p>
          <div class="flex justify-between items-center">
            <span class="text-green-700 font-bold">{{ product.price }}</span>
            <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Inquire</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Replace this data with your actual products
const products = ref([
  {
    id: 1,
    name: 'Monocrystalline Solar Panel 400W',
    description: 'High‑efficiency panel with 21% conversion rate, ideal for residential and commercial rooftops.',
    price: '€180',
    image: 'https://placehold.co/600x400?text=Solar+Panel'
  },
  {
    id: 2,
    name: 'Vertical Axis Wind Turbine 5kW',
    description: 'Quiet, bird‑friendly turbine perfect for urban and suburban environments.',
    price: '€4,200',
    image: 'https://placehold.co/600x400?text=Wind+Turbine'
  },
  {
    id: 3,
    name: 'Lithium‑ion Battery 10kWh',
    description: 'Modular storage system with 10‑year warranty, scalable to 100kWh.',
    price: '€3,500',
    image: 'https://placehold.co/600x400?text=Battery'
  },
  {
    id: 4,
    name: 'Bifacial Solar Panel 550W',
    description: 'Generates power from both sides, boosting yield by up to 30%.',
    price: '€250',
    image: 'https://placehold.co/600x400?text=Bifacial+Solar'
  },
  {
    id: 5,
    name: 'Horizontal Axis Wind Turbine 15kW',
    description: 'Heavy‑duty turbine for farms and small businesses.',
    price: '€12,800',
    image: 'https://placehold.co/600x400?text=Horizontal+Turbine'
  },
  {
    id: 6,
    name: 'Grid‑Tie Inverter 8kW',
    description: 'Smart inverter with monitoring app, compatible with all major brands.',
    price: '€950',
    image: 'https://placehold.co/600x400?text=Inverter'
  }
])
</script>