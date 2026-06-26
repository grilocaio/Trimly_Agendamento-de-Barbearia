<template>
    <div class="bg-gray-50 py-12 px-4 lg:px-16 w-full min-h-screen">
        <div class="max-w-5xl mx-auto">
            
            <!-- Voltar -->
            <button @click="$emit('voltar')" class="mb-8 flex items-center gap-2 text-gray-600 hover:text-red-800 transition-colors font-semibold cursor-pointer">
                ← Voltar para o Início
            </button>

            <!-- Mensagem caso o barbeiro esteja sem barbearia associada (desvinculado) -->
            <div v-if="!usuarioLogado.barbeariaId" class="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-xl mb-8 shadow-md">
                <div class="flex items-center gap-3">
                    <span class="text-2xl">⚠️</span>
                    <div>
                        <h3 class="text-sm font-extrabold text-amber-950">Vínculo Pendente</h3>
                        <p class="text-xs text-amber-900 mt-1">
                            Atualmente você não é afiliado a nenhuma barbearia. Peça a um administrador para que o cadastre ou vincule a sua conta.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Cabeçalho do Painel -->
            <div class="bg-white rounded-2xl shadow-xl p-8 lg:p-12 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <span class="text-xs uppercase font-extrabold tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                        Painel do Barbeiro
                    </span>
                    <h1 class="text-3xl font-extrabold text-gray-900 mt-3">Agenda de: {{ usuarioLogado.nome }}</h1>
                    <p class="text-gray-500 text-sm mt-1">Monitore seus horários marcados, mude status de atendimentos e reagende se necessário.</p>
                    
                    <!-- Atalho para agendar corte como cliente (barbeiros também cortam cabelo) -->
                    <button 
                        @click="$emit('irParaBarbearias')" 
                        class="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow"
                    >
                        📅 Agendar Corte (Como Cliente)
                    </button>
                </div>
                <div class="text-right bg-gray-50 border p-4 rounded-xl shrink-0">
                    <p class="text-xs text-gray-400 font-bold uppercase">Barbearia</p>
                    <p class="text-sm font-bold text-gray-800">
                        {{ usuarioLogado.barbeariaId ? barbeariaNome : 'Nenhuma (Desvinculado)' }}
                    </p>
                    <p class="text-xs text-gray-500">{{ usuarioLogado.email }}</p>
                    
                    <!-- Botão para se desvincular da barbearia ativa -->
                    <button 
                        v-if="usuarioLogado.barbeariaId"
                        @click="desvincularDaBarbearia"
                        class="mt-3 block w-full text-center px-3 py-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded text-[10px] font-bold transition-colors cursor-pointer"
                    >
                        Sair da Barbearia
                    </button>
                </div>
            </div>

            <!-- Listagem de Atendimentos -->
            <div class="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b pb-6 mb-8">
                    <h2 class="text-xl font-bold text-gray-800">Meus Horários Marcados</h2>
                    
                    <!-- Filtro por Status -->
                    <div>
                        <select v-model="filtroStatus" class="px-3 py-2 border rounded-lg text-sm bg-white">
                            <option value="">Todos Status</option>
                            <option value="Agendado">Agendado</option>
                            <option value="Concluído">Concluído</option>
                            <option value="Cancelado">Cancelado</option>
                        </select>
                    </div>
                </div>

                <!-- Estado Vazio -->
                <div v-if="agendamentosFiltrados.length === 0" class="text-center py-12 text-gray-500 italic">
                    Nenhum compromisso encontrado para os filtros selecionados.
                </div>

                <!-- Grid de Agendamentos -->
                <div v-else class="space-y-6">
                    <div 
                        v-for="ag in agendamentosFiltrados" 
                        :key="ag.id"
                        class="border rounded-xl p-6 bg-white hover:shadow-md transition-all"
                    >
                        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                            <div class="space-y-2">
                                <div class="flex items-center gap-3 flex-wrap">
                                    <span class="font-extrabold text-gray-900 text-lg">👤 Cliente: {{ ag.clienteNome }}</span>
                                    <span :class="[
                                        'px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider',
                                        ag.status === 'Agendado' ? 'bg-blue-100 text-blue-800' :
                                        ag.status === 'Concluído' ? 'bg-emerald-100 text-emerald-800' :
                                        'bg-red-100 text-red-800'
                                    ]">
                                        {{ ag.status }}
                                    </span>
                                </div>
                                <div class="grid grid-cols-12 gap-x-8 gap-y-1 text-sm text-gray-600">
                                    <div class="col-span-12 sm:col-span-6 md:col-span-4"><span class="font-bold text-gray-700">Corte:</span> {{ ag.corteNome }}</div>
                                    <div class="col-span-12 sm:col-span-6 md:col-span-4"><span class="font-bold text-gray-700">Data:</span> {{ formatarData(ag.data) }}</div>
                                    <div class="col-span-12 sm:col-span-6 md:col-span-4"><span class="font-bold text-gray-700">Horário:</span> {{ ag.horario }}</div>
                                    <div class="col-span-12 sm:col-span-6 md:col-span-4"><span class="font-bold text-gray-700">Valor:</span> R$ {{ Number(ag.valor).toFixed(2) }}</div>
                                </div>
                                <div v-if="ag.descricao" class="text-xs bg-gray-50 p-3 rounded border border-gray-100 mt-2 text-gray-600 italic">
                                    <span class="font-bold not-italic block text-gray-700 mb-1">📝 Detalhes/Instruções:</span>
                                    "{{ ag.descricao }}"
                                </div>
                                <!-- Exibição do Motivo de Cancelamento se cancelado -->
                                <div v-if="ag.status === 'Cancelado' && ag.motivoCancelamento" class="text-xs bg-red-50 text-red-800 p-3 rounded border border-red-100 mt-2">
                                    <span class="font-bold block">Motivo do Cancelamento:</span> "{{ ag.motivoCancelamento }}"
                                </div>
                            </div>

                            <!-- Botões de Ação para o Barbeiro -->
                            <div class="flex flex-wrap gap-2 justify-end items-center shrink-0">
                                <template v-if="ag.status === 'Agendado'">
                                    <!-- Ação Concluir -->
                                    <button 
                                        @click="concluirAtendimento(ag.id)" 
                                        class="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 transition-colors cursor-pointer shadow"
                                    >
                                        ✓ Concluir
                                    </button>

                                    <!-- Ação Reagendar -->
                                    <button 
                                        @click="abrirPainelReagendar(ag)" 
                                        class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-50 cursor-pointer"
                                    >
                                        Reagendar
                                    </button>
                                    
                                    <!-- Ação Cancelar -->
                                    <button 
                                        @click="cancelarAtendimento(ag.id)" 
                                        class="px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors cursor-pointer"
                                    >
                                        Cancelar
                                    </button>
                                </template>
                                <span v-else class="text-xs text-gray-400 italic">Compromisso finalizado</span>
                            </div>
                        </div>

                        <!-- Painel Inline de Reagendamento (Estilo similar ao Admin) -->
                        <div v-if="reagendamentoAtivoId === ag.id" class="mt-6 border-t pt-6 bg-gray-50 p-4 rounded-lg">
                            <h4 class="text-xs font-bold uppercase tracking-wider text-gray-600 mb-4">Escolha a nova data e horário para reagendar</h4>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label class="block text-xs font-bold text-gray-700 mb-1">Nova Data</label>
                                    <input type="date" v-model="formReagenda.data" :min="dataMinima" @change="carregarHorariosReagenda(ag)"
                                        class="block w-full px-3 py-2 border rounded-lg text-xs bg-white">
                                </div>
                                <div>
                                    <label class="block text-xs font-bold text-gray-700 mb-1">Novo Horário</label>
                                    <select v-model="formReagenda.horario" class="block w-full px-3 py-2 border rounded-lg text-xs bg-white">
                                        <option value="" disabled selected>Escolha o horário...</option>
                                        <option v-for="h in horariosDisponiveisReagenda" :key="h" :value="h">{{ h }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="flex justify-end gap-2">
                                <button @click="reagendamentoAtivoId = null" class="px-3 py-1.5 border rounded text-xs font-bold text-gray-600 hover:bg-gray-100 bg-white cursor-pointer">
                                    Cancelar
                                </button>
                                <button @click="salvarReagendamento(ag.id)" class="px-3 py-1.5 bg-black text-white rounded text-xs font-bold hover:bg-red-800 cursor-pointer">
                                    Salvar Reagendamento
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, defineProps, defineEmits } from 'vue';
import { bookingService } from '@/services';

const props = defineProps({
    usuarioLogado: Object
});

const emit = defineEmits(['voltar', 'irParaBarbearias', 'atualizarSessao']);

// Estados gerais
const barbeariaNome = ref('');
const todosAgendamentos = ref([]);
const filtroStatus = ref('');

// Controle de Reagendamento
const reagendamentoAtivoId = ref(null);
const formReagenda = reactive({
    data: '',
    horario: ''
});
const listagemHorariosFixos = ref([]);
const horariosDisponiveisReagenda = ref([]);

// Computados
const dataMinima = computed(() => {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
});

// Filtra os agendamentos atribuídos a este barbeiro
const agendamentosFiltrados = computed(() => {
    return todosAgendamentos.value
        .filter(ag => Number(ag.barbeiroId) === Number(props.usuarioLogado.id))
        .filter(ag => !filtroStatus.value || ag.status === filtroStatus.value)
        .sort((a, b) => {
            const dataA = new Date(`${a.data}T${a.horario}`);
            const dataB = new Date(`${b.data}T${b.horario}`);
            return dataB - dataA;
        });
});

onMounted(async () => {
    try {
        // Carrega o nome da barbearia associada
        if (props.usuarioLogado.barbeariaId) {
            const barbearias = await bookingService.getBarbearias();
            const b = barbearias.find(x => x.id === Number(props.usuarioLogado.barbeariaId));
            barbeariaNome.value = b ? b.nome : 'Nossa Barbearia';
        } else {
            barbeariaNome.value = 'Nenhuma (Desvinculado)';
        }

        listagemHorariosFixos.value = await bookingService.getHorarios();

        await carregarAgenda();
    } catch (e) {
        console.error("Erro ao carregar dados do barbeiro:", e);
    }
});

/**
 * Carrega a lista de agendamentos no painel.
 */
async function carregarAgenda() {
    try {
        todosAgendamentos.value = await bookingService.getAgendamentos();
    } catch (e) {
        console.error("Erro ao carregar agenda:", e);
    }
}

function formatarData(dataStr) {
    if (!dataStr) return '';
    const partes = dataStr.split('-');
    if (partes.length !== 3) return dataStr;
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

// Ação 1: Concluir corte/atendimento
async function concluirAtendimento(id) {
    try {
        await bookingService.concluirAtendimento(id);
        alert("Atendimento finalizado com sucesso!");
        await carregarAgenda();
    } catch (e) {
        alert(e.message);
    }
}

// Ação 2: Cancelar atendimento com motivo obrigatório
async function cancelarAtendimento(id) {
    const motivo = prompt("Por favor, digite o motivo do cancelamento deste agendamento:");
    
    if (motivo === null) {
        return; // Pressionou cancelar no prompt
    }
    
    if (!motivo.trim()) {
        alert("Erro: O motivo do cancelamento é obrigatório!");
        return;
    }

    try {
        await bookingService.cancelarAgendamento(id, motivo.trim());
        alert("Agendamento cancelado!");
        await carregarAgenda();
    } catch (e) {
        alert(e.message);
    }
}

// Ação: Se desvincular da barbearia
async function desvincularDaBarbearia() {
    if (!confirm("Deseja realmente se desvincular de sua barbearia atual?\nVocê deixará de aparecer na lista de barbeiros dela, mas seus agendamentos já marcados continuarão ativos.")) {
        return;
    }

    try {
        await bookingService.desvincularBarbeiro(props.usuarioLogado.id);
        
        // Atualiza a sessão e emite para o home.vue atualizar
        const userJson = localStorage.getItem('trimly_logado_user');
        if (userJson) {
            const parsed = JSON.parse(userJson);
            parsed.barbeariaId = null;
            localStorage.setItem('trimly_logado_user', JSON.stringify(parsed));
        }

        emit('atualizarSessao');
        alert("Você se desvinculou da barbearia com sucesso.");
        
        // Atualiza estado local
        barbeariaNome.value = 'Nenhuma (Desvinculado)';
    } catch (error) {
        alert(error.message);
    }
}

// Ação 3: Reagendamento
async function abrirPainelReagendar(ag) {
    reagendamentoAtivoId.value = ag.id;
    formReagenda.data = ag.data;
    formReagenda.horario = ag.horario;
    await carregarHorariosReagenda(ag);
}

async function carregarHorariosReagenda(ag) {
    if (!formReagenda.data) {
        horariosDisponiveisReagenda.value = [];
        return;
    }

    try {
        const slots = await bookingService.getSlotsDisponiveis(props.usuarioLogado.id, formReagenda.data, ag.id);
        horariosDisponiveisReagenda.value = slots
            .filter(s => s.disponivel)
            .map(s => s.hora);
    } catch (e) {
        console.error("Erro ao carregar horários para reagendar:", e);
    }
}

async function salvarReagendamento(id) {
    if (!formReagenda.data || !formReagenda.horario) {
        alert("Selecione data e horário válidos.");
        return;
    }

    try {
        await bookingService.reagendar(id, formReagenda.data, formReagenda.horario);
        alert("Agendamento reagendado com sucesso!");
        reagendamentoAtivoId.value = null;
        await carregarAgenda();
    } catch (e) {
        alert(e.message);
    }
}
</script>
