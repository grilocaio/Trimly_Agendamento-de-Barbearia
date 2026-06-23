<template>
    <div class="bg-gray-50 py-12 px-4 lg:px-16 w-full min-h-screen">
        <div class="max-w-5xl mx-auto">
            
            <!-- Voltar -->
            <button @click="$emit('voltar')" class="mb-8 flex items-center gap-2 text-gray-600 hover:text-red-800 transition-colors font-semibold cursor-pointer">
                ← Voltar para o Início
            </button>

            <div class="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
                <div class="border-b pb-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 class="text-3xl font-extrabold text-gray-900">Meus Agendamentos</h1>
                        <p class="text-gray-500 text-sm mt-1">Acompanhe seu histórico de atendimentos e gerencie suas reservas.</p>
                    </div>
                    <span class="text-sm bg-gray-100 border px-4 py-2 rounded-lg text-gray-700 font-semibold self-start sm:self-center">
                        Cliente: {{ usuarioLogado.nome }}
                    </span>
                </div>

                <!-- Estado Vazio -->
                <div v-if="meusAgendamentos.length === 0" class="text-center py-16 bg-gray-50 border border-dashed border-gray-300 rounded-xl p-6">
                    <span class="text-4xl">📅</span>
                    <h3 class="text-lg font-bold text-gray-800 mt-4 mb-2">Nenhum agendamento encontrado</h3>
                    <p class="text-gray-500 text-sm mb-6">Você ainda não agendou nenhum horário nas barbearias do sistema Trimly.</p>
                    <button @click="$emit('voltar')" class="px-6 py-3 bg-red-800 text-white font-bold rounded-lg hover:bg-red-900 transition-colors cursor-pointer">
                        Procurar Barbearias
                    </button>
                </div>

                <!-- Lista de Agendamentos -->
                <div v-else class="space-y-6">
                    <div 
                        v-for="ag in meusAgendamentos" 
                        :key="ag.id" 
                        class="border rounded-xl p-6 bg-white hover:shadow-md transition-all flex flex-col md:flex-row md:items-center md:justify-between gap-6"
                    >
                        <div class="space-y-3">
                            <div class="flex items-center gap-3 flex-wrap">
                                <span class="font-extrabold text-gray-900 text-lg">🏪 {{ ag.barbeariaNome || 'Barbearia' }}</span>
                                <span :class="[
                                    'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider',
                                    ag.status === 'Agendado' ? 'bg-blue-100 text-blue-800' :
                                    ag.status === 'Concluído' ? 'bg-emerald-100 text-emerald-800' :
                                    'bg-red-100 text-red-800'
                                ]">
                                    {{ ag.status }}
                                </span>
                            </div>
                            
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm text-gray-600">
                                <div><span class="font-bold text-gray-700">Barbeiro:</span> {{ ag.barbeiroNome }}</div>
                                <div><span class="font-bold text-gray-700">Serviço:</span> {{ ag.corteNome }}</div>
                                <div><span class="font-bold text-gray-700">Data:</span> {{ formatarData(ag.data) }}</div>
                                <div><span class="font-bold text-gray-700">Horário:</span> {{ ag.horario }}</div>
                                <div><span class="font-bold text-gray-700">Valor:</span> R$ {{ Number(ag.valor).toFixed(2) }}</div>
                            </div>

                            <div v-if="ag.descricao" class="text-xs bg-gray-50 border border-gray-100 rounded p-3 text-gray-600 mt-2 italic">
                                <span class="font-bold not-italic block text-gray-700 mb-1">Minhas Observações:</span>
                                "{{ ag.descricao }}"
                            </div>
                        </div>

                        <!-- Ações -->
                        <div class="flex items-center justify-end shrink-0">
                            <button 
                                v-if="ag.status === 'Agendado'"
                                @click="cancelarAgendamento(ag.id)"
                                class="px-5 py-2.5 bg-white text-red-700 border border-red-200 rounded-lg text-sm font-bold hover:bg-red-50 hover:border-red-300 transition-colors cursor-pointer"
                            >
                                Cancelar Agendamento
                            </button>
                            <span v-else class="text-xs font-semibold text-gray-400 italic">
                                Sem ações pendentes
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import { bookingService } from '@/services';

const props = defineProps({
    usuarioLogado: Object
});

const emit = defineEmits(['voltar']);

const meusAgendamentos = ref([]);

onMounted(async () => {
    await carregarAgendamentos();
});

async function carregarAgendamentos() {
    try {
        const todos = await bookingService.getAgendamentos();
        // Filtra agendamentos do cliente logado e ordena por data e hora decrescente (mais recentes primeiro)
        meusAgendamentos.value = todos
            .filter(a => Number(a.clienteId) === Number(props.usuarioLogado.id))
            .sort((a, b) => {
                const dataA = new Date(`${a.data}T${a.horario}`);
                const dataB = new Date(`${b.data}T${b.horario}`);
                return dataB - dataA;
            });
    } catch (e) {
        console.error("Erro ao carregar agendamentos:", e);
    }
}

function formatarData(dataStr) {
    if (!dataStr) return '';
    const partes = dataStr.split('-');
    if (partes.length !== 3) return dataStr;
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

async function cancelarAgendamento(id) {
    if (!confirm("Tem certeza que deseja cancelar este agendamento? Esta ação não pode ser desfeita.")) {
        return;
    }

    try {
        await bookingService.cancelarAgendamento(id);
        alert("Agendamento cancelado com sucesso!");
        await carregarAgendamentos();
    } catch (e) {
        alert(e.message);
    }
}
</script>
