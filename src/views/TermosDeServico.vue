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
                    Regras de Uso
                </span>
                <h1 class="text-4xl font-extrabold text-gray-950 mt-4 mb-3">Termos de Serviço</h1>
                <p class="text-gray-500 text-sm max-w-xl mx-auto">
                    Por favor, leia atentamente as diretrizes de funcionamento e termos legais que regem a utilização da plataforma Trimly.
                </p>
            </div>

            <!-- Termos e Condições (Grid de 12 Colunas) -->
            <div class="grid grid-cols-12 gap-6 bg-white rounded-2xl shadow-xl p-8 lg:p-12">
                
                <div class="col-span-12 space-y-6">
                    <div>
                        <h3 class="text-base font-extrabold text-gray-900 mb-2">1. Aceitação dos Termos</h3>
                        <p class="text-gray-600 text-xs leading-relaxed">
                            Ao acessar e utilizar o site Trimly, você concorda expressamente em cumprir e estar vinculado aos presentes Termos de Serviço. Caso não concorde com qualquer disposição aqui descrita, orientamos que não utilize os nossos serviços de agendamento online.
                        </p>
                    </div>

                    <hr class="border-gray-100">

                    <div>
                        <h3 class="text-base font-extrabold text-gray-900 mb-2">2. Cadastro de Usuário e Segurança</h3>
                        <p class="text-gray-600 text-xs leading-relaxed">
                            Para efetuar agendamentos ou gerenciar barbearias e agendas, é exigido o fornecimento de informações cadastrais verídicas (nome, e-mail, telefone). Você é o único responsável pela guarda de suas credenciais de acesso e por qualquer atividade realizada sob sua conta. O Trimly reserva-se o direito de suspender contas que descumpram políticas de conduta ou apresentem perfis falsos.
                        </p>
                    </div>

                    <hr class="border-gray-100">

                    <div>
                        <h3 class="text-base font-extrabold text-gray-900 mb-2">3. Política de Agendamentos e Cancelamentos</h3>
                        <p class="text-gray-600 text-xs leading-relaxed mb-2">
                            A plataforma Trimly serve como um canal facilitador entre clientes e profissionais de barbearia:
                        </p>
                        <ul class="list-disc pl-5 text-gray-600 text-xs space-y-2">
                            <li><strong>Anti-conflito:</strong> Nosso sistema impede a reserva de horários já preenchidos para o mesmo barbeiro na mesma data.</li>
                            <li><strong>Cancelamento Responsável:</strong> Caso precise desmarcar um corte, solicitamos que o faça com antecedência e insira obrigatoriamente um motivo claro.</li>
                            <li><strong>Alterações Administrativas:</strong> O administrador da barbearia tem autonomia para reagendar ou cancelar compromissos, fornecendo a justificativa pertinente por e-mail ou notificação interna.</li>
                        </ul>
                    </div>

                    <hr class="border-gray-100">

                    <div>
                        <h3 class="text-base font-extrabold text-gray-900 mb-2">4. Desvinculação de Profissionais e Fechamento</h3>
                        <p class="text-gray-600 text-xs leading-relaxed">
                            Caso um barbeiro seja removido/desvinculado de uma barbearia pelo administrador, todos os seus agendamentos ativos na respectiva barbearia serão sumariamente cancelados com a justificativa "Barbeiro não mais afiliado com a barbearia". Caso um administrador decida fechar a barbearia permanentemente, as contas vinculadas a ela serão tratadas em conformidade com as regras de integridade de dados (cancelando agendamentos pendentes sob o motivo "Barbearia encerrada").
                        </p>
                    </div>

                    <hr class="border-gray-100">

                    <div>
                        <h3 class="text-base font-extrabold text-gray-900 mb-2">5. Limitação de Responsabilidade</h3>
                        <p class="text-gray-600 text-xs leading-relaxed">
                            O Trimly envida seus melhores esforços para manter a plataforma estável e segura. Contudo, não nos responsabilizamos por falhas técnicas temporárias no armazenamento local, indisponibilidade momentânea do servidor ou por desentendimentos comerciais, atrasos e qualidade dos serviços físicos prestados no interior dos estabelecimentos parceiros.
                        </p>
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
