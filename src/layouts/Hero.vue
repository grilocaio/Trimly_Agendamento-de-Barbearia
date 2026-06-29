<template>
    <section id="home" class="inicio">
        <div class="grid grid-cols-1 lg:grid-cols-12 lg:pb-14">
            <div
                class="flex flex-col gap-8 mt-16 pb-16 px-4 text-center lg:pb-24 lg:mt-32 lg:pl-16 lg:pr-8 lg:col-span-7 lg:text-left">
                <div class="flex flex-col gap-6 lg:pr-23">
                    <h1 class="text-4xl text-gray-800 font-bold px-8 lg:px-0 lg:text-6xl">Trimly</h1>
                    <p class="lg:text-lg">Corte marcado, tempo otimizado.</p>
                </div>

                <div class="hidden lg:block shadow-xl max-w-full min-h-[106px] bg-white">

                    <div class="flex items-center justify-between gap-8 py-7 px-8">
                        <div class="flex gap-4 px-2 items-center">

                            <div class="flex flex-col items-center justify-center gap-3">
                                <h1 class="font-bold text-gray-800">Localização</h1>
                                <select v-model="estadoSelecionado" @change="atualizarCidade"
                                    class="bg-transparent text-gray-600 border-none outline-none cursor-pointer text-center w-full focus:ring-0">
                                    <option value="sp" selected>São Paulo</option>
                                    <option value="mg">Minas Gerais</option>
                                    <option value="rj">Rio de Janeiro</option>
                                </select>
                            </div>

                            <div class="flex flex-col items-center justify-center gap-2 border-l border-l-black/30 px-2">
                                <h1 class="font-bold text-gray-800">Cidade</h1>
                                <select v-model="cidadeSelecionada"
                                    class="bg-transparent text-gray-600 border-none outline-none cursor-pointer text-center w-full focus:ring-0">
                                    <option v-for="cidade in cidadesPorEstado[estadoSelecionado]" :key="cidade.valor" :value="cidade.valor">
                                        {{ cidade.nome }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <Button text="Buscar" @click="$emit('buscar', estadoSelecionado, cidadeSelecionada)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </Button>

                    </div>
                </div>
            </div>
            <div class="relative grid lg:col-span-5 justify-center">
                <div class="hidden lg:block absolute right-0 top-0 w-[450px] h-[470px] bg-gray-200"></div>
                <img :src="trimlybarber" class="lg:absolute z-5 px-5 lg:px-0 lg:right-6 lg:top-7">
            </div>


            <div class="lg:hidden block shadow-xl max-w-full min-h-[106px] bg-white mx-4">

                <div class="grid grid-cols-1 items-center justify-between gap-8 pt-7 pb-14 px-8">

                    
                    <div class="flex justify-center">
                        <Button text="Buscar" @click="$emit('buscar', estadoSelecionado, cidadeSelecionada)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import Button from '@/components/Button.vue';
import trimlybarber from '@/assets/trimlybarber.png'; 

const emit = defineEmits(['buscar']);

const estadoSelecionado = ref('sp');
const cidadeSelecionada = ref('sjc');

const cidadesPorEstado = {
  sp: [
    { valor: 'sjc', nome: 'São José dos Campos' },
    { valor: 'jacarei', nome: 'Jacareí' },
    { valor: 'sp_capital', nome: 'São Paulo' }
  ],
  mg: [
    { valor: 'bh', nome: 'Belo Horizonte' },
    { valor: 'uberlandia', nome: 'Uberlândia' },
    { valor: 'ouro_preto', nome: 'Ouro Preto' }
  ],
  rj: [
    { valor: 'rj_capital', nome: 'Rio de Janeiro' },
    { valor: 'niteroi', nome: 'Niterói' },
    { valor: 'petropolis', nome: 'Petrópolis' }
  ]
};

function atualizarCidade() {
    cidadeSelecionada.value = cidadesPorEstado[estadoSelecionado.value][0].valor;
}
</script>