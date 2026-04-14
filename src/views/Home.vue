<template>
  <div class="home-page">
 
    <!-- ─── HERO ─────────────────────────────────────────────── -->
    <section class="hero-section">
      <div class="hero-bg">
        <img
          src="https://pub-c553c44bda3541e4ad5961922b1beaed.r2.dev/images/SolarFarm.jpg"
          alt="Solar field background"
          class="hero-bg-img"
        />
        <div class="hero-overlay"></div>
      </div>
 
      <div class="hero-content w-full max-w-screen-xl mx-auto px-6">
        <div class="hero-badge animate-fade-in-up" style="animation-delay:0.1s">
          Delivering Direct To Your Business
        </div>
        <h1 class="hero-heading animate-fade-in-up" style="animation-delay:0.25s">
          Battery Systems<br>
          <span class="hero-accent">That Save Money<br>for Your Business</span>
        </h1>
        <p class="hero-sub animate-fade-in-up" style="animation-delay:0.45s">
          Supplying top‑quality battery energy storage systems, solar panels and wind turbines
          from trusted global manufacturers.
        </p>
        <div class="hero-actions animate-fade-in-up" style="animation-delay:0.6s">
          <router-link to="/products" class="btn-primary">Explore Products</router-link>
          <router-link to="/quote" class="btn-primary">See how much you could save</router-link>
        </div>
      </div>
 
      <div class="scroll-indicator animate-bounce-slow">
        <div class="scroll-dot"></div>
      </div>
    </section>
 
    <!-- ─── STATS STRIP ────────────────────────────────────────── -->
    <section class="stats-strip">
      <div class="w-full max-w-screen-xl mx-auto px-6 stats-grid">
        <div v-for="stat in stats" :key="stat.label" class="stat-item animate-fade-in-up">
          <span class="stat-icon">{{ stat.icon }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </section>
 
    <!-- ─── WHY CHOOSE US ──────────────────────────────────────── -->
    <section class="features-section">
      <div class="w-full max-w-screen-xl mx-auto px-6">
        <div class="section-header animate-fade-in-up">
          <p class="section-eyebrow">Why choose us</p>
          <h2 class="section-title">Built for the Energy Revolution</h2>
        </div>
 
        <!-- Existing product cards -->
        <div class="features-grid">
          <div
            v-for="(feature, i) in features"
            :key="feature.title"
            class="feature-card animate-fade-in-up"
            :style="`animation-delay:${0.1 * i}s`"
          >
            <div class="feature-icon-wrap">
              <span class="feature-icon">{{ feature.icon }}</span>
            </div>
            <div class="feature-img-wrap">
              <img
                :src="feature.image"
                :alt="feature.title"
                class="feature-img"
              />
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-desc">{{ feature.desc }}</p>
          </div>
        </div>
 
        <!-- Value proposition strip -->
        <div class="value-props-grid">
          <div
            v-for="(prop, i) in valueProps"
            :key="prop.title"
            class="value-prop-card animate-fade-in-up"
            :style="`animation-delay:${0.08 * i}s`"
          >
            <span class="value-prop-icon">{{ prop.icon }}</span>
            <div>
              <p class="value-prop-title">{{ prop.title }}</p>
              <p class="value-prop-desc">{{ prop.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
 
    <!-- ─── SHOWCASE / IMAGE STRIP ─────────────────────────────── -->
    <section class="showcase-section">
      <div class="showcase-track">
        <div
          v-for="(img, i) in showcaseImages"
          :key="i"
          class="showcase-card animate-fade-in-up"
          :style="`animation-delay:${i * 0.1}s`"
        >
          <img :src="img.src" :alt="img.label" class="showcase-img" />
          <div class="showcase-label">{{ img.label }}</div>
        </div>
      </div>
    </section>
 
    <!-- ─── MISSION ────────────────────────────────────────────── -->
    <section class="mission-section">
      <div class="w-full max-w-screen-xl mx-auto px-6 mission-grid">
        <div class="mission-text animate-fade-in-up">
          <p class="section-eyebrow">Our mission</p>
          <h2 class="section-title">Accelerating Clean Energy Adoption</h2>
          <p class="mission-body">
            Every component we supply is carefully tested to meet international standards
            and backed by comprehensive warranties. We work directly with manufacturers
            to cut costs and pass the savings on to you.
          </p>
          <router-link to="/about" class="btn-primary">About Us →</router-link>
        </div>
 
        <div class="mission-img-wrap animate-fade-in-up" style="animation-delay:0.2s">
          <img
            src="https://pub-c553c44bda3541e4ad5961922b1beaed.r2.dev/images/Suzhou.jpg"
            alt="Attain Renewables team or warehouse"
            class="mission-img"
          />
          <div class="mission-img-badge">Est. 2022</div>
        </div>
      </div>
    </section>
 
    <!-- ─── CTA ────────────────────────────────────────────────── -->
    <section class="cta-section">
      <div class="cta-bg">
        <img
          src="https://pub-c553c44bda3541e4ad5961922b1beaed.r2.dev/images/WindFarm.jpg"
          alt="Wind farm"
          class="cta-bg-img"
        />
        <div class="cta-overlay"></div>
      </div>
      <div class="w-full max-w-screen-xl mx-auto px-6 cta-content animate-fade-in-up">
        <h2 class="cta-title">Ready to Make the Switch?</h2>
        <p class="cta-sub">Contact us today for a free consultation and tailored quote.</p>
        <router-link to="/about" class="btn-cta">Get in Touch</router-link>
      </div>
    </section>
 
  </div>
</template>
 
<script setup>
import { onMounted, onUnmounted } from 'vue'
 
// ── Scroll-triggered animations ────────────────────────────────────────────
let observer = null
 
onMounted(() => {
  const els = Array.from(document.querySelectorAll('.animate-fade-in-up'))
 
  const heroSection = document.querySelector('.hero-section')
  els.forEach((el) => {
    if (heroSection && heroSection.contains(el)) {
      el.classList.add('is-visible')
    }
  })
 
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12 }
  )
 
  els.forEach((el) => {
    if (!el.classList.contains('is-visible')) {
      observer.observe(el)
    }
  })
})
 
onUnmounted(() => {
  observer?.disconnect()
})
 
// ── Data ───────────────────────────────────────────────────────────────────
const stats = [
  { icon: '⛽', label: 'Reduce Diesel Consumption'          },
  { icon: '⚡', label: 'Load Shift to Off-Peak Grid Charges' },
  { icon: '☀️', label: 'Utilise Solar Energy'               },
  { icon: '🔄', label: 'Hybrid Systems'                     },
]
 
const features = [
  {
    icon: '🌞',
    title: 'Premium and Custom Solar Panels',
    desc: 'CE/UKCA and MCS solar PV in standard or custom sizes delivered in bulk direct to you from China',
    image: '/SolarPanels.jpg',
  },
  {
    icon: '💨',
    title: 'Mobile Batteries for Site Use',
    desc: 'Rugged, all-in-one batteries for construction, recycling, quarry and mobile uses - typically 30-100kWh',
    image: '/WindTurbine.jpg',
  },
  {
    icon: '🔋',
    title: 'All-in-one BESS for static',
    desc: 'For general commercial and industrial uses where a fixed system isappropriate - typically 200-5000kWh',
    image: '/Batteries.jpg',
  },
]
 
const valueProps = [
  {
    icon: '📞',
    title: 'Accessible & Friendly',
    desc: 'Real people, real advice. Give us a call and speak directly with our team.',
  },
  {
    icon: '💰',
    title: 'Cost Savings & ROI First',
    desc: 'Every recommendation is driven by what delivers measurable returns for your business.',
  },
  {
    icon: '🔓',
    title: 'Manufacturer Independent',
    desc: 'We are not tied to any single brand, so you always get the best-fit product for your needs.',
  },
  {
    icon: '🏗️',
    title: 'Built for Site Work',
    desc: 'Rugged, field-ready products designed for the demands of construction and industrial sites.',
  },
  {
    icon: '📊',
    title: 'Modelling & Efficiency Assessments',
    desc: 'We model your energy profile and assess system efficiency before you commit to a purchase.',
  },
]
 
const showcaseImages = [
  { src: '/RooftopSolar.jpg',   label: 'Rooftop Solar'    },
  { src: '/WindTurbine.jpg',    label: 'Wind Power'       },
  { src: '/Batteries.jpg',      label: 'Batteries'        },
  { src: '/EVChargers.png',     label: 'EV Chargers'      },
  { src: '/SiteLighting.png',   label: 'Site Lighting'    },
  { src: '/SitePower.png',      label: 'Site Power'       },
]
</script>
 
<style scoped>
/* ── Base ───────────────────────────────────────────── */
.home-page { overflow-x: hidden; }
 
/* ── Scroll-triggered animation ─────────────────────── */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0);    }
}
 
.animate-fade-in-up {
  opacity: 0;
  transform: translateY(32px);
}
 
.animate-fade-in-up.is-visible {
  animation: fadeInUp 0.7s ease both;
}
 
/* ── Other animations ───────────────────────────────── */
@keyframes bounceSlow {
  0%, 100% { transform: translateY(0);   }
  50%       { transform: translateY(8px); }
}
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}
 
.animate-bounce-slow { animation: bounceSlow 2s ease-in-out infinite; }
 
/* ── Hero ───────────────────────────────────────────── */
.hero-section {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.hero-bg, .hero-bg-img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
}
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(2,44,22,0.82) 0%, rgba(5,80,40,0.60) 100%);
}
.hero-content {
  position: relative;
  z-index: 2;
  color: white;
  padding-top: 5rem;
  padding-bottom: 5rem;
}
.hero-badge {
  display: inline-block;
  background: rgba(134,239,172,0.2);
  border: 1px solid rgba(134,239,172,0.5);
  color: #86efac;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.4rem 1rem;
  border-radius: 999px;
  margin-bottom: 0.6rem;
}
.hero-heading {
  font-size: clamp(2.2rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.25rem;
  letter-spacing: -0.02em;
}
.hero-accent {
  background: linear-gradient(90deg, #4ade80, #86efac, #4ade80);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s linear infinite;
}
.hero-sub {
  font-size: 1.15rem;
  color: #d1fae5;
  max-width: 540px;
  margin-bottom: 2.25rem;
  line-height: 1.7;
}
.hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
 
/* ── Buttons ────────────────────────────────────────── */
.btn-primary {
  display: inline-block;
  background: #16a34a;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 20px rgba(22,163,74,0.35);
}
.btn-primary:hover {
  background: #15803d;
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(22,163,74,0.45);
}
 
/* ── Scroll indicator ───────────────────────────────── */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 28px; height: 44px;
  border: 2px solid rgba(255,255,255,0.4);
  border-radius: 999px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 6px;
}
.scroll-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: white;
  animation: bounceSlow 1.6s ease-in-out infinite;
}
 
/* ── Stats strip ────────────────────────────────────── */
.stats-strip {
  background: #14532d;
  color: white;
  padding: 4rem 0;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2.5rem;
  text-align: center;
}
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}
.stat-icon {
  font-size: 3.5rem;
  line-height: 1;
}
.stat-label {
  display: block;
  font-size: 1.05rem;
  font-weight: 700;
  color: #d1fae5;
  line-height: 1.35;
  letter-spacing: 0.01em;
  max-width: 180px;
}
 
/* ── Section typography ─────────────────────────────── */
.section-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.75rem;
  color: #16a34a;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.section-title {
  font-size: clamp(1.6rem, 3vw, 2.5rem);
  font-weight: 800;
  color: #1a3a2a;
  line-height: 1.2;
  letter-spacing: -0.02em;
}
.section-header {
  text-align: center;
  margin-bottom: 3.5rem;
}
 
/* ── Features ───────────────────────────────────────── */
.features-section { padding: 6rem 0; background: #f0fdf4; }
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}
.feature-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,80,40,0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}
.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0,80,40,0.14);
}
.feature-img-wrap { overflow: hidden; height: 180px; }
.feature-img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.feature-card:hover .feature-img { transform: scale(1.06); }
.feature-icon-wrap {
  padding: 1.25rem 1.25rem 0;
}
.feature-icon { font-size: 2rem; }
.feature-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #14532d;
  margin: 0.9rem 1.25rem 0.5rem;
}
.feature-desc {
  font-size: 0.92rem;
  color: #4b5563;
  line-height: 1.65;
  padding: 0 1.25rem 1.5rem;
}
 
/* ── Value proposition strip ────────────────────────── */
.value-props-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.25rem;
  border-top: 2px solid #dcfce7;
  padding-top: 3rem;
}
.value-prop-card {
  display: grid;
   gap: 1rem;
  background: white;
  border-radius: 14px;
  padding: 1.4rem 1.5rem;
  box-shadow: 0 1px 8px rgba(0,80,40,0.06);
  border: 1px solid #f0fdf4;
  transition: transform 0.25s, box-shadow 0.25s;
}
.value-prop-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,80,40,0.1);
}
.value-prop-icon {
  font-size: 1.8rem;
  flex-shrink: 0;
  line-height: 1;
  margin-top: 0.1rem;
}
.value-prop-title {
  font-size: 0.97rem;
  font-weight: 700;
  color: #14532d;
  margin-bottom: 0.3rem;
}
.value-prop-desc {
  font-size: 0.85rem;
  color: #6b7280;
  line-height: 1.55;
}
 
/* ── Showcase strip ─────────────────────────────────── */
.showcase-section {
  padding: 4rem 0;
  background: white;
  overflow: hidden;
}
.showcase-track {
  display: flex;
  flex-wrap: nowrap;
  gap: 1.5rem;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0 1.5rem 1rem;
  scrollbar-width: thin;
  scrollbar-color: #86efac #f0fdf4;
  scroll-snap-type: x mandatory;
  height: 240px;
}
.showcase-card {
  height: 210px;
  flex: 0 0 320px;
  border-radius: 14px;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
  scroll-snap-align: start;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  transition: transform 0.3s;
}
.showcase-card:hover { transform: scale(1.025); }
.showcase-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.showcase-label {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  background: linear-gradient(transparent, rgba(5,46,22,0.82));
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 1.5rem 1rem 0.9rem;
}
 
/* ── Mission ────────────────────────────────────────── */
.mission-section { padding: 6rem 0; background: #f0fdf4; }
.mission-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}
@media (max-width: 768px) { .mission-grid { grid-template-columns: 1fr; } }
.mission-body {
  color: #374151;
  line-height: 1.75;
  margin: 1.25rem 0 2rem;
  font-size: 1.02rem;
}
.mission-img-wrap {
  position: relative;
  border-radius: 20px;
  overflow: visible;
}
.mission-img {
  width: 100%;
  border-radius: 20px;
  display: block;
  box-shadow: 0 20px 50px rgba(0,60,30,0.18);
  transition: transform 0.4s;
}
.mission-img-wrap:hover .mission-img { transform: scale(1.02); }
.mission-img-badge {
  position: absolute;
  bottom: -1rem;
  right: -1rem;
  background: #16a34a;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  padding: 0.8rem 1.4rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(22,163,74,0.35);
}
 
/* ── CTA ─────────────────────────────────────────────── */
.cta-section {
  position: relative;
  padding: 7rem 0;
  overflow: hidden;
}
.cta-bg, .cta-bg-img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
}
.cta-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(2,44,22,0.88) 0%, rgba(6,78,59,0.75) 100%);
}
.cta-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
}
.cta-title {
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}
.cta-sub {
  font-size: 1.1rem;
  color: #d1fae5;
  margin-bottom: 2rem;
}
.btn-cta {
  display: inline-block;
  background: white;
  color: #14532d;
  padding: 0.9rem 2.5rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}
.btn-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.25);
}
</style>