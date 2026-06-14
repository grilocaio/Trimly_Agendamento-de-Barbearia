<template>
    <div class="grid grid-cols-1 lg:grid-cols-3 px-16 gap-8">
                <div v-for="(item, index) in images" :key="item.id" class="relative group overflow-hidden">
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
</template>

<script setup>

import casa4 from '@/assets/imgCasa4.png'
import casa5 from '@/assets/imgCasa5.png'
import casa6 from '@/assets/imgCasa6.png'

const images = [
    { id: 1, image: casa4, title: "Brutalist Design", data: 2023, category: "Interior Design" },
    { id: 2, image: casa5, title: "Brutalist Design", data: 2026, category: "Facade" },
    { id: 3, image: casa6, title: "Brutalist Design", data: 2022, category: "New Home" }
]

</script>