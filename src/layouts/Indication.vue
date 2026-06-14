<template>
    <section class="indication">
        <SectionTitles title="Do you Need Any Indication?" subtitle="Partner Store" />

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 justify-items-center lg:px-16">
            <Cards2 v-for="(item, index) in indications" :key="item.id" class="flex flex-col max-w-[440px] gap-8 px-8 py-12 shadow-lg">
                <div class="w-full">
                    <img :src="item.image" class="w-full object-contain">
                </div>
                <div class="flex flex-col gap-4">
                    <div class="flex justify-between">
                        <h1 class="font-bold text-3xl">{{ item.name }}</h1>
                        <p class="text-lg">{{ item.value }}</p>
                    </div>
                    <div> 
                        <p class="text-xl text-gray-800">
                            {{ item.desc }}
                        </p>
                    </div>
                </div>
            </Cards2>
        </div>
    </section>
</template>

<script setup>
import imgRegua from '@/assets/imgRegua.png'
import imgCortinato from '@/assets/imgCasa1.png'
import Cards2 from '@/components/CardRecomendationTemplate.vue';
import SectionTitles from '@/components/SectionTitles.vue';

const indications = [
    {id : 1, image: imgCortinato, name : 'Cortinato', value : '⭐ 4.9 (12)', desc : 'Lorem ipsum dolor sit amet'},
    {id : 2, image: imgCortinato, name : 'Cortinato', value : '⭐ 4.9 (12)', desc : 'Lorem ipsum dolor sit amet'},
    {id : 3, image: imgCortinato, name : 'Cortinato', value : '⭐ 4.9 (12)', desc : 'Lorem ipsum dolor sit amet'}
]
</script>