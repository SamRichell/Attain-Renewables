<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30">
 
    <!-- Page header -->
    <div class="bg-gradient-to-br from-green-900 to-emerald-800 text-white py-16">
      <div class="container mx-auto px-6 text-center">
        <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 mb-6 text-sm font-medium">
          <span class="w-2 h-2 bg-emerald-400 rounded-full"></span>
          Free, no-obligation estimate
        </div>
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Get Your Quote Estimate</h1>
        <p class="text-lg text-green-200 max-w-xl mx-auto">
          Tell us what you need and we'll give you an instant rough hardware cost.
        </p>
      </div>
    </div>
 
    <div class="container mx-auto px-6 py-12 max-w-2xl">
 
      <!-- Step progress indicator -->
      <div v-if="emailSubmitted" class="flex items-center justify-center mb-10">
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
 
      <!-- ══════════════════════════════════════════
           STEP 0: Email gate
      ══════════════════════════════════════════ -->
      <div v-if="!emailSubmitted" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
        <div class="text-center mb-8">
          <div class="text-5xl mb-4">📋</div>
          <h2 class="text-2xl font-bold mb-2">Before we start...</h2>
          <p class="text-gray-500">Enter your details and we'll display your estimate instantly.</p>
        </div>
 
        <div class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">
              Your name <span class="text-gray-400">(optional)</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Jane Smith"
              class="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>
 
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1.5">
              Email address <span class="text-red-400">*</span>
            </label>
            <input
              v-model="form.email"
              type="email"
              placeholder="jane@example.com"
              class="w-full border rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              :class="emailError ? 'border-red-300 bg-red-50' : 'border-gray-200'"
              @keyup.enter="submitEmail"
            />
            <p v-if="emailError" class="text-red-500 text-xs mt-1.5">{{ emailError }}</p>
          </div>
 
          <button
            @click="submitEmail"
            class="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 active:scale-[0.99] transition-all duration-150 shadow-md shadow-green-200"
          >
            Get My Estimate →
          </button>
 
          <p class="text-center text-xs text-gray-400">
            We'll only use your email to send you this estimate and occasional product updates.
          </p>
        </div>
      </div>
 
      <!-- ══════════════════════════════════════════
           STEP 1: Choose product type
      ══════════════════════════════════════════ -->
      <div v-else-if="currentStep === 1" class="space-y-5">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 class="text-2xl font-bold mb-2">What are you interested in?</h2>
          <p class="text-gray-500 mb-8">Select the type of equipment you'd like a rough cost for.</p>
 
          <div class="grid grid-cols-2 gap-4">
            <button
              @click="selectProductType('Solar Panels')"
              class="relative p-6 rounded-2xl border-2 text-left transition-all duration-200"
              :class="form.quoteType === 'Solar Panels'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-100 hover:border-green-200 hover:bg-gray-50'"
            >
              <div class="text-5xl mb-4">☀️</div>
              <h3 class="font-bold text-lg mb-1">Solar Panels</h3>
              <p class="text-sm text-gray-500 leading-relaxed">Monocrystalline &amp; bifacial panels for rooftops and ground arrays.</p>
              <div
                v-if="form.quoteType === 'Solar Panels'"
                class="absolute top-3 right-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
              >✓</div>
            </button>
 
            <button
              @click="selectProductType('Wind Turbines')"
              class="relative p-6 rounded-2xl border-2 text-left transition-all duration-200"
              :class="form.quoteType === 'Wind Turbines'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-100 hover:border-green-200 hover:bg-gray-50'"
            >
              <div class="text-5xl mb-4">💨</div>
              <h3 class="font-bold text-lg mb-1">Wind Turbines</h3>
              <p class="text-sm text-gray-500 leading-relaxed">Vertical axis (urban) and horizontal axis (commercial) units.</p>
              <div
                v-if="form.quoteType === 'Wind Turbines'"
                class="absolute top-3 right-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
              >✓</div>
            </button>
          </div>
        </div>
 
        <div class="flex justify-between">
          <button @click="emailSubmitted = false" class="text-gray-400 hover:text-gray-600 font-medium transition">← Back</button>
          <button
            @click="nextStep"
            :disabled="!form.quoteType"
            class="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-700 transition"
          >
            Continue →
          </button>
        </div>
      </div>
 
      <!-- ══════════════════════════════════════════
           STEP 2: Configuration — Solar
      ══════════════════════════════════════════ -->
      <div v-else-if="currentStep === 2 && form.quoteType === 'Solar Panels'" class="space-y-5">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 class="text-2xl font-bold mb-2">Configure your solar array</h2>
          <p class="text-gray-500 mb-8">Adjust the options below to match your project.</p>
 
          <div class="mb-8">
            <label class="block text-sm font-semibold text-gray-700 mb-3">Panel type</label>
            <div class="grid grid-cols-1 gap-3">
              <label
                v-for="panel in solarPanelOptions"
                :key="panel.id"
                class="flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200"
                :class="solarConfig.panelType === panel.id
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-100 hover:border-gray-200'"
              >
                <input type="radio" v-model="solarConfig.panelType" :value="panel.id" class="mt-0.5 accent-green-600" />
                <div class="flex-1">
                  <div class="flex justify-between items-start">
                    <span class="font-semibold text-gray-800">{{ panel.name }}</span>
                    <span class="text-green-700 font-bold text-sm">€{{ panel.priceEach.toLocaleString() }}/panel</span>
                  </div>
                  <p class="text-sm text-gray-500 mt-0.5">{{ panel.description }}</p>
                </div>
              </label>
            </div>
          </div>
 
          <div>
            <div class="flex justify-between items-center mb-3">
              <label class="text-sm font-semibold text-gray-700">Number of panels</label>
              <span class="text-2xl font-black text-green-600">{{ solarConfig.quantity }}</span>
            </div>
            <input
              v-model.number="solarConfig.quantity"
              type="range" min="1" max="50" step="1"
              class="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-green-600"
            />
            <div class="flex justify-between text-xs text-gray-400 mt-1">
              <span>1 panel</span><span>50 panels</span>
            </div>
            <p class="text-sm text-gray-500 mt-3">
              {{ solarConfig.quantity }} × {{ selectedSolarPanel?.power }}W =
              <strong class="text-gray-800">
                {{ (solarConfig.quantity * (selectedSolarPanel?.power ?? 0) / 1000).toFixed(1) }} kW
              </strong> peak output
            </p>
          </div>
        </div>
 
        <div class="flex justify-between">
          <button @click="currentStep--" class="text-gray-400 hover:text-gray-600 font-medium transition">← Back</button>
          <button @click="nextStep" class="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition">
            See Estimate →
          </button>
        </div>
      </div>
 
      <!-- ══════════════════════════════════════════
           STEP 2: Configuration — Wind
      ══════════════════════════════════════════ -->
      <div v-else-if="currentStep === 2 && form.quoteType === 'Wind Turbines'" class="space-y-5">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 class="text-2xl font-bold mb-2">Configure your wind installation</h2>
          <p class="text-gray-500 mb-8">Select the turbine type that suits your site and wind conditions.</p>
 
          <div class="mb-8">
            <label class="block text-sm font-semibold text-gray-700 mb-3">Turbine type</label>
            <div class="grid grid-cols-1 gap-3">
              <label
                v-for="turbine in windTurbineOptions"
                :key="turbine.id"
                class="flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200"
                :class="windConfig.turbineType === turbine.id
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-100 hover:border-gray-200'"
              >
                <input type="radio" v-model="windConfig.turbineType" :value="turbine.id" class="mt-0.5 accent-green-600" />
                <div class="flex-1">
                  <div class="flex justify-between items-start">
                    <span class="font-semibold text-gray-800">{{ turbine.name }}</span>
                    <span class="text-green-700 font-bold text-sm">€{{ turbine.priceEach.toLocaleString() }}/unit</span>
                  </div>
                  <p class="text-sm text-gray-500 mt-0.5">{{ turbine.description }}</p>
                </div>
              </label>
            </div>
          </div>
 
          <div>
            <div class="flex justify-between items-center mb-3">
              <label class="text-sm font-semibold text-gray-700">Number of turbines</label>
              <span class="text-2xl font-black text-green-600">{{ windConfig.quantity }}</span>
            </div>
            <input
              v-model.number="windConfig.quantity"
              type="range" min="1" max="10" step="1"
              class="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-green-600"
            />
            <div class="flex justify-between text-xs text-gray-400 mt-1">
              <span>1 turbine</span><span>10 turbines</span>
            </div>
            <p class="text-sm text-gray-500 mt-3">
              {{ windConfig.quantity }} × {{ selectedTurbine?.power }} =
              <strong class="text-gray-800">
                {{ windConfig.quantity * (selectedTurbine?.powerKw ?? 0) }} kW
              </strong> rated output
            </p>
          </div>
        </div>
 
        <div class="flex justify-between">
          <button @click="currentStep--" class="text-gray-400 hover:text-gray-600 font-medium transition">← Back</button>
          <button @click="nextStep" class="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition">
            See Estimate →
          </button>
        </div>
      </div>
 
      <!-- ══════════════════════════════════════════
           STEP 3: Results
      ══════════════════════════════════════════ -->
      <div v-else-if="currentStep === 3" class="space-y-6">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div class="text-center mb-8">
            <div class="text-5xl mb-3">🎉</div>
            <h2 class="text-2xl font-bold mb-1">Your Hardware Estimate</h2>
            <p class="text-gray-500 text-sm">Based on {{ form.quoteType }} — hardware cost only</p>
          </div>
 
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-6 mb-6">
            <div class="space-y-3 mb-5">
              <div v-for="row in estimate.rows" :key="row.label" class="flex justify-between text-sm">
                <span class="text-gray-600">{{ row.label }}</span>
                <span class="font-semibold text-gray-800">{{ row.value }}</span>
              </div>
            </div>
            <div class="border-t-2 border-green-200 pt-4 flex justify-between items-center">
              <span class="text-lg font-bold text-green-900">Estimated Hardware Total</span>
              <span class="text-2xl font-black text-green-700">{{ estimate.total }}</span>
            </div>
          </div>
 
          <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <p class="text-sm text-amber-800 leading-relaxed">
              ⚠️ <strong>Hardware cost only.</strong> This estimate does not include installation,
              mounting hardware, wiring, inverter costs (for solar), or planning permission fees.
              Installation typically adds 30–60% to hardware cost depending on site complexity.
            </p>
          </div>
 
          <!--
            EMAIL BUTTON — PLACEHOLDER
            When the AWS backend is live, replace the button below with a call to
            api.leads.submit() from src/services/api.ts. The full implementation
            is documented in the API version of this file.
          -->
          <div v-if="!emailSent" class="space-y-3">
            <button
              @click="emailEstimatePlaceholder"
              :disabled="emailSending"
              class="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 disabled:opacity-60 transition-all duration-150 shadow-md shadow-green-200"
            >
              {{ emailSending ? 'Sending...' : `📧 Email this estimate to ${form.email}` }}
            </button>
            <p v-if="emailError" class="text-red-500 text-sm text-center">{{ emailError }}</p>
          </div>
 
          <div v-else class="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <p class="text-green-800 font-semibold">✅ Estimate sent to {{ form.email }}</p>
            <p class="text-green-700 text-sm mt-1">Check your inbox — our team will be in touch shortly.</p>
          </div>
        </div>
 
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
import { ref, computed, reactive } from 'vue'
 
// ─── Step state ───────────────────────────────────────────────────────────────
const stepLabels     = ['Product Type', 'Configuration', 'Your Estimate']
const currentStep    = ref(1)
const emailSubmitted = ref(false)
 
// ─── Form state ───────────────────────────────────────────────────────────────
const form = reactive({
  name:      '',
  email:     '',
  quoteType: '' as 'Solar Panels' | 'Wind Turbines' | '',
})
 
// ─── Single error ref covering both the email gate and the send action ────────
//
// THE BUG EXPLAINED:
//   The previous version declared `const emailError = ref('')` twice in the
//   same <script setup> block — once for gate validation and once (labelled
//   as a "re-export alias") for the send error. In JavaScript/TypeScript,
//   `const` is block-scoped: you cannot declare the same name twice in the
//   same block. This is identical to writing:
//
//     const x = 1
//     const x = 2  // SyntaxError: Identifier 'x' has already been declared
//
//   Vue's <script setup> compiles to a single function body, so both
//   declarations end up in the same block scope — hence the error.
//
// THE FIX:
//   One ref, one name. We use `emailError` for both purposes:
//     - Set it during submitEmail() if the format is invalid (gate)
//     - Set it during emailEstimatePlaceholder() if sending fails (step 3)
//   We clear it at the start of each action so stale messages don't persist.
const emailError = ref('')
 
// ─── Email send state (step 3 only) ──────────────────────────────────────────
const emailSending = ref(false)
const emailSent    = ref(false)
 
// ─── Product option definitions ───────────────────────────────────────────────
const solarPanelOptions = [
  {
    id:          'mono400',
    name:        'Monocrystalline 400W',
    description: 'High-efficiency panel. Ideal for residential rooftops with limited space.',
    priceEach:   180,
    power:       400,
  },
  {
    id:          'bifacial550',
    name:        'Bifacial 550W',
    description: 'Generates power from both faces. Best for ground mounts and flat roofs.',
    priceEach:   250,
    power:       550,
  },
]
 
const windTurbineOptions = [
  {
    id:          'vawt5kw',
    name:        'Vertical Axis 5kW (Urban)',
    description: 'Compact, quiet, handles turbulent urban wind. Suitable for buildings and small sites.',
    priceEach:   4200,
    power:       '5 kW',
    powerKw:     5,
  },
  {
    id:          'hawt15kw',
    name:        'Horizontal Axis 15kW (Commercial)',
    description: 'Heavy-duty for farms, rural sites, and industrial premises with good open exposure.',
    priceEach:   12800,
    power:       '15 kW',
    powerKw:     15,
  },
]
 
// ─── Configuration state ──────────────────────────────────────────────────────
const solarConfig = reactive({ panelType: 'mono400',  quantity: 8 })
const windConfig  = reactive({ turbineType: 'vawt5kw', quantity: 1 })
 
// ─── Derived values ───────────────────────────────────────────────────────────
const selectedSolarPanel = computed(() =>
  solarPanelOptions.find(p => p.id === solarConfig.panelType)
)
 
const selectedTurbine = computed(() =>
  windTurbineOptions.find(t => t.id === windConfig.turbineType)
)
 
const estimate = computed(() => {
  if (form.quoteType === 'Solar Panels') {
    const panel    = selectedSolarPanel.value!
    const hardware = panel.priceEach * solarConfig.quantity
    return {
      total: `€${hardware.toLocaleString()}`,
      rows: [
        { label: 'Panel type',        value: panel.name },
        { label: 'Quantity',          value: `${solarConfig.quantity} panels` },
        { label: 'Price per panel',   value: `€${panel.priceEach}` },
        { label: 'Peak output',       value: `${(solarConfig.quantity * panel.power / 1000).toFixed(1)} kW` },
        { label: 'Hardware subtotal', value: `€${hardware.toLocaleString()}` },
      ],
    }
  } else {
    const turbine  = selectedTurbine.value!
    const hardware = turbine.priceEach * windConfig.quantity
    return {
      total: `€${hardware.toLocaleString()}`,
      rows: [
        { label: 'Turbine type',      value: turbine.name },
        { label: 'Quantity',          value: `${windConfig.quantity} turbine${windConfig.quantity > 1 ? 's' : ''}` },
        { label: 'Price per turbine', value: `€${turbine.priceEach.toLocaleString()}` },
        { label: 'Rated output',      value: `${windConfig.quantity * turbine.powerKw} kW total` },
        { label: 'Hardware subtotal', value: `€${hardware.toLocaleString()}` },
      ],
    }
  }
})
 
// ─── Actions ──────────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
 
function submitEmail() {
  emailError.value = ''  // clear any previous error before re-validating
  if (!form.email || !EMAIL_RE.test(form.email)) {
    emailError.value = 'Please enter a valid email address.'
    return
  }
  emailSubmitted.value = true
}
 
function selectProductType(type: 'Solar Panels' | 'Wind Turbines') {
  form.quoteType = type
}
 
function nextStep() {
  if (currentStep.value < 3) currentStep.value++
}
 
// Placeholder — replace with api.leads.submit() once AWS backend is deployed.
// At that point, also set emailSent.value = true on success and populate
// emailError.value on failure instead of using alert().
function emailEstimatePlaceholder() {
  emailError.value = ''  // clear any stale send error
  alert(
    `[DEV MODE — no API yet]\n\n` +
    `When the AWS backend is live this button will:\n` +
    `  1. POST the estimate data to /leads\n` +
    `  2. Lambda saves the lead to DynamoDB\n` +
    `  3. SES sends a confirmation email to ${form.email}`
  )
}
 
function startOver() {
  form.quoteType       = ''
  currentStep.value    = 1
  emailSent.value      = false
  emailError.value     = ''
  solarConfig.quantity  = 8
  solarConfig.panelType = 'mono400'
  windConfig.quantity   = 1
  windConfig.turbineType = 'vawt5kw'
}
</script>