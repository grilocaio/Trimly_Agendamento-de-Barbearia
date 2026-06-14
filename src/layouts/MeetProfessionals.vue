<template>
    <section id="architects" class="meetProfessionals">
        <div class="px-9 lg:px-0 pt-8">
        </div>
        <div class="bg-cover bg-center relative" :style="{ backgroundImage: `url(${BGMP})` }">
            <div class="absolute inset-0 bg-gradient-to-b from-white/0 via-white/40 to-white"></div>
            <div class="relative z-10">
                <SectionTitles title="Meet Our Professionals" subtitle="Our Architects" />
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-9 gap-8">

            <div v-for="(item, index) in professionals" :key="item.id" class="max-w-full pb-12">
                <div class="relative">
                    <img :src="item.image" class="w-full object-cover">
                    <div class="absolute left-1/2 -bottom-12 -translate-x-1/2 bg-white shadow-lg px-4 py-5 w-[90%]">
                        <div class="h-full w-full relative">
                            <h3 class="font-bold text-[#8D6D25] text-2xl">{{ item.name }}</h3>
                            <p class="text-sm text-gray-800">{{ item.profession }}</p>
                            <button class="absolute -top-10 left-[70%] bg-[#8D6D25] h-12 w-12 rounded-full flex justify-center items-center">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <!-- fundo -->
                                    <circle cx="24" cy="24" r="24" fill="#8D6D25" />

                                    <!-- linhas (encurtadas) -->
                                    <line x1="18" y1="24" x2="27" y2="19" stroke="white" stroke-width="2"
                                        stroke-linecap="round" />
                                    <line x1="18" y1="24" x2="27" y2="29" stroke="white" stroke-width="2"
                                        stroke-linecap="round" />

                                    <!-- pontos -->
                                    <circle cx="15" cy="24" r="3" fill="none" stroke="white" stroke-width="2" />
                                    <circle cx="30" cy="17" r="3" fill="none" stroke="white" stroke-width="2" />
                                    <circle cx="30" cy="31" r="3" fill="none" stroke="white" stroke-width="2" />
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </section>

</template>

<script setup>
import SectionTitles from '@/components/SectionTitles.vue'
import imgRegua from '@/assets/imgRegua.png'
import BGMP from '@/assets/imgBGMeetProfessionals.png'
import jennyWilson from '@/assets/imgJennyWilson.png'
import robertFox from '@/assets/imgRobertFox.png'
import dianeRussel from '@/assets/imgDianeRussel.png'
import AlbertFlores from '@/assets/imgAlbertFlores.png'



const professionals = [
    { id: 1, image: jennyWilson, name: 'Jenny Wilson', profession: 'Interior Design' },
    { id: 2, image: robertFox, name: 'Robert Fox', profession: 'Interior Design' },
    { id: 3, image: dianeRussel, name: 'Diane Russel', profession: 'Interior Design' },
    { id: 4, image: AlbertFlores, name: 'Albert Flores', profession: 'Interior Design' }
]
</script>