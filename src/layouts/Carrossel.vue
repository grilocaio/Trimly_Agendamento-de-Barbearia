<template>
  <section class="carrossel">

    <div class="relative bg-black mt-22 pb-12 mx-5 lg:mx-16">

      <SectionTitle subtitle="Specialties" title="We Shape Tomorrow's Life" color="text-white" />

      <div class="overflow-hidden relative mx-6 lg:mx-16">

        <div ref="track" class="flex transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">

          <div v-for="(group, gIndex) in loopGroups" :key="gIndex" class="min-w-full grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div v-for="(card, cIndex) in group" :key="cIndex" class="bg-white flex flex-col gap-8 py-12 px-8">

              <div class="w-full flex justify-center">
                <img :src="card.image" class="w-[120px] h-[120px]">
              </div>

              <h1 class="font-bold text-3xl text-gray-800" key="cIndex">
                {{ card.title }}
              </h1>

              <p class="text-lg text-gray-800">
                {{ card.description }}
              </p>

              <button class="w-full bg-[#8D6D25] text-white flex justify-between items-center py-3 px-6">
                <p class="text-lg">View Details</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </button>

            </div>
          </div>
        </div>

      </div>
      <button @click="prev" class="absolute -left-3 top-5/8 lg:left-12 -translate-y-1/2 bg-black border border-white text-white w-7 h-7 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button @click="next" class="absolute -right-3 top-5/8 lg:right-12 -translate-y-1/2 bg-black border border-white text-white w-7 h-7 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup>
import SectionTitle from '@/components/SectionTitles.vue'
import imgRegua from '@/assets/imgRegua.png'
import apartments from '@/assets/imgApartments.png'
import commercial from '@/assets/imgCommercial.png'
import industrial from '@/assets/imgIndustrial.png'
import { ref, computed, onMounted, watch } from 'vue'

const items = [
  { image: apartments, title: 'Apartments', description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { image: commercial, title: 'Commercial', description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { image: industrial, title: 'Industrial', description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { image: apartments, title: 'Apartments', description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { image: commercial, title: 'Commercial', description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { image: industrial, title: 'Industrial', description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
]

// 🔥 chunk dinâmico
const chunkSize = ref(window.innerWidth < 768 ? 1 : 3)

// 🔥 atualiza ao redimensionar
const updateChunk = () => {
  chunkSize.value = window.innerWidth < 768 ? 1 : 3
}

// 🔥 grupos reativos
const groups = computed(() => {
  const temp = []
  for (let i = 0; i < items.length; i += chunkSize.value) {
    temp.push(items.slice(i, i + chunkSize.value))
  }
  return temp
})

// 🔥 loop infinito
const loopGroups = computed(() => [
  groups.value[groups.value.length - 1],
  ...groups.value,
  groups.value[0]
])

const currentIndex = ref(1)
const track = ref(null)

const next = () => currentIndex.value++
const prev = () => currentIndex.value--

// 🔥 evita bug quando muda tamanho da tela
watch(chunkSize, () => {
  currentIndex.value = 1
})

onMounted(() => {
  window.addEventListener('resize', updateChunk)

  track.value.addEventListener('transitionend', () => {

    if (currentIndex.value === loopGroups.value.length - 1) {
      track.value.style.transition = 'none'
      currentIndex.value = 1
      track.value.offsetHeight
      track.value.style.transition = ''
    }

    if (currentIndex.value === 0) {
      track.value.style.transition = 'none'
      currentIndex.value = groups.value.length
      track.value.offsetHeight
      track.value.style.transition = ''
    }

  })
})
</script>