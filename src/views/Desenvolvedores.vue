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
                        <div class="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-red-800 text-3xl font-bold mb-4 mx-auto">
                            👨‍💻
                        </div>
                        <h3 class="text-lg font-bold text-gray-900 text-center">Alex Silva</h3>
                        <p class="text-xs text-red-700 font-semibold text-center uppercase tracking-wider mt-1">Lead Full Stack Developer</p>
                        <p class="text-gray-500 text-xs text-center mt-4 leading-relaxed">
                            Especialista em arquitetura de software e banco de dados. Responsável pela estruturação do back-end, modelagem das regras de negócio e controle de concorrência de agendamentos.
                        </p>
                    </div>
                    <div class="bg-gray-50 p-4 border-t flex justify-center gap-4 text-xs text-gray-400">
                        <span>GitHub: @alexdev</span>
                        <span>|</span>
                        <span>LinkedIn: /in/alexsilva</span>
                    </div>
                </div>

                <!-- Desenvolvedor 2 -->
                <div class="col-span-12 sm:col-span-6 lg:col-span-4 bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md flex flex-col justify-between">
                    <div class="p-6">
                        <div class="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-red-800 text-3xl font-bold mb-4 mx-auto">
                            👩‍💻
                        </div>
                        <h3 class="text-lg font-bold text-gray-900 text-center">Beatriz Costa</h3>
                        <p class="text-xs text-red-700 font-semibold text-center uppercase tracking-wider mt-1">Frontend UI/UX Engineer</p>
                        <p class="text-gray-500 text-xs text-center mt-4 leading-relaxed">
                            Focada em design premium e experiência do usuário. Responsável pela criação das telas responsivas, estilização elegante com Tailwind CSS e transições fluidas da aplicação.
                        </p>
                    </div>
                    <div class="bg-gray-50 p-4 border-t flex justify-center gap-4 text-xs text-gray-400">
                        <span>GitHub: @biacosta</span>
                        <span>|</span>
                        <span>LinkedIn: /in/beatrizc</span>
                    </div>
                </div>

                <!-- Desenvolvedor 3 -->
                <div class="col-span-12 sm:col-span-12 lg:col-span-4 bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md flex flex-col justify-between">
                    <div class="p-6">
                        <div class="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-red-800 text-3xl font-bold mb-4 mx-auto">
                            👨‍💻
                        </div>
                        <h3 class="text-lg font-bold text-gray-900 text-center">Carlos Souza</h3>
                        <p class="text-xs text-red-700 font-semibold text-center uppercase tracking-wider mt-1">DevOps & QA Engineer</p>
                        <p class="text-gray-500 text-xs text-center mt-4 leading-relaxed">
                            Responsável por testes automatizados de segurança, deploy contínuo, integridade do LocalStorage e garantia de que a sincronização com APIs ocorra livre de falhas ou perdas de dados.
                        </p>
                    </div>
                    <div class="bg-gray-50 p-4 border-t flex justify-center gap-4 text-xs text-gray-400">
                        <span>GitHub: @carlossouza</span>
                        <span>|</span>
                        <span>LinkedIn: /in/carloss</span>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue';
const emit = defineEmits(['voltar']);
</script>
