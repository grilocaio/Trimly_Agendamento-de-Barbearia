<template>
    <section id="nossas-barbearias" class="imagens">
        <SectionTitles subtitle="Barbearias Cadastradas em nosso Sistema" title="Nossas Barbearias" />
        
        <nav class="flex justify-center gap-4">
            <a v-for="cat in categories" :key="cat" href="#" @click.prevent="selectedCategory = cat" :class="[
                'text-center text-lg pb-1 border-b-2 pb-4 lg:pb-0 lg:px-8',
                selectedCategory === cat
                    ? 'text-red-800 font-bold border-red-800'
                    : 'border-transparent hover:text-red-800'
            ]">
                {{ cat }}
            </a>
        </nav>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-8 pb-24 px-4 lg:px-16 gap-8">
            <div v-for="(item, index) in filteredImages" :key="item.id" class="relative group overflow-hidden shadow-lg">
                <img :src="item.imagem" class="w-full h-[350px] object-cover transition duration-300">

                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/60 active:bg-black/70 transition duration-300">
                </div>

                <div class="absolute inset-0 px-4 py-8 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition duration-300">
                    <div class="flex flex-col items-left justify-start gap-2">
                        <div class="flex justify-between items-end">
                            <h1 class="text-white text-3xl font-bold">
                                {{ item.nome }}
                            </h1>
                            <p class="text-red-800 font-bold text-lg">
                                ★ <span class="text-white">5.0</span>
                            </p>
                        </div>
                        <p class="text-gray-300 text-lg">
                            {{ item.categoria }} • {{ item.cidade === 'sjc' ? 'S. J. Campos' : 'Jacareí' }}
                        </p>
                    </div>
                    
                    <button @click="$emit('verBarbearia', item.id)" class="flex items-center justify-between gap-4 bg-red-800 hover:bg-red-900 transition-colors text-white py-3 px-6 cursor-pointer">
                        <p class="text-lg">Ver Barbearia</p>
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
import { ref, computed, onMounted, defineEmits } from 'vue'
import SectionTitles from '@/components/SectionTitles.vue'
import { bookingService } from '@/services'

const emit = defineEmits(['verBarbearia']);

// Estado reativo para armazenar as barbearias obtidas do repositório
const todasAsBarbearias = ref([])

onMounted(async () => {
    try {
        // Carrega os dados reais e atualizados do banco local
        todasAsBarbearias.value = await bookingService.getBarbearias()
    } catch (e) {
        console.error("Erro ao carregar barbearias no Imagens.vue:", e)
    }
})

const categories = [
    'Show All',
    'Clássico',
    'Moderno',
    'Visagismo'
]

const selectedCategory = ref('Show All')

// Filtragem dinâmica baseada na categoria selecionada
const filteredImages = computed(() => {
  if (selectedCategory.value === 'Show All') {
    return todasAsBarbearias.value
  }
  return todasAsBarbearias.value.filter(img => img.categoria === selectedCategory.value)
})
</script>