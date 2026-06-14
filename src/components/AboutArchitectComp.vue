<template>
    <div class="bg-gray-100 mx-16 flex flex-col items-center justify-center gap-8  p-16">
        <h1 class="font-bold text-5xl">About {{ props.name }}</h1>
        <nav class="flex justify-center w-full gap-8 border-b-1 border-gray-300">
            <a v-for="tab in tabs" :key="tab.id" href="#" @click.prevent="selectedTab = tab.id" :class="[
                'text-lg ',
                selectedTab === tab.id
                    ? 'text-[#8D6D25] font-bold border-[#8D6D25] border-b-2'
                    : 'border-transparent hover:text-[#8D6D25]'
            ]">
                {{ tab.title }}
            </a>
        </nav>
        <div class="w-full text-center text-lg text-gray-700 px-4">
            <p class="whitespace-pre-line">
                {{ contents[selectedTab] }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    name : {
        type: String,
        required: true
    },
})

const tabs = [
    { id: "about", title: "About" },
    { id: "services", title: "Services" },
    { id: "mobility", title: "Mobility" },
    { id: "methodOfPayment", title: "Method of Payment" },
    { id: "languages", title: "Languages" },
    { id: "architectsRegistrationBoard", title: "Architects Registration Board" }
]

const selectedTab = ref("about")

const contents = {
    about: "DASH Architecture is a London-based studio that places sustainability at the heart of everything they do. The team consists of three colleagues: design director Jack Dusek, civil and structural engineer and project director Jonathan Fashanu, and architect Caterina Castro. \n\n This studio was born from a dissatisfaction with the construction sector as it currently stands, and a shared desire to revolutionise it. Passionate about both the environment and bringing people together, the team at DASH Architecture is committed to using design and engineering as a vehicle to make a positive cultural, social and environmental change. The studio’s goal is to make sustainable homes affordable, by designing and executing each project so as to ensure that our planet is respected throughout the process. DASH Architecture designs buildings to be eco-friendly with a reduced carbon footprint, using sustainable materials to the greatest extent possible, and exclusively working with contractors who share the studio’s philosophy. \n\n At DASH Architecture, the team follows a number of guiding principles throughout every project they carry out, from home extensions and refurbishments to fitting out commercial spaces and designing passive buildings. Aiming to collaborate rather than compete, the architects reaching out to trusted partners for unique or challenging projects, striving to be a progressive force in the world of architecture and to challenge established norms. On a personal level, they seek to build frank, open, and constructive relationships with all of their partners in the design process. \n\n Get in touch with DASH Architecture today to make an initial appointment and start bringing your project to life. ",
    services: "Texto services...",
    mobility: "Texto mobility...",
    methodOfPayment: "Texto payment...",
    languages: "Texto languages...",
    architectsRegistrationBoard: "Texto board..."
}
</script>