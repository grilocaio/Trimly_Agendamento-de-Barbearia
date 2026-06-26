<template>
    <div class="bg-gray-50 py-16 px-4 lg:px-16 w-full min-h-screen flex items-center justify-center">
        <div class="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            
            <!-- Banner de Destaque -->
            <div class="bg-black text-white p-8 lg:p-12 text-center relative overflow-hidden">
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#b91c1c,transparent_60%)] opacity-30"></div>
                <span class="text-xs uppercase font-extrabold tracking-widest text-red-500 bg-red-950/50 px-3 py-1 rounded-full border border-red-900 relative z-10">
                    Parceria Trimly
                </span>
                <h1 class="text-3xl lg:text-4xl font-extrabold mt-4 relative z-10">Cadastre sua Barbearia & Divulgue a para todos</h1>
                <p class="text-gray-400 text-sm mt-2 max-w-xl mx-auto relative z-10">
                    Faça parte dessa plataforma de agendamento mais moderna do Vale. Cadastre seu estabelecimento e impulsione suas reservas.
                </p>
            </div>

            <!-- Corpo de Informações -->
            <div class="p-8 lg:p-12 space-y-10">
                
                <!-- Seção 1: Como Funciona -->
                <div class="space-y-4">
                    <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
                        Como funciona a plataforma?
                    </h2>
                    <p class="text-sm text-gray-600 leading-relaxed">
                        Descreva aqui como a barbearia pode utilizar o Trimly para gerenciar sua equipe, controlar fluxos de agendamentos diários, gerenciar serviços personalizados e expandir a sua base de clientes. O sistema fornece uma experiência fluida tanto para clientes quanto para barbeiros.
                    </p>
                </div>

                <!-- Seção 2: Pré-requisitos -->
                <div class="space-y-4">
                    <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
                        O que é necessário para cadastrar seu negócio?
                    </h2>
                    <ul class="list-disc pl-6 text-sm text-gray-600 space-y-2">
                        <li>Ter uma barbearia física com equipe ativa</li>
                        <li>Fornecer informações cadastrais válidas</li>
                        <li>Definir lista de serviços iniciais e preços</li>
                        <li>Ler e Aceitar as políticas e termos de uso do Trimly</li>
                    </ul>
                </div>

                <!-- Seção 3: Contato com o Suporte (Cadastros de Admin) -->
                <div class="bg-red-50/50 rounded-xl p-6 border border-red-100/75 space-y-3">
                    <h3 class="text-sm font-extrabold text-red-950 flex items-center gap-2">
                        Cadastro de Administrador (Suporte Técnico)
                    </h3>
                    <p class="text-xs text-red-900 leading-relaxed">
                        A criação de novas contas de <strong>Administrador de Barbearia</strong> é feita exclusivamente de forma interna pelo nosso time de suporte. Isso garante a validação do seu negócio e a segurança dos dados cadastrados no sistema.
                    </p>
                    <div class="pt-3 border-t border-red-200/50 flex flex-wrap gap-x-8 gap-y-2 text-xs text-red-950 font-bold">
                        <div>✉️ E-mail: suporte@trimly.com.br</div>
                        <div>📞 WhatsApp: (11) 99999-8888</div>
                        <div>🕒 Atendimento: Seg a Sex, das 9h às 18h</div>
                    </div>
                </div>

                <!-- Botão de Voltar -->
                <div class="pt-6 border-t flex justify-center">
                    <button 
                        @click="$emit('voltar')" 
                        class="px-8 py-3 bg-black hover:bg-red-800 transition-colors text-white font-bold rounded-lg text-sm cursor-pointer shadow-lg hover:shadow-xl"
                    >
                        ← Voltar para a Página Inicial
                    </button>
                </div>

            </div>

        </div>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue';

defineEmits(['voltar']);
</script>
