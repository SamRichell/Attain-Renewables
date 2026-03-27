<template>
  <div>
    <!-- Hero section -->
    <section class="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
      <div class="container mx-auto px-6 text-center">
        <h1 class="text-5xl font-bold mb-4">Powering the Future with Renewable Energy</h1>
        <p class="text-xl mb-8">Importing top‑quality solar panels, wind turbines, and battery storage from trusted global manufacturers.</p>
        <router-link to="/products" class="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">Explore Products</router-link>
      </div>
    </section>

    <!-- Features grid -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center mb-12">Why Choose Attain Renewables?</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <div class="text-green-600 text-4xl mb-4">🌞</div>
            <h3 class="text-xl font-semibold mb-2">Premium Solar Panels</h3>
            <p>High‑efficiency monocrystalline panels from leading European and Asian manufacturers.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <div class="text-green-600 text-4xl mb-4">💨</div>
            <h3 class="text-xl font-semibold mb-2">Advanced Wind Turbines</h3>
            <p>Reliable, low‑noise turbines suitable for residential and commercial installations.</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <div class="text-green-600 text-4xl mb-4">🔋</div>
            <h3 class="text-xl font-semibold mb-2">Large‑Scale Batteries</h3>
            <p>Lithium‑ion storage systems that maximize energy independence and grid stability.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to action -->
    <section class="py-16 bg-green-700 text-white">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl font-bold mb-4">Ready to Make the Switch?</h2>
        <p class="text-xl mb-8">Contact us today for a free consultation and quote.</p>
        <router-link to="/about" class="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">Get in Touch</router-link>
      </div>
    </section>
  </div>
</template>