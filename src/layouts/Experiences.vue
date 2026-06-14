<template>
    <section class="experiences">
        <div class="bg-[#F6F6F6]">
            <div class="pb-10 mt-24">
                <SectionTitles title="Our Client Experiences" subtitle="Testimonials" />
            </div>

            

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-24 px-4 lg:px-16">
                <div v-for="(item, index) in comments" :key="item.id" class="flex items-start gap-5 pb-12">
                    <img :src="aspas" class="relative -top-8 w-12 h-auto object-contain shrink-4 w-[20%] lg:w-[90%]">
                    <div class="flex flex-col">
                        <p class="leading-relaxed text-gray-800 text-xl mb-6">
                            {{ item.text }}
                        </p>

                        <div class="border-l-2 border-[#B8945F] pl-4">
                            <h4 class="font-bold leading-tight text-xl">{{ item.author }}</h4>
                            <p class="text-sm text-gray-800 text-xl">{{ item.profession }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import SectionTitles from '@/components/SectionTitles.vue';
import imgRegua from '@/assets/imgRegua.png'
import aspas from '@/assets/imgAspas.png'

const comments = [
    {id: 1, image : aspas, text : "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", author : 'Sara Johnson', profession : 'Marketing Manager'},
    {id: 2, image : aspas, text : "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", author : 'John Smith', profession : 'Marketing Manager'},
    {id: 3, image : aspas, text : "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", author : 'Emily Roy', profession : 'Marketing Manager'}

]
</script>