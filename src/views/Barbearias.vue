<template>
    <div class="bg-white py-16 px-4 lg:px-16 w-full min-h-screen">
        
        <div class="text-center mb-12">
            <p class="text-red-800 font-semibold text-sm tracking-widest uppercase mb-2">
                As melhores opções da região
            </p>
            <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Barbearias em {{ nomeDaCidadeFormatado }}
            </h2>
        </div>

        <div class="flex flex-wrap justify-center gap-6 mb-12 border-b border-gray-200 pb-4">
            <button
                v-for="aba in abas"
                :key="aba"
                @click="abaAtiva = aba"
                :class="[
                    'text-sm font-medium transition-colors cursor-pointer', 
                    abaAtiva === aba 
                        ? 'text-red-800 border-b-2 border-red-800 pb-4 -mb-[17px]' 
                        : 'text-gray-500 hover:text-gray-900'
                ]"
            >
                {{ aba }}
            </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            
            <div 
                v-for="barbearia in barbeariasFiltradas" 
                :key="barbearia.id" 
                @click="$emit('selecionarBarbearia', barbearia)"
                class="group relative overflow-hidden bg-gray-100 cursor-pointer shadow-md rounded-xl hover:shadow-2xl transition-all duration-300"
            >
                <img 
                    :src="barbearia.imagem" 
                    :alt="barbearia.nome" 
                    class="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                >
                
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                    <h3 class="text-white text-xl font-bold">{{ barbearia.nome }}</h3>
                    <p class="text-gray-300 text-sm">{{ barbearia.categoria }}</p>
                </div>
            </div>

        </div>

        <div v-if="barbeariasFiltradas.length === 0" class="text-center text-gray-500 py-12">
            Nenhuma barbearia encontrada para esta seleção.
        </div>

        <div class="mt-16 text-center">
            <button @click="$emit('voltar')" class="px-6 py-3 bg-black text-white font-semibold hover:bg-red-800 transition-colors rounded">
                Voltar para a Busca
            </button>
        </div>

    </div>
    
</template>

<script setup>
import { ref, computed, onMounted, defineProps, defineEmits } from 'vue';
import { bookingService } from '@/services';

const emit = defineEmits(['voltar', 'selecionarBarbearia']);

// Recebe a cidade e o estado da tela Home
const props = defineProps({
    cidade: String,
    estado: String
});

// Controle das abas de filtro
const abas = ['Show All', 'Clássico', 'Moderno', 'Visagismo'];
const abaAtiva = ref('Show All');

// Estado reativo para armazenar as barbearias obtidas do repositório
const todasAsBarbearias = ref([]);

onMounted(async () => {
    try {
        // Carrega os dados reais e atualizados do banco local
        todasAsBarbearias.value = await bookingService.getBarbearias();
    } catch (e) {
        console.error("Erro ao carregar barbearias no Barbearias.vue:", e);
    }
});

// Mágica do Vue: Filtra as barbearias baseada na cidade selecionada E na aba clicada
const barbeariasFiltradas = computed(() => {
    return todasAsBarbearias.value.filter(barbearia => {
        // 1. Verifica se a barbearia é da cidade que veio na prop
        const ehDaCidade = barbearia.cidade === props.cidade;
        
        // 2. Verifica se a categoria bate com a aba selecionada
        const ehDaCategoria = abaAtiva.value === 'Show All' || barbearia.categoria === abaAtiva.value;
        
        // return ehDaCidade && ehDaCategoria;
        return ehDaCidade && ehDaCategoria;
    });
});

// Apenas um enfeite para deixar o título bonito (transforma "jacarei" em "Jacarei")
const nomeDaCidadeFormatado = computed(() => {
    if (!props.cidade) return '';
    return props.cidade.charAt(0).toUpperCase() + props.cidade.slice(1);
});
</script>