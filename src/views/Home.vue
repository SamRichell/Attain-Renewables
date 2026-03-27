<template>
  <!--
    overflow-x-hidden is important here. Because cards start with a
    translateY or translateX offset before they animate in, they can
    momentarily extend outside the page boundary, causing a horizontal
    scrollbar to flash. This clips them invisibly.
  -->
  <div class="overflow-x-hidden">
 
    <!-- ═══════════════════════════════════════════
         1. HERO
         No observer needed — this is always visible on load.
    ════════════════════════════════════════════ -->
    <section class="relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 text-white min-h-[92vh] flex items-center">
      <!-- Decorative background blobs — pure CSS, no images needed -->
      <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-400/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
 
      <div class="container mx-auto px-6 py-24 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8 text-sm font-medium">
            <span class="w-2 h-2 bg-emerald-400 rounded-full"></span>
            Trusted UK Renewable Energy Importer
          </div>
 
          <h1 class="text-5xl md:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight">
            Powering the Future<br>
            <span class="text-emerald-300">with Clean Energy</span>
          </h1>
          <p class="text-xl md:text-2xl text-green-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Premium solar panels, wind turbines, and battery storage —
            sourced globally, delivered to your door.
          </p>
 
          <div class="flex flex-wrap gap-4 justify-center">
            <router-link
              to="/products"
              class="bg-white text-green-800 px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-200"
            >
              Browse Products
            </router-link>
            <router-link
              to="/about"
              class="border-2 border-white/50 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 hover:border-white transition-all duration-200"
            >
              Learn More
            </router-link>
          </div>
 
          <!-- Scroll nudge -->
          <div class="mt-24 flex flex-col items-center gap-2 text-white/40 text-xs tracking-widest uppercase">
            <span>Scroll to explore</span>
            <div class="w-px h-10 bg-gradient-to-b from-white/30 to-transparent mt-1"></div>
          </div>
        </div>
      </div>
    </section>
 
 
    <!-- ═══════════════════════════════════════════
         2. STATS BAR
         Four headline numbers that stagger in left-to-right.
    ════════════════════════════════════════════ -->
    <section ref="statsRef" class="py-16 bg-white border-b border-gray-100">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          <!--
            How the stagger works:
            - All four cards start invisible (opacity-0) and shifted down (translate-y-8).
            - When `statsVisible` becomes true (triggered by IntersectionObserver),
              all four cards simultaneously get opacity-100 and translate-y-0.
            - But each card has a different transition-delay (0ms, 120ms, 240ms, 360ms).
            - So even though the state change is simultaneous, the CSS transitions
              start at different times, creating the cascade effect.
            - The transition completes at its own pace — scroll speed is irrelevant.
          -->
          <div
            v-for="(stat, i) in stats"
            :key="stat.label"
            class="transition-all duration-700 ease-out"
            :class="statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            :style="{ transitionDelay: statsVisible ? `${i * 120}ms` : '0ms' }"
          >
            <div class="text-5xl font-black text-green-600 mb-2">{{ stat.value }}</div>
            <div class="text-gray-500 font-medium text-sm">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>
 
 
    <!-- ═══════════════════════════════════════════
         3. FEATURE CARDS
         Six capability cards cascading in with increasing delays.
    ════════════════════════════════════════════ -->
    <section ref="featuresRef" class="py-24 bg-gray-50">
      <div class="container mx-auto px-6">
        <!-- Section heading fades in first -->
        <div
          class="text-center mb-16 transition-all duration-700"
          :class="featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
        >
          <h2 class="text-4xl font-bold mb-4">Why Choose Attain Renewables?</h2>
          <p class="text-gray-600 text-lg max-w-xl mx-auto">
            Everything you need for a seamless switch to clean energy, under one roof.
          </p>
        </div>
 
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!--
            Cards 0–5 are delayed by 100ms each on top of a base 150ms delay
            (to let the heading settle first). So card timings are:
            150ms, 250ms, 350ms, 450ms, 550ms, 650ms.
          -->
          <div
            v-for="(feature, i) in features"
            :key="feature.title"
            class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-500"
            :class="featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
            :style="{ transitionDelay: featuresVisible ? `${i * 100 + 150}ms` : '0ms' }"
          >
            <div class="text-4xl mb-4">{{ feature.icon }}</div>
            <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600 leading-relaxed text-sm">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>
 
 
    <!-- ═══════════════════════════════════════════
         4. HOW IT WORKS
         Four numbered steps rise up sequentially.
    ════════════════════════════════════════════ -->
    <section ref="processRef" class="py-24 bg-white">
      <div class="container mx-auto px-6">
        <div
          class="text-center mb-16 transition-all duration-700"
          :class="processVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
        >
          <h2 class="text-4xl font-bold mb-4">How It Works</h2>
          <p class="text-gray-600 text-lg">From first enquiry to clean energy in four steps</p>
        </div>
 
        <div class="grid md:grid-cols-4 gap-8 relative">
          <!-- Connecting line (desktop only) -->
          <div class="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-green-100 z-0"></div>
 
          <div
            v-for="(step, i) in steps"
            :key="step.title"
            class="relative z-10 text-center transition-all duration-700 ease-out"
            :class="processVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'"
            :style="{ transitionDelay: processVisible ? `${i * 160}ms` : '0ms' }"
          >
            <div class="w-16 h-16 bg-green-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-5 shadow-md shadow-green-200">
              {{ i + 1 }}
            </div>
            <h3 class="text-lg font-semibold mb-2">{{ step.title }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>
 
 
    <!-- ═══════════════════════════════════════════
         5. PRODUCT CATEGORY CARDS
         Three large cards scale up from slightly smaller (scale-95 → scale-100).
         This gives a "pop" feeling rather than a slide.
    ════════════════════════════════════════════ -->
    <section ref="productsRef" class="py-24 bg-gradient-to-br from-green-900 to-emerald-800 text-white">
      <div class="container mx-auto px-6">
        <div
          class="text-center mb-16 transition-all duration-700"
          :class="productsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
        >
          <h2 class="text-4xl font-bold mb-4">Our Product Range</h2>
          <p class="text-green-300 text-lg">Three pillars of the renewable energy system, expertly sourced</p>
        </div>
 
        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="(productType, i) in productTypes"
            :key="productType.name"
            class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 group hover:bg-white/20 cursor-default transition-all duration-500"
            :class="productsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
            :style="{ transitionDelay: productsVisible ? `${i * 200}ms` : '0ms' }"
          >
            <div class="text-6xl mb-6">{{ productType.icon }}</div>
            <h3 class="text-2xl font-bold mb-3">{{ productType.name }}</h3>
            <p class="text-green-200 leading-relaxed mb-6 text-sm">{{ productType.description }}</p>
            <ul class="space-y-2 mb-8">
              <li
                v-for="point in productType.points"
                :key="point"
                class="flex items-start gap-2 text-sm text-green-300"
              >
                <span class="text-emerald-400 mt-0.5 shrink-0">✓</span>
                {{ point }}
              </li>
            </ul>
            <router-link
              to="/products"
              class="inline-flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-4 transition-all duration-300"
            >
              View Products <span>→</span>
            </router-link>
          </div>
        </div>
      </div>
    </section>
 
 
    <!-- ═══════════════════════════════════════════
         6. CERTIFICATIONS / TRUST BAR
         Simple icons that pop in with a bounce-like feel (achieved with
         a short, slightly springy transition easing).
    ════════════════════════════════════════════ -->
    <section ref="trustRef" class="py-20 bg-gray-50 border-t border-gray-100">
      <div class="container mx-auto px-6">
        <div
          class="text-center mb-12 transition-all duration-700"
          :class="trustVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
        >
          <h2 class="text-3xl font-bold mb-3">Backed by Industry Standards</h2>
          <p class="text-gray-600">Every product we stock meets or exceeds these certifications</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="(cert, i) in certifications"
            :key="cert.name"
            class="bg-white rounded-xl p-6 text-center border border-gray-100 shadow-sm transition-all duration-500"
            :class="trustVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
            :style="{ transitionDelay: trustVisible ? `${i * 100}ms` : '0ms' }"
          >
            <div class="text-4xl mb-3">{{ cert.icon }}</div>
            <div class="font-semibold text-gray-800 text-sm">{{ cert.name }}</div>
            <div class="text-xs text-gray-500 mt-1">{{ cert.detail }}</div>
          </div>
        </div>
      </div>
    </section>
 
 
    <!-- ═══════════════════════════════════════════
         7. LATEST BLOG POSTS
         Three post cards stagger in like the feature cards.
    ════════════════════════════════════════════ -->
    <section ref="blogRef" class="py-24 bg-white">
      <div class="container mx-auto px-6">
        <div
          class="flex flex-wrap justify-between items-end mb-16 gap-4 transition-all duration-700"
          :class="blogVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
        >
          <div>
            <h2 class="text-4xl font-bold mb-2">Latest Insights</h2>
            <p class="text-gray-600">Stay informed on renewable energy trends and technology</p>
          </div>
          <router-link to="/blog" class="text-green-600 font-medium hover:underline text-sm">
            View all posts →
          </router-link>
        </div>
 
        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="(post, i) in recentPosts"
            :key="post.id"
            class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-500"
            :class="blogVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
            :style="{ transitionDelay: blogVisible ? `${i * 150 + 100}ms` : '0ms' }"
          >
            <img :src="post.image" :alt="post.title" class="w-full h-48 object-cover">
            <div class="p-6">
              <p class="text-xs text-gray-400 uppercase tracking-wider mb-2">{{ post.date }}</p>
              <h3 class="font-semibold text-lg mb-2 leading-snug">{{ post.title }}</h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ post.excerpt }}</p>
              <router-link :to="`/blog/${post.slug}`" class="text-green-600 text-sm font-medium hover:underline">
                Read more →
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
 
 
    <!-- ═══════════════════════════════════════════
         8. CALL TO ACTION
         Full-width card that fades up last.
    ════════════════════════════════════════════ -->
    <section ref="ctaRef" class="py-24 bg-gray-50">
      <div class="container mx-auto px-6 max-w-4xl">
        <div
          class="bg-gradient-to-br from-green-700 to-emerald-600 rounded-3xl p-16 text-white text-center shadow-2xl shadow-green-900/20 transition-all duration-700"
          :class="ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
        >
          <h2 class="text-4xl font-bold mb-4">Ready to Make the Switch?</h2>
          <p class="text-xl text-green-100 mb-10 max-w-xl mx-auto">
            Get in touch today for a free consultation and a personalised equipment quote.
          </p>
          <router-link
            to="/about"
            class="inline-block bg-white text-green-700 px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-50 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
          >
            Get in Touch
          </router-link>
        </div>
      </div>
    </section>
 
  </div>
</template>
 
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import postsData from '../data/posts.json'
 
/*
  ─────────────────────────────────────────────────────────────────
  SECTION REFS
  Each `ref(null)` is paired with the `ref="..."` attribute on a
  <section> element in the template. Vue fills these in at mount time,
  giving us real DOM nodes to hand to IntersectionObserver.
  ─────────────────────────────────────────────────────────────────
*/
const statsRef    = ref<HTMLElement | null>(null)
const featuresRef = ref<HTMLElement | null>(null)
const processRef  = ref<HTMLElement | null>(null)
const productsRef = ref<HTMLElement | null>(null)
const trustRef    = ref<HTMLElement | null>(null)
const blogRef     = ref<HTMLElement | null>(null)
const ctaRef      = ref<HTMLElement | null>(null)
 
/*
  ─────────────────────────────────────────────────────────────────
  VISIBILITY FLAGS
  These start as false. When IntersectionObserver detects a section
  entering the viewport, we flip the flag to true. Vue reactivity
  then updates the :class bindings on all child elements, triggering
  their CSS transitions simultaneously (staggered by transition-delay).
  ─────────────────────────────────────────────────────────────────
*/
const statsVisible    = ref(false)
const featuresVisible = ref(false)
const processVisible  = ref(false)
const productsVisible = ref(false)
const trustVisible    = ref(false)
const blogVisible     = ref(false)
const ctaVisible      = ref(false)
 
/*
  ─────────────────────────────────────────────────────────────────
  OBSERVER FACTORY
  Creates a single IntersectionObserver that:
    1. Fires when `threshold` fraction of the element is visible
       (0.15 = 15% of the section must be on screen)
    2. Sets the visibility flag to true (triggering CSS transitions)
    3. Immediately disconnects itself — so the animation only ever
       fires once, even if the user scrolls back up and down again.
 
  Why not one shared observer?
  Each element needs its own callback reference (its own visibility flag),
  so it's simpler and clearer to create one observer per section.
  The performance difference is negligible — IntersectionObserver is
  extremely lightweight and all observers are disconnected after firing.
  ─────────────────────────────────────────────────────────────────
*/
function createObserver(
  target: HTMLElement | null,
  flag: { value: boolean },
  threshold = 0.15
) {
  if (!target) return
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        flag.value = true
        observer.disconnect()
      }
    },
    { threshold }
  )
  observer.observe(target)
}
 
/*
  onMounted is the correct Vue 3 lifecycle hook for DOM access.
  The template refs (statsRef, etc.) are only populated after Vue
  has rendered the component and attached it to the real DOM.
  Trying to observe before this point would get null.
*/
onMounted(() => {
  createObserver(statsRef.value,    statsVisible)
  createObserver(featuresRef.value, featuresVisible)
  createObserver(processRef.value,  processVisible)
  createObserver(productsRef.value, productsVisible)
  createObserver(trustRef.value,    trustVisible)
  createObserver(blogRef.value,     blogVisible)
  createObserver(ctaRef.value,      ctaVisible, 0.2)
})
 
// Only show 3 posts on the home page preview.
// All posts are already loaded from the JSON, so .slice() is instant.
const recentPosts = postsData.slice(0, 3)
 
// ─── Static data ────────────────────────────────────────────────
 
const stats = [
  { value: '500+', label: 'Systems Delivered' },
  { value: '12',   label: 'Countries Served'  },
  { value: '98%',  label: 'Client Satisfaction' },
  { value: '5yr+', label: 'Average Warranty'  },
]
 
const features = [
  {
    icon: '🌍',
    title: 'Global Sourcing',
    description: 'We partner with certified manufacturers across Europe, Asia, and North America to give you access to the world\'s best renewable equipment.',
  },
  {
    icon: '✅',
    title: 'Quality Assured',
    description: 'Every product passes rigorous third-party quality checks and meets international certification standards before it reaches you.',
  },
  {
    icon: '💰',
    title: 'Competitive Pricing',
    description: 'Direct manufacturer relationships cut out the middleman, passing substantial savings on to our customers.',
  },
  {
    icon: '🛠️',
    title: 'Expert Guidance',
    description: 'Our team of renewable energy specialists advises you at every stage, from product selection through to post-installation support.',
  },
  {
    icon: '📦',
    title: 'Reliable Logistics',
    description: 'Efficient freight, warehousing, and last-mile delivery across the UK and Europe — with full tracking at every step.',
  },
  {
    icon: '🔒',
    title: 'Warranty Backed',
    description: 'Comprehensive manufacturer warranties on all products, with our team ready to manage any claims on your behalf.',
  },
]
 
const steps = [
  {
    title: 'Get in Touch',
    description: 'Tell us about your project — energy requirements, site type, and timeline.',
  },
  {
    title: 'Expert Consultation',
    description: 'We assess your needs and recommend the most cost-effective products for your site.',
  },
  {
    title: 'Order & Ship',
    description: 'We manage procurement, quality checks, and logistics directly to your location.',
  },
  {
    title: 'Install & Generate',
    description: 'Work with your installer to commission the system and start producing clean energy.',
  },
]
 
const productTypes = [
  {
    icon: '☀️',
    name: 'Solar Panels',
    description: 'High-efficiency monocrystalline and bifacial panels for residential rooftops, commercial installations, and ground-mount arrays.',
    points: [
      'Up to 22% conversion efficiency',
      'Mono & bifacial options',
      '25-year performance warranty',
      'MCS & IEC certified',
    ],
  },
  {
    icon: '💨',
    name: 'Wind Turbines',
    description: 'Horizontal and vertical axis turbines scaled from compact urban units to heavy-duty commercial machines for farms and industry.',
    points: [
      '1 kW to 500 kW output range',
      'Low-noise, bird-safe designs',
      'Suitable for urban and rural sites',
      'Proven in UK wind conditions',
    ],
  },
  {
    icon: '🔋',
    name: 'Battery Storage',
    description: 'Lithium-iron-phosphate (LFP) storage systems that maximise self-consumption, cut grid reliance, and provide backup power.',
    points: [
      'Modular — scalable to 100 kWh',
      '10-year cell warranty',
      'Smart monitoring via app',
      'Compatible with all major inverters',
    ],
  },
]
 
const certifications = [
  { icon: '🏅', name: 'MCS Certified',   detail: 'UK Microgeneration Scheme' },
  { icon: '🇪🇺', name: 'CE Marked',       detail: 'European Conformity' },
  { icon: '⚡', name: 'IEC 61215',        detail: 'Solar PV Standard' },
  { icon: '🌿', name: 'ISO 14001',        detail: 'Environmental Management' },
]
</script>