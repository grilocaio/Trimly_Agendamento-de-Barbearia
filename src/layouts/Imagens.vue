<template>
    <section class="imagens">
        <SectionTitles subtitle="Types of Job" title="Our Architectural Wonders" />
        
        <nav class="lg:flex justify-center items-center flex-wrap pt-8 lg:px-16 px-6 grid grid-cols-3">
            <a v-for="cat in categories" :key="cat" href="#" @click.prevent="selectedCategory = cat" :class="[
                'text-center text-lg pb-1 border-b-2 pb-4 lg:pb-0 lg:px-8',
                selectedCategory === cat
                    ? 'text-[#8D6D25] font-bold border-[#8D6D25]'
                    : 'border-transparent hover:text-[#8D6D25]'
            ]">
                {{ cat }}
            </a>
        </nav>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-8 pb-24 px-4 lg:px-16 gap-8">

            <div v-for="(item, index) in filteredImages" :key="item.id" class="relative group overflow-hidden">
                <img :src="item.image" class="w-full h-full object-cover transition duration-300">

                <div
                    class="absolute inset-0 bg-black/0 group-hover:bg-black/60 active:bg-black/70 transition duration-300">
                </div>

                <div
                    class="absolute inset-0 px-4 py-8 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition duration-300">
                    <div class="flex flex-col items-left justify-start gap-2">
                        <div class="flex justify-between items-end">
                            <h1 class="text-white text-3xl font-bold">
                                {{ item.title }}
                            </h1>
                            <p class="text-white text-lg">
                                {{ item.data }}
                            </p>
                        </div>
                        <p class="text-white text-lg">
                            {{ item.category }}
                        </p>
                    </div>
                    <button class="flex items-center justify-between gap-4 bg-[#8D6D25] text-white py-3 px-6">
                        <p class="text-lg">View Details</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import imgRegua from '@/assets/imgRegua.png'
import casa1 from '@/assets/imgCasa1.png'
import casa2 from '@/assets/imgCasa2.png'
import casa3 from '@/assets/imgCasa3.png'
import casa4 from '@/assets/imgCasa4.png'
import casa5 from '@/assets/imgCasa5.png'
import casa6 from '@/assets/imgCasa6.png'
import { ref, computed } from 'vue'
import SectionTitles from '@/components/SectionTitles.vue'

const images = [
    { id: 1, image: casa1, title: "Teste1", data: 2022, category: "Landscaping" },
    { id: 2, image: casa2, title: "Brutalist Lobby", data: 2023, category: "Interior Design" },
    { id: 3, image: casa3, title: "Teste3", data: 2024, category: "Remodeling" },
    { id: 4, image: casa4, title: "Teste4", data: 2025, category: "New Home" },
    { id: 5, image: casa5, title: "Teste5", data: 2026, category: "Facade" },
    { id: 6, image: casa6, title: "Teste6", data: 2022, category: "New Home" }
]

const categories = [
    'Show All',
    'Interior Design',
    'New Home',
    'Remodeling',
    'Landscaping',
    'Facade'
]

const selectedCategory = ref('Show All')

const filteredImages = computed(() => {
  if (selectedCategory.value === 'Show All') {
    return images
  }

  return images.filter(img => img.category === selectedCategory.value)
})
</script>