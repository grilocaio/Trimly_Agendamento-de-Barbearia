<template>
    <div class="bg-gray-50 py-12 px-4 lg:px-16 w-full min-h-screen">
        <div class="max-w-5xl mx-auto">
            
            <!-- Voltar -->
            <button @click="$emit('voltar')" class="mb-8 flex items-center gap-2 text-gray-600 hover:text-red-800 transition-colors font-semibold cursor-pointer">
                ← Voltar para o Início
            </button>

            <!-- Cabeçalho -->
            <div class="bg-white rounded-2xl shadow-xl p-8 lg:p-12 mb-8 text-center">
                <span class="text-xs uppercase font-extrabold tracking-wider text-red-700 bg-red-50 px-4 py-1.5 rounded-full">
                    Quem Faz Acontecer
                </span>
                <h1 class="text-4xl font-extrabold text-gray-950 mt-4 mb-3">Equipe de Desenvolvimento</h1>
                <p class="text-gray-500 text-sm max-w-xl mx-auto">
                    Conheça a equipe de mentes criativas e engenheiros de software responsáveis por projetar, desenvolver e manter a plataforma Trimly.
                </p>
            </div>

            <!-- Grid de 12 Colunas com os Desenvolvedores -->
            <div class="grid grid-cols-12 gap-8">
                
                <!-- Desenvolvedor 1 (col-span-12 no mobile, col-span-6 no tablet, col-span-4 no desktop) -->
                <div class="col-span-12 sm:col-span-6 lg:col-span-4 bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md flex flex-col justify-between">
                    <div class="p-6">
                        <div>
                            <img :src="caio" class="w-20 h-20 rounded-full mx-auto">
                        </div>
                        <h3 class="text-lg font-bold text-gray-900 text-center">Caio Grilo</h3>
                        <p class="text-xs text-red-700 font-semibold text-center uppercase tracking-wider mt-1">Estudante de ADS</p>
                    </div>
                    <div class="bg-gray-50 p-4 border-t flex justify-center gap-4 text-xs text-gray-400">
                        <span>GitHub: @grilocaio</span>
                        <span>|</span>
                        <span>LinkedIn: <a href="https://www.linkedin.com/in/caio-grilo/">/in/caio-grilo/</a></span>
                    </div>
                </div>

                <!-- Desenvolvedor 2 -->
                <div class="col-span-12 sm:col-span-6 lg:col-span-4 bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md flex flex-col justify-between">
                    <div class="p-6">
                        <div>
                            <img :src="henrique" class="w-20 h-20 rounded-full mx-auto">
                        </div>
                        <h3 class="text-lg font-bold text-gray-900 text-center">Henrique Zaianz</h3>
                        <p class="text-xs text-red-700 font-semibold text-center uppercase tracking-wider mt-1">Estudante de ADS</p>
                    </div>
                    <div class="bg-gray-50 p-4 border-t flex justify-center gap-4 text-xs text-gray-400">
                        <span>GitHub: @henriqmz</span>
                        <span>|</span>
                        <span>LinkedIn: <a href="https://www.linkedin.com/in/henrique-zaianz-881b4337b/?skipRedirect=true">/in/henrique-zaianz-881b4337b/</a></span>
                    </div>
                </div>

                <!-- Desenvolvedor 3 -->
                <div class="col-span-12 sm:col-span-12 lg:col-span-4 bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md flex flex-col justify-between">
                    <div class="p-6">
                        <div>
                            <img :src="kawan" class="w-20 h-20 rounded-full mx-auto">
                        </div>
                        <h3 class="text-lg font-bold text-gray-900 text-center">Kawan Mesquita</h3>
                        <p class="text-xs text-red-700 font-semibold text-center uppercase tracking-wider mt-1">Estudante de ADS</p>
                    </div>
                    <div class="bg-gray-50 p-4 border-t flex justify-center gap-4 text-xs text-gray-400">
                        <span>GitHub: @kawanmt</span>
                        <span>|</span>
                        <span>LinkedIn: <a href="https://www.linkedin.com/in/caio-grilo/">/in/kawan-mesquita-83b053366/</a></span>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue';
import caio from '@/assets/caio.jpg';
import henrique from '@/assets/henrique.jpg';
import kawan from '@/assets/kawan.jpg';
const emit = defineEmits(['voltar']);
</script>
