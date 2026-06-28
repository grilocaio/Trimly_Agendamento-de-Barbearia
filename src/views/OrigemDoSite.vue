<template>
    <div class="bg-gray-50 py-12 px-4 lg:px-16 w-full min-h-screen">
        <div class="max-w-4xl mx-auto">
            
            <!-- Voltar -->
            <button @click="$emit('voltar')" class="mb-8 flex items-center gap-2 text-gray-600 hover:text-red-800 transition-colors font-semibold cursor-pointer">
                ← Voltar para o Início
            </button>

            <!-- Cabeçalho -->
            <div class="bg-white rounded-2xl shadow-xl p-8 lg:p-12 mb-8 text-center">
                <span class="text-xs uppercase font-extrabold tracking-wider text-red-700 bg-red-50 px-4 py-1.5 rounded-full">
                    Nossa História
                </span>
                <h1 class="text-4xl font-extrabold text-gray-950 mt-4 mb-3">Origem do Trimly</h1>
                <p class="text-gray-500 text-sm max-w-xl mx-auto">
                    Conheça a trajetória de como uma simples ideia que surgiu a partir da necessidade de um barbeiro revolucionou a forma de agendar atendimentos em barbearias de Jacareí e região.
                </p>
            </div>

            <!-- Grid de 12 Colunas com Detalhes da Origem -->
            <div class="grid grid-cols-12 gap-6">
                
                <!-- Card Grande: A Inspiração (col-span-12) -->
                <div class="col-span-12 bg-white rounded-xl p-6 lg:p-8 border border-gray-100 shadow-md">
                    <h2 class="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                        A Inspiração
                    </h2>
                    <p class="text-gray-600 text-sm leading-relaxed mb-4">
                        O Trimly nasceu da necessidade de um barbeiro conhecido enfrentando dificuldades de usar seu celular travado por conta de inúmeras mensagens em seu Whatsapp, alem de ter que coordenar horários através de mensagens de texto confusas, foram os combustíveis para a criação de uma solução integrada.
                    </p>
                    <p class="text-gray-600 text-sm leading-relaxed">
                        Nossa meta principal sempre foi clara: criar um ecossistema simples de usar, extremamente confiável e transparente, eliminando qualquer tipo de conflito de agenda ou tempo desperdiçado no telefone.
                    </p>
                </div>

                <!-- Card Médio: Missão (col-span-12 em mobile, col-span-6 em tablet/desktop) -->
                <div class="col-span-12 md:col-span-6 bg-white rounded-xl p-6 border border-gray-100 shadow-md flex flex-col justify-between">
                    <div>
                        <h3 class="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                            Nossa Objetivo
                        </h3>
                        <p class="text-gray-600 text-xs leading-relaxed">
                            Facilitar a conexão entre os barbeiros e seus clientes através de uma plataforma digital fluida, que valoriza o tempo de ambos os lados e eleva o padrão de atendimento no setor de estética masculina.
                        </p>
                    </div>
                </div>

                <!-- Card Médio: Visão (col-span-12 em mobile, col-span-6 em tablet/desktop) -->
                <div class="col-span-12 md:col-span-6 bg-white rounded-xl p-6 border border-gray-100 shadow-md flex flex-col justify-between">
                    <div>
                        <h3 class="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                            Nossa Visão
                        </h3>
                        <p class="text-gray-600 text-xs leading-relaxed">
                            Ser a maior referência em soluções de agendamento e gerenciamento para o ramo da beleza em toda a região de Jacareí e Vale do Paraíba, expandindo constantemente os horizontes tecnológicos dos estabelecimentos parceiros.
                        </p>
                    </div>
                </div>

                <!-- Card Inferior: Valores (col-span-12) -->
                <div class="col-span-12 bg-white rounded-xl p-6 border border-gray-100 shadow-md">
                    <h3 class="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        Nossos Valores
                    </h3>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                        <div class="bg-gray-50 p-4 rounded-lg text-center">
                            <h4 class="font-bold text-sm text-gray-800">Respeito ao Tempo</h4>
                            <p class="text-gray-500 text-[11px] mt-1">Acreditamos que pontualidade e organização são os pilares de um serviço de qualidade.</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg text-center">
                            <h4 class="font-bold text-sm text-gray-800">Inovação Fluida</h4>
                            <p class="text-gray-500 text-[11px] mt-1">Tecnologia avançada apresentada através de interfaces limpas e acessíveis para todos.</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg text-center">
                            <h4 class="font-bold text-sm text-gray-800">Excelência e Parceria</h4>
                            <p class="text-gray-500 text-[11px] mt-1">Crescemos junto com nossos estabelecimentos parceiros e seus profissionais de corte.</p>
                        </div>
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
