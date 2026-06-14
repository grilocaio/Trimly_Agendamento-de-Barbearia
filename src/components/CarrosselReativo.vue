<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 px-16 lg:gap-24">
        <div class="relative">
            <img :src="currentProject.image" class="w-full object-cover">
            <button @click="prevSlide" class="absolute top-1/2 -left-10 bg-black w-[85px] h-[85px] flex items-center justify-center text-white"><</button>
            <button @click="nextSlide" class="absolute top-1/2 -right-10 bg-black w-[85px] h-[85px] flex items-center justify-center text-white">></button>
        </div>
        <div class="mt-7 flex flex-col gap-4">
            <div class="flex flex-col gap-3">
                <p class="text-lg">{{ currentProject.category }}</p>
                <h1 class="text-4xl font-bold text-[#8D6D25]">{{ currentProject.title }}</h1>
            </div>
            <p class="lg:pr-14">{{ currentProject.desc }}</p>
        </div>
    </div>
    <div class="mt-14 mx-16 px-12 pt-14 pb-12 gap-12 flex flex-col justify-center items-center" :style="{backgroundImage: `url(${imgBGCards})`}">
        <h1 class="text-4xl text-white font-bold">Project Details</h1>
        <div class="grid w-full lg:grid-cols-5 gap-5">
            <div v-for="detail in currentProject.details" :key="detail.label">
                <div class="bg-[#8D6D25] flex justify-center items-center text-white font-semibold py-4">    
                    <p>
                        {{ detail.label }}
                    </p>
                </div>
                <div class="bg-white flex items-center justify-center text-[#8D6D25] font-semibold py-11">
                    <h2>
                        {{ detail.value }}
                    </h2>
                </div>  
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import casa1 from '@/assets/imgCasa1.png'
import casa2 from '@/assets/imgCasa2.png'
import casa3 from '@/assets/imgCasa3.png'
import casa4 from '@/assets/imgCasa4.png'
import imgBGCards from '@/assets/imgBGFnA.png'

const projects = [
    { 
        id: 1, 
        image: casa1, 
        category: 'Interior Design1', 
        title: 'Brutalist Lobby', 
        desc: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',

         details: [
            {
                label: 'Architect',
                value: 'Thea Petersen'
            },

            {
                label: 'Client',
                value: 'Qode Interactive'
            },

            {
                label: 'Location',
                value: 'Lisbon, Portugal'
            },

            {
                label: 'Category',
                value: 'Interior design'
            },

            {
                label: 'Date',
                value: 'November 10, 2021'
            }
        ]
    },

    { 
        id: 2, 
        image: casa2, 
        category: 'Interior Design2', 
        title: 'Brutalist Lobby', 
        desc: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',

         details: [
            {
                label: 'Architect',
                value: 'Thea Petersen2'
            },

            {
                label: 'Client',
                value: 'Qode Interactive2'
            },

            {
                label: 'Location',
                value: 'Lisbon, Portugal2'
            },

            {
                label: 'Category',
                value: 'Interior design2'
            },

            {
                label: 'Date',
                value: 'November 10, 2022'
            }
        ]
    },

    { 
        id: 3, 
        image: casa3, 
        category: 'Interior Design3', 
        title: 'Modern Living Room', 
        desc: 'A sleek and contemporary living space designed for comfort and style.',

         details: [
            {
                label: 'Architect',
                value: 'Thea Petersen3'
            },

            {
                label: 'Client',
                value: 'Qode Interactive3'
            },

            {
                label: 'Location',
                value: 'Lisbon, Portugal3'
            },

            {
                label: 'Category',
                value: 'Interior design3'
            },

            {
                label: 'Date',
                value: 'November 10, 2023'
            }
        ]
    },

    { 
        id: 4, 
        image: casa4, 
        category: 'Interior Design4', 
        title: 'Minimalist Bedroom', 
        desc: 'A serene and minimalist bedroom that promotes relaxation and tranquility.',

         details: [
            {
                label: 'Architect',
                value: 'Thea Petersen4'
            },

            {
                label: 'Client',
                value: 'Qode Interactive4'
            },

            {
                label: 'Location',
                value: 'Rome, Italy'
            },

            {
                label: 'Category',
                value: 'Interior design4'
            },

            {
                label: 'Date',
                value: 'November 23, 2025'
            }
        ]
    }

]

const currentslide = ref(0)

const currentProject = computed(() => {
    return projects[currentslide.value]
})

function nextSlide() {

    currentslide.value++

    if (currentslide.value >= projects.length) {
        currentslide.value = 0
    }
}

function prevSlide() {

    currentslide.value--

    if (currentslide.value < 0) {
        currentslide.value = projects.length - 1
    }
}

</script>