<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30">
 
    <!-- Hero -->
    <div class="bg-gradient-to-br from-green-900 to-emerald-800 text-white py-16">
      <div class="container mx-auto px-6 text-center">
        <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-6 text-sm font-medium">
          <span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          Free, no-obligation estimate
        </div>
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Get Your Quote Estimate</h1>
        <p class="text-lg text-green-200 max-w-xl mx-auto">
          Tell us about your energy needs and receive an instant hardware cost estimate.
        </p>
      </div>
    </div>
 
    <div class="container mx-auto px-6 py-12 max-w-2xl">
 
      <!-- Step indicator -->
      <div class="flex items-center justify-center mb-10">
        <div v-for="(label, i) in stepLabels" :key="label" class="flex items-center">
          <div class="flex flex-col items-center">
            <div
              class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300"
              :class="i + 1 < currentStep
                ? 'bg-green-600 border-green-600 text-white'
                : i + 1 === currentStep
                  ? 'bg-white border-green-600 text-green-600'
                  : 'bg-white border-gray-200 text-gray-400'"
            >
              <span v-if="i + 1 < currentStep">✓</span>
              <span v-else>{{ i + 1 }}</span>
            </div>
            <span
              class="text-xs mt-1 font-medium whitespace-nowrap"
              :class="i + 1 === currentStep ? 'text-green-700' : 'text-gray-400'"
            >{{ label }}</span>
          </div>
          <div
            v-if="i < stepLabels.length - 1"
            class="w-12 h-0.5 mx-1 mb-4 transition-colors duration-300"
            :class="i + 1 < currentStep ? 'bg-green-500' : 'bg-gray-200'"
          ></div>
        </div>
      </div>
 
      <!-- ── STEP 1: Contact Details ── -->
      <div v-if="currentStep === 1" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 class="text-2xl font-bold mb-1">Your Contact Details</h2>
        <p class="text-gray-500 mb-8">We'll use these to send you your estimate and follow up.</p>
 
        <div class="space-y-5">
 
          <!-- Full name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name <span class="text-red-400">*</span>
            </label>
            <input
              v-model="contact.name"
              type="text"
              placeholder="Jane Smith"
              class="w-full border rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              :class="errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'"
            />
            <p v-if="errors.name" class="text-red-500 text-xs mt-1.5">{{ errors.name }}</p>
          </div>
 
          <!-- Phone + country code -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">
              Phone Number <span class="text-red-400">*</span>
            </label>
            <div class="flex gap-2">
              <select
                v-model="contact.countryCode"
                class="border border-gray-200 rounded-xl px-3 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white text-sm"
                style="min-width: 120px; max-width: 130px;"
              >
                <option v-for="c in countryCodes" :key="c.code" :value="c.code">
                  {{ c.flag }} {{ c.code }}
                </option>
              </select>
              <input
                v-model="contact.phone"
                type="tel"
                placeholder="7700 900000"
                class="flex-1 border rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                :class="errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'"
              />
            </div>
            <p v-if="errors.phone" class="text-red-500 text-xs mt-1.5">{{ errors.phone }}</p>
          </div>
 
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address <span class="text-red-400">*</span>
            </label>
            <input
              v-model="contact.email"
              type="email"
              placeholder="jane@example.com"
              class="w-full border rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              :class="errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'"
              @keyup.enter="nextStep"
            />
            <p v-if="errors.email" class="text-red-500 text-xs mt-1.5">{{ errors.email }}</p>
          </div>
 
          <button
            @click="nextStep"
            class="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 active:scale-[0.99] transition-all duration-150 shadow-md shadow-green-200"
          >
            Continue →
          </button>
        </div>
      </div>
 
      <!-- ── STEP 2: System Requirements ── -->
      <div v-else-if="currentStep === 2" class="space-y-5">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 class="text-2xl font-bold mb-1">System Requirements</h2>
          <p class="text-gray-500 mb-8">Help us understand your energy needs.</p>
 
          <div class="space-y-6">
 
            <!-- Peak power -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">
                Peak Power Required (kW) <span class="text-red-400">*</span>
              </label>
              <input
                v-model.number="system.peakPower"
                type="number" min="0.1" step="0.1" placeholder="e.g. 10"
                class="w-full border rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                :class="errors.peakPower ? 'border-red-300 bg-red-50' : 'border-gray-200'"
              />
              <p class="text-xs text-gray-400 mt-1">Maximum power demand at any one time</p>
              <p v-if="errors.peakPower" class="text-red-500 text-xs mt-1">{{ errors.peakPower }}</p>
            </div>
 
            <!-- Normal load -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">
                Normal Load (kW) <span class="text-red-400">*</span>
              </label>
              <input
                v-model.number="system.normalLoad"
                type="number" min="0.1" step="0.1" placeholder="e.g. 5"
                class="w-full border rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                :class="errors.normalLoad ? 'border-red-300 bg-red-50' : 'border-gray-200'"
              />
              <p class="text-xs text-gray-400 mt-1">Typical continuous power consumption (must be ≤ peak power)</p>
              <p v-if="errors.normalLoad" class="text-red-500 text-xs mt-1">{{ errors.normalLoad }}</p>
            </div>
 
            <!-- Hours per day -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">
                Daily Hours of Operation (h) <span class="text-red-400">*</span>
              </label>
              <input
                v-model.number="system.hoursPerDay"
                type="number" min="1" max="24" step="1" placeholder="e.g. 8"
                class="w-full border rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                :class="errors.hoursPerDay ? 'border-red-300 bg-red-50' : 'border-gray-200'"
              />
              <p class="text-xs text-gray-400 mt-1">How many hours per day will the system operate? (1–24)</p>
              <p v-if="errors.hoursPerDay" class="text-red-500 text-xs mt-1">{{ errors.hoursPerDay }}</p>
            </div>
 
            <!-- Solar yes/no -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">
                Include Solar Generation? <span class="text-red-400">*</span>
              </label>
              <div class="grid grid-cols-2 gap-3">
                <button
                  @click="system.hasSolar = 'yes'"
                  class="relative p-5 rounded-xl border-2 text-left transition-all duration-200"
                  :class="system.hasSolar === 'yes' ? 'border-green-500 bg-green-50' : 'border-gray-100 hover:border-green-200 hover:bg-gray-50'"
                >
                  <div class="text-3xl mb-2">☀️</div>
                  <div class="font-semibold text-gray-800">Yes</div>
                  <div class="text-xs text-gray-500 mt-0.5">Include solar panels</div>
                  <div v-if="system.hasSolar === 'yes'" class="absolute top-2.5 right-2.5 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</div>
                </button>
                <button
                  @click="system.hasSolar = 'no'; system.solarKwp = null"
                  class="relative p-5 rounded-xl border-2 text-left transition-all duration-200"
                  :class="system.hasSolar === 'no' ? 'border-green-500 bg-green-50' : 'border-gray-100 hover:border-green-200 hover:bg-gray-50'"
                >
                  <div class="text-3xl mb-2">🔋</div>
                  <div class="font-semibold text-gray-800">No</div>
                  <div class="text-xs text-gray-500 mt-0.5">Storage / grid only</div>
                  <div v-if="system.hasSolar === 'no'" class="absolute top-2.5 right-2.5 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">✓</div>
                </button>
              </div>
              <p v-if="errors.hasSolar" class="text-red-500 text-xs mt-1.5">{{ errors.hasSolar }}</p>
            </div>
 
            <!-- Solar kWp (conditional) -->
            <div v-if="system.hasSolar === 'yes'">
              <label class="block text-sm font-medium text-gray-700 mb-1.5">
                Solar Array Size (kWp) <span class="text-red-400">*</span>
              </label>
              <input
                v-model.number="system.solarKwp"
                type="number" min="0.1" step="0.1" placeholder="e.g. 10"
                class="w-full border rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                :class="errors.solarKwp ? 'border-red-300 bg-red-50' : 'border-gray-200'"
              />
              <p class="text-xs text-gray-400 mt-1">Peak output capacity of your solar array</p>
              <p v-if="errors.solarKwp" class="text-red-500 text-xs mt-1">{{ errors.solarKwp }}</p>
            </div>
 
          </div>
        </div>
 
        <div class="flex justify-between">
          <button @click="currentStep--" class="text-gray-400 hover:text-gray-600 font-medium transition">← Back</button>
          <button @click="nextStep" class="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition">
            See Estimate →
          </button>
        </div>
      </div>
 
      <!-- ── STEP 3: Results ── -->
      <div v-else-if="currentStep === 3" class="space-y-6">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
 
          <div class="text-center mb-8">
            <div class="text-5xl mb-3">🎉</div>
            <h2 class="text-2xl font-bold mb-1">Your Hardware Estimate</h2>
            <p class="text-gray-500 text-sm">Prepared for {{ contact.name }} · {{ contact.countryCode }} {{ contact.phone }}</p>
          </div>
 
          <!-- Estimate breakdown -->
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-6 mb-6">
            <div class="space-y-3 mb-5">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Peak Power</span>
                <span class="font-semibold text-gray-800">{{ system.peakPower }} kW</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Normal Load</span>
                <span class="font-semibold text-gray-800">{{ system.normalLoad }} kW</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Daily Operation</span>
                <span class="font-semibold text-gray-800">{{ system.hoursPerDay }} h/day</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">System Type</span>
                <span class="font-semibold text-gray-800">{{ system.hasSolar === 'yes' ? 'Solar + Storage' : 'Storage / Grid Only' }}</span>
              </div>
              <div v-if="system.hasSolar === 'yes'" class="flex justify-between text-sm">
                <span class="text-gray-600">Solar Array</span>
                <span class="font-semibold text-gray-800">{{ system.solarKwp }} kWp</span>
              </div>
              <div v-if="system.hasSolar === 'yes'" class="flex justify-between text-sm border-t border-green-100 pt-3">
                <span class="text-gray-500 italic text-xs">Solar hardware component</span>
                <span class="text-gray-600 text-xs">{{ estimate.solarLabel }}</span>
              </div>
            </div>
 
            <div class="border-t-2 border-green-200 pt-4 flex justify-between items-center">
              <span class="text-lg font-bold text-green-900">Estimated Hardware Total</span>
              <span class="text-2xl font-black text-green-700">{{ estimate.label }}</span>
            </div>
          </div>
 
          <!-- Disclaimer -->
          <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <p class="text-sm text-amber-800 leading-relaxed">
              ⚠️ <strong>Hardware cost only.</strong> {{ pricing.disclaimer }}
            </p>
          </div>
 
          <!-- Email placeholder -->
          <button
            disabled
            class="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-150 shadow-md shadow-green-200 opacity-60 cursor-not-allowed"
          >
            📧 Email this estimate to {{ contact.email }} <span class="text-sm font-normal">(coming soon)</span>
          </button>
 
        </div>
 
        <!-- Quick links -->
        <div class="grid grid-cols-2 gap-4">
          <router-link to="/products"
            class="block bg-white rounded-xl border border-gray-100 p-5 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div class="text-2xl mb-2">🛒</div>
            <p class="font-semibold text-gray-800 text-sm">Browse Products</p>
            <p class="text-gray-400 text-xs mt-0.5">See full catalogue</p>
          </router-link>
          <router-link to="/about"
            class="block bg-white rounded-xl border border-gray-100 p-5 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div class="text-2xl mb-2">💬</div>
            <p class="font-semibold text-gray-800 text-sm">Contact Us</p>
            <p class="text-gray-400 text-xs mt-0.5">Get a full project quote</p>
          </router-link>
        </div>
 
        <button @click="startOver" class="w-full text-gray-400 hover:text-gray-600 text-sm transition py-2">
          ← Start a new estimate
        </button>
      </div>
 
    </div>
  </div>
</template>
 
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import pricing from '../data/pricingBands.json'
 
// ── Steps ──────────────────────────────────────────────────────────────────
const stepLabels = ['Contact Details', 'System Requirements', 'Your Estimate']
const currentStep = ref(1)
 
// ── Country codes ──────────────────────────────────────────────────────────
const countryCodes = [
  { code: '+1',   flag: '🇺🇸' }, { code: '+7',   flag: '🇷🇺' },
  { code: '+20',  flag: '🇪🇬' }, { code: '+27',  flag: '🇿🇦' },
  { code: '+30',  flag: '🇬🇷' }, { code: '+31',  flag: '🇳🇱' },
  { code: '+32',  flag: '🇧🇪' }, { code: '+33',  flag: '🇫🇷' },
  { code: '+34',  flag: '🇪🇸' }, { code: '+39',  flag: '🇮🇹' },
  { code: '+40',  flag: '🇷🇴' }, { code: '+41',  flag: '🇨🇭' },
  { code: '+43',  flag: '🇦🇹' }, { code: '+44',  flag: '🇬🇧' },
  { code: '+45',  flag: '🇩🇰' }, { code: '+46',  flag: '🇸🇪' },
  { code: '+47',  flag: '🇳🇴' }, { code: '+48',  flag: '🇵🇱' },
  { code: '+49',  flag: '🇩🇪' }, { code: '+52',  flag: '🇲🇽' },
  { code: '+55',  flag: '🇧🇷' }, { code: '+61',  flag: '🇦🇺' },
  { code: '+63',  flag: '🇵🇭' }, { code: '+64',  flag: '🇳🇿' },
  { code: '+65',  flag: '🇸🇬' }, { code: '+81',  flag: '🇯🇵' },
  { code: '+82',  flag: '🇰🇷' }, { code: '+86',  flag: '🇨🇳' },
  { code: '+90',  flag: '🇹🇷' }, { code: '+91',  flag: '🇮🇳' },
  { code: '+92',  flag: '🇵🇰' }, { code: '+212', flag: '🇲🇦' },
  { code: '+234', flag: '🇳🇬' }, { code: '+254', flag: '🇰🇪' },
  { code: '+351', flag: '🇵🇹' }, { code: '+353', flag: '🇮🇪' },
  { code: '+380', flag: '🇺🇦' }, { code: '+420', flag: '🇨🇿' },
  { code: '+971', flag: '🇦🇪' }, { code: '+972', flag: '🇮🇱' },
]
 
// ── Form state ─────────────────────────────────────────────────────────────
const contact = reactive({ name: '', countryCode: '+44', phone: '', email: '' })
const system  = reactive({
  peakPower:  null as number | null,
  normalLoad: null as number | null,
  hoursPerDay: null as number | null,
  hasSolar:   '' as 'yes' | 'no' | '',
  solarKwp:   null as number | null,
})
const errors = reactive<Record<string, string>>({})
 
// ── Validation ─────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^\d{7,15}$/
 
function clearErrors() {
  Object.keys(errors).forEach(k => delete errors[k])
}
 
function validateStep1(): boolean {
  clearErrors()
  if (!contact.name.trim() || contact.name.trim().length < 2)
    errors.name = 'Please enter your full name (at least 2 characters).'
  const cleanPhone = contact.phone.replace(/[\s\-().]/g, '')
  if (!cleanPhone || !PHONE_RE.test(cleanPhone))
    errors.phone = 'Please enter a valid phone number (7–15 digits, no country code).'
  if (!contact.email || !EMAIL_RE.test(contact.email))
    errors.email = 'Please enter a valid email address.'
  return Object.keys(errors).length === 0
}
 
function validateStep2(): boolean {
  clearErrors()
  if (!system.peakPower || system.peakPower <= 0)
    errors.peakPower = 'Please enter a valid peak power greater than 0.'
  if (!system.normalLoad || system.normalLoad <= 0)
    errors.normalLoad = 'Please enter a valid normal load greater than 0.'
  else if (system.peakPower && system.normalLoad > system.peakPower)
    errors.normalLoad = 'Normal load cannot exceed peak power.'
  if (!system.hoursPerDay || system.hoursPerDay < 1 || system.hoursPerDay > 24)
    errors.hoursPerDay = 'Please enter a value between 1 and 24 hours.'
  if (!system.hasSolar)
    errors.hasSolar = 'Please select an option.'
  if (system.hasSolar === 'yes' && (!system.solarKwp || system.solarKwp <= 0))
    errors.solarKwp = 'Please enter the solar array size in kWp.'
  return Object.keys(errors).length === 0
}
 
function nextStep() {
  if (currentStep.value === 1 && !validateStep1()) return
  if (currentStep.value === 2 && !validateStep2()) return
  currentStep.value++
}
 
// ── Estimate calculation ───────────────────────────────────────────────────
const estimate = computed(() => {
  if (currentStep.value < 3 || !system.peakPower) return { label: '', solarLabel: '' }
 
  const peak = system.peakPower
  const band =
    pricing.peakPowerBands.find(b => peak >= b.minKw && peak < b.maxKw) ??
    pricing.peakPowerBands[pricing.peakPowerBands.length - 1]
 
  const hours = system.hoursPerDay ?? 8
  const hAdj =
    pricing.hoursAdjustments.find(h => hours <= h.maxHours) ??
    pricing.hoursAdjustments[pricing.hoursAdjustments.length - 1]
 
  const ratio = (system.normalLoad ?? 0) / peak
  const lfAdj =
    pricing.loadFactorAdjustments.find(l => ratio <= l.maxRatio) ??
    pricing.loadFactorAdjustments[pricing.loadFactorAdjustments.length - 1]
 
  let minTotal = band.rangeMin * hAdj.multiplierMin * lfAdj.multiplierMin
  let maxTotal = band.rangeMax * hAdj.multiplierMax * lfAdj.multiplierMax
 
  let solarMin = 0, solarMax = 0
  if (system.hasSolar === 'yes' && system.solarKwp) {
    solarMin = system.solarKwp * pricing.solarAdder.perKwpMin
    solarMax = system.solarKwp * pricing.solarAdder.perKwpMax
    minTotal += solarMin
    maxTotal += solarMax
  }
 
  const fmt = (n: number) => `${pricing.currency}${Math.round(n).toLocaleString()}`
  return {
    label:      `${fmt(minTotal)} – ${fmt(maxTotal)}`,
    solarLabel: system.hasSolar === 'yes' ? `${fmt(solarMin)} – ${fmt(solarMax)}` : '',
  }
})
 
// ── Reset ──────────────────────────────────────────────────────────────────
function startOver() {
  currentStep.value  = 1
  clearErrors()
  contact.name       = ''
  contact.phone      = ''
  contact.email      = ''
  system.peakPower   = null
  system.normalLoad  = null
  system.hoursPerDay = null
  system.hasSolar    = ''
  system.solarKwp    = null
}
</script>