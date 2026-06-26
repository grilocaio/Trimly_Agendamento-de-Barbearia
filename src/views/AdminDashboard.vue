<template>
    <div class="bg-gray-50 py-12 px-4 lg:px-16 w-full min-h-screen">
        <div class="max-w-6xl mx-auto">
            
            <!-- Voltar -->
            <button @click="$emit('voltar')" class="mb-8 flex items-center gap-2 text-gray-600 hover:text-red-800 transition-colors font-semibold cursor-pointer">
                ← Voltar para o Início
            </button>

            <!-- Cabeçalho do Painel -->
            <div class="bg-white rounded-2xl shadow-xl p-8 lg:p-12 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <span class="text-xs uppercase font-extrabold tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                        Painel Administrativo
                    </span>
                    <h1 class="text-3xl font-extrabold text-gray-900 mt-3">Barbearia: {{ barbeariaNome }}</h1>
                    <p class="text-gray-500 text-sm mt-1">Gerencie a equipe de barbeiros e controle os agendamentos dos clientes.</p>
                </div>
                <div class="text-right bg-gray-50 border p-4 rounded-xl">
                    <p class="text-xs text-gray-400 font-bold uppercase">Administrador Logado</p>
                    <p class="text-sm font-bold text-gray-800">{{ usuarioLogado.nome }}</p>
                    <p class="text-xs text-gray-500">{{ usuarioLogado.email }}</p>
                </div>
            </div>

            <!-- Abas do Dashboard -->
            <div class="flex gap-4 mb-6 border-b border-gray-200 pb-px">
                <button 
                    @click="abaAtiva = 'agendamentos'"
                    :class="[
                        'pb-4 px-2 text-sm font-bold border-b-2 cursor-pointer transition-colors',
                        abaAtiva === 'agendamentos' ? 'border-red-800 text-red-800' : 'border-transparent text-gray-500 hover:text-gray-800'
                    ]"
                >
                    📅 Agendamentos
                </button>
                <button 
                    @click="abaAtiva = 'barbeiros'"
                    :class="[
                        'pb-4 px-2 text-sm font-bold border-b-2 cursor-pointer transition-colors',
                        abaAtiva === 'barbeiros' ? 'border-red-800 text-red-800' : 'border-transparent text-gray-500 hover:text-gray-800'
                    ]"
                >
                    👥 Equipe de Barbeiros
                </button>
                <button 
                    @click="abaAtiva = 'servicos'"
                    :class="[
                        'pb-4 px-2 text-sm font-bold border-b-2 cursor-pointer transition-colors',
                        abaAtiva === 'servicos' ? 'border-red-800 text-red-800' : 'border-transparent text-gray-500 hover:text-gray-800'
                    ]"
                >
                    ✂️ Serviços e Preços
                </button>
                <button 
                    @click="abaAtiva = 'configuracoes'"
                    :class="[
                        'pb-4 px-2 text-sm font-bold border-b-2 cursor-pointer transition-colors',
                        abaAtiva === 'configuracoes' ? 'border-red-800 text-red-800' : 'border-transparent text-gray-500 hover:text-gray-800'
                    ]"
                >
                    ⚙️ Configurações
                </button>
            </div>

            <!-- ABA 1: GERENCIAR AGENDAMENTOS -->
            <div v-if="abaAtiva === 'agendamentos'" class="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-6 mb-8">
                    <h2 class="text-xl font-bold text-gray-800">Controle de Agendamentos</h2>
                    
                    <!-- Filtros -->
                    <div class="flex flex-wrap items-center gap-3">
                        <select v-model="filtroBarbeiro" class="px-3 py-2 border rounded-lg text-sm bg-white">
                            <option value="">Todos Barbeiros</option>
                            <option v-for="b in listaBarbeiros" :key="b.id" :value="b.id">{{ b.nome }}</option>
                        </select>
                        <select v-model="filtroStatus" class="px-3 py-2 border rounded-lg text-sm bg-white">
                            <option value="">Todos Status</option>
                            <option value="Agendado">Agendado</option>
                            <option value="Concluído">Concluído</option>
                            <option value="Cancelado">Cancelado</option>
                        </select>
                    </div>
                </div>

                <!-- Lista de Agendamentos -->
                <div v-if="agendamentosFiltrados.length === 0" class="text-center py-12 text-gray-500">
                    Nenhum agendamento encontrado com os filtros atuais.
                </div>

                <div v-else class="space-y-6">
                    <div 
                        v-for="ag in agendamentosFiltrados" 
                        :key="ag.id" 
                        class="border rounded-xl p-6 hover:shadow-md transition-all bg-white"
                    >
                        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                            <div class="space-y-2 w-full">
                                <div class="flex items-center gap-3 flex-wrap">
                                    <span class="font-extrabold text-gray-900">👤 Cliente: {{ ag.clienteNome }}</span>
                                    <span :class="[
                                        'px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider',
                                        ag.status === 'Agendado' ? 'bg-blue-100 text-blue-800' :
                                        ag.status === 'Concluído' ? 'bg-emerald-100 text-emerald-800' :
                                        'bg-red-100 text-red-800'
                                    ]">
                                        {{ ag.status }}
                                    </span>
                                </div>
                                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-1 text-xs text-gray-600">
                                    <div><span class="font-semibold text-gray-700">Barbeiro:</span> {{ ag.barbeiroNome }}</div>
                                    <div><span class="font-semibold text-gray-700">Serviço:</span> {{ ag.corteNome }}</div>
                                    <div><span class="font-semibold text-gray-700">Data:</span> {{ formatarData(ag.data) }}</div>
                                    <div><span class="font-semibold text-gray-700">Horário:</span> {{ ag.horario }}</div>
                                    <div><span class="font-semibold text-gray-700">Valor:</span> R$ {{ Number(ag.valor).toFixed(2) }}</div>
                                </div>
                                <div v-if="ag.descricao" class="text-xs bg-gray-50 p-2.5 rounded border border-gray-100 mt-2 text-gray-500 italic">
                                    <span class="font-bold not-italic block text-gray-700">Nota do cliente:</span> "{{ ag.descricao }}"
                                </div>
                                <!-- Exibição do Motivo de Cancelamento se cancelado -->
                                <div v-if="ag.status === 'Cancelado' && ag.motivoCancelamento" class="text-xs bg-red-50 text-red-800 p-2.5 rounded border border-red-100 mt-2">
                                    <span class="font-bold block">Motivo do Cancelamento:</span> "{{ ag.motivoCancelamento }}"
                                </div>
                            </div>

                            <!-- Botões de Ação -->
                            <div class="flex flex-wrap gap-2 justify-end items-center shrink-0">
                                <template v-if="ag.status === 'Agendado'">
                                    <!-- Ação Reagendar -->
                                    <button 
                                        @click="abrirPainelReagendar(ag)" 
                                        class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-50 cursor-pointer"
                                    >
                                        Reagendar
                                    </button>
                                    
                                    <!-- Ação Cancelar -->
                                    <button 
                                        @click="cancelarAgendamento(ag.id)" 
                                        class="px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-bold hover:bg-red-100 cursor-pointer"
                                    >
                                        Cancelar
                                    </button>
                                </template>
                                <span v-else class="text-xs text-gray-400 italic">Finalizado</span>
                            </div>
                        </div>

                        <!-- Painel Inline de Reagendamento -->
                        <div v-if="reagendamentoAtivoId === ag.id" class="mt-6 border-t pt-6 bg-gray-50 p-4 rounded-lg">
                            <h4 class="text-xs font-bold uppercase tracking-wider text-gray-600 mb-4">Escolha a nova data e horário para o reagendamento</h4>
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
                                <button @click="reagendamentoAtivoId = null" class="px-3 py-1.5 border rounded text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer bg-white">
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

            <!-- ABA 2: GERENCIAR BARBEIROS -->
            <div v-if="abaAtiva === 'barbeiros'" class="grid grid-cols-12 gap-8">
                
                <!-- Formulário de Associação/Cadastro de Barbeiros -->
                <div class="col-span-12 lg:col-span-4 bg-white rounded-2xl shadow-xl p-8">
                    <h2 class="text-xl font-bold text-gray-900 border-b pb-4 mb-6 flex items-center gap-2">
                        ➕ Adicionar Barbeiro
                    </h2>

                    <div class="mb-4">
                        <label class="block text-xs font-bold text-gray-700 mb-1">Método de Associação</label>
                        <select v-model="modoCadastroBarbeiro" class="w-full px-3 py-2.5 border rounded-lg text-sm bg-white">
                            <option value="novo">Cadastrar novo barbeiro</option>
                            <option value="vincular">Vincular barbeiro já cadastrado</option>
                        </select>
                    </div>
                    
                    <!-- Form 1: Cadastrar novo Barbeiro -->
                    <form v-if="modoCadastroBarbeiro === 'novo'" @submit.prevent="cadastrarBarbeiro" class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">Nome do Barbeiro</label>
                            <input required type="text" v-model="formBarbeiro.nome" placeholder="Ex: Lucas Barbeiro"
                                class="w-full px-3 py-2.5 border rounded-lg text-sm focus:ring-1 focus:ring-red-500 focus:outline-none bg-white">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">E-mail</label>
                            <input required type="email" v-model="formBarbeiro.email" placeholder="Ex: lucas@trimly.com"
                                class="w-full px-3 py-2.5 border rounded-lg text-sm focus:ring-1 focus:ring-red-500 focus:outline-none bg-white">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">Senha Provisória</label>
                            <input required type="password" v-model="formBarbeiro.senha" placeholder="Mínimo 3 caracteres"
                                class="w-full px-3 py-2.5 border rounded-lg text-sm focus:ring-1 focus:ring-red-500 focus:outline-none bg-white">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">Telefone / WhatsApp</label>
                            <input required type="tel" v-model="formBarbeiro.telefone" placeholder="Ex: 11999999999"
                                class="w-full px-3 py-2.5 border rounded-lg text-sm focus:ring-1 focus:ring-red-500 focus:outline-none bg-white">
                        </div>
                        <button type="submit" class="w-full py-3 bg-black hover:bg-red-800 transition-colors text-white font-bold rounded-lg text-xs cursor-pointer shadow">
                            Cadastrar Barbeiro
                        </button>
                    </form>

                    <!-- Form 2: Vincular Barbeiro existente sem barbearia -->
                    <form v-else @submit.prevent="vincularBarbeiro" class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">Barbeiros Disponíveis no Site</label>
                            <select required v-model="barbeiroSelecionadoId" class="w-full px-3 py-2.5 border rounded-lg text-sm bg-white">
                                <option value="" disabled selected>Selecione um barbeiro...</option>
                                <option v-for="b in barbeirosSemBarbearia" :key="b.id" :value="b.id">
                                    {{ b.nome }} ({{ b.email }})
                                </option>
                            </select>
                            <p v-if="barbeirosSemBarbearia.length === 0" class="text-xs text-amber-700 mt-2">
                                Não há barbeiros cadastrados sem barbearia no momento.
                            </p>
                        </div>
                        <button :disabled="barbeirosSemBarbearia.length === 0" type="submit" class="w-full py-3 bg-black hover:bg-red-800 transition-colors text-white font-bold rounded-lg text-xs cursor-pointer shadow disabled:bg-gray-300 disabled:cursor-not-allowed">
                            Vincular Barbeiro
                        </button>
                    </form>
                </div>

                <!-- Lista de Barbeiros da Barbearia -->
                <div class="col-span-12 lg:col-span-8 bg-white rounded-2xl shadow-xl p-8">
                    <h2 class="text-xl font-bold text-gray-900 border-b pb-4 mb-6">
                        Equipe Cadastrada ({{ listaBarbeiros.length }} barbeiros)
                    </h2>
                    
                    <div v-if="listaBarbeiros.length === 0" class="text-center py-12 text-gray-500 italic">
                        Nenhum barbeiro cadastrado para esta barbearia. Use o formulário ao lado para cadastrar ou vincular um.
                    </div>
                    
                    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div 
                            v-for="b in listaBarbeiros" 
                            :key="b.id"
                            class="border rounded-xl p-4 flex items-start justify-between gap-3 bg-gray-50 hover:bg-white hover:shadow-md transition-all"
                        >
                            <div class="flex items-start gap-3 overflow-hidden">
                                <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-800 font-bold shrink-0">
                                    ✂️
                                </div>
                                <div class="overflow-hidden">
                                    <p class="font-bold text-gray-900 truncate">{{ b.nome }}</p>
                                    <p class="text-xs text-gray-500 truncate">✉️ {{ b.email }}</p>
                                    <p class="text-xs text-gray-500">📞 {{ b.telefone || 'Sem telefone' }}</p>
                                </div>
                            </div>
                            <!-- Botão para Remover Barbeiro -->
                            <button 
                                @click="removerBarbeiro(b)" 
                                class="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors cursor-pointer shrink-0"
                                title="Remover Barbeiro da Barbearia"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <!-- ABA 3: GERENCIAR SERVIÇOS -->
            <div v-if="abaAtiva === 'servicos'" class="grid grid-cols-12 gap-8">
                
                <!-- Formulário de Cadastro de Serviços -->
                <div class="col-span-12 lg:col-span-4 bg-white rounded-2xl shadow-xl p-8">
                    <h2 class="text-xl font-bold text-gray-900 border-b pb-4 mb-6 flex items-center gap-2">
                        ➕ Novo Serviço
                    </h2>
                    <form @submit.prevent="cadastrarServico" class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">Descrição do Serviço</label>
                            <input required type="text" v-model="formCorte.descCorte" placeholder="Ex: Corte Americano"
                                class="w-full px-3 py-2.5 border rounded-lg text-sm focus:ring-1 focus:ring-red-500 focus:outline-none bg-white">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">Valor (R$)</label>
                            <input required type="number" step="0.01" min="0.01" v-model="formCorte.valor" placeholder="Ex: 50.00"
                                class="w-full px-3 py-2.5 border rounded-lg text-sm focus:ring-1 focus:ring-red-500 focus:outline-none bg-white">
                        </div>
                        <button type="submit" class="w-full py-3 bg-black hover:bg-red-800 transition-colors text-white font-bold rounded-lg text-xs cursor-pointer shadow">
                            Cadastrar Serviço
                        </button>
                    </form>
                </div>

                <!-- Lista de Serviços -->
                <div class="col-span-12 lg:col-span-8 bg-white rounded-2xl shadow-xl p-8">
                    <h2 class="text-xl font-bold text-gray-900 border-b pb-4 mb-6">
                        Serviços Disponíveis ({{ listaCortes.length }})
                    </h2>
                    
                    <div v-if="listaCortes.length === 0" class="text-center py-12 text-gray-500 italic">
                        Nenhum serviço cadastrado.
                    </div>
                    
                    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div 
                            v-for="c in listaCortes" 
                            :key="c.id"
                            class="border rounded-xl p-4 flex items-start justify-between gap-3 bg-gray-50 hover:bg-white hover:shadow-md transition-all"
                        >
                            <div class="flex items-start gap-3 overflow-hidden w-full">
                                <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-800 font-bold shrink-0">
                                    ✂️
                                </div>
                                <div class="overflow-hidden w-full">
                                    <div class="flex items-center justify-between gap-2">
                                        <p class="font-bold text-gray-900 truncate">{{ c.descCorte }}</p>
                                        <span :class="[
                                            'px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shrink-0',
                                            c.barbeariaId ? 'bg-amber-100 text-amber-800' : 'bg-gray-200 text-gray-800'
                                        ]">
                                            {{ c.barbeariaId ? 'Personalizado' : 'Padrão' }}
                                        </span>
                                    </div>
                                    <p class="text-sm font-bold text-gray-700 mt-2">R$ {{ Number(c.valor).toFixed(2) }}</p>
                                </div>
                            </div>
                            <!-- Botão para Excluir Serviço -->
                            <button 
                                @click="excluirCorte(c)" 
                                class="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors cursor-pointer shrink-0"
                                title="Excluir Tipo de Serviço"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <!-- ABA 4: CONFIGURAÇÕES -->
            <div v-if="abaAtiva === 'configuracoes'" class="space-y-8">
                <!-- Rebranding da Barbearia -->
                <div class="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
                    <h2 class="text-xl font-bold text-gray-900 border-b pb-4 mb-6">
                        ⚙️ Rebranding (Editar Dados da Barbearia)
                    </h2>
                    
                    <form @submit.prevent="salvarDadosBarbearia" class="max-w-xl space-y-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs font-bold text-gray-700 mb-1">Nome da Barbearia</label>
                                <input required type="text" v-model="formConfigBarbearia.nome" placeholder="Ex: Mr Cutts Premium"
                                    class="w-full px-3 py-2.5 border rounded-lg text-sm focus:ring-1 focus:ring-red-500 focus:outline-none bg-white">
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-gray-700 mb-1">Cidade</label>
                                <select required v-model="formConfigBarbearia.cidade" class="w-full px-3 py-2.5 border rounded-lg text-sm bg-white">
                                    <option value="jacarei">Jacareí</option>
                                    <option value="sjc">São José dos Campos</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 mb-1">Categoria (Estilos)</label>
                            <input required type="text" v-model="formConfigBarbearia.categoria" placeholder="Ex: Clássico, Moderno, Visagismo"
                                class="w-full px-3 py-2.5 border rounded-lg text-sm focus:ring-1 focus:ring-red-500 focus:outline-none bg-white">
                        </div>
                        <button type="submit" class="py-2.5 px-6 bg-black hover:bg-red-800 transition-colors text-white font-bold rounded-lg text-xs cursor-pointer shadow">
                            Salvar Alterações
                        </button>
                    </form>
                </div>

                <!-- Danger Zone: Encerrar Barbearia -->
                <div class="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-red-200">
                    <h2 class="text-xl font-bold text-red-800 border-b pb-4 mb-6">
                        ⚠️ Zona de Perigo (Encerrar Barbearia)
                    </h2>
                    <p class="text-sm text-gray-600 mb-6">
                        O encerramento da barbearia é uma ação <strong>definitiva e irreversível</strong>. Isso executará as seguintes operações:
                    </p>
                    <ul class="list-disc pl-6 text-xs text-gray-600 space-y-2 mb-6">
                        <li>Cancela todos os agendamentos futuros da barbearia com motivo "Barbearia encerrada".</li>
                        <li>Desvincula todos os barbeiros afiliados (eles continuam cadastrados no site, mas sem barbearia).</li>
                        <li>Exclui o registro da barbearia do sistema.</li>
                        <li><strong>Exclui permanentemente a sua conta de administrador.</strong></li>
                    </ul>
                    
                    <button 
                        @click="encerrarBarbearia" 
                        class="py-3 px-6 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg text-xs cursor-pointer shadow transition-colors"
                    >
                        Encerrar Barbearia permanentemente
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, defineProps, defineEmits } from 'vue';
import { authService, bookingService } from '@/services';

const props = defineProps({
    usuarioLogado: Object
});

const emit = defineEmits(['voltar']);

// Estados gerais
const abaAtiva = ref('agendamentos');
const barbeariaNome = ref('');
const listaBarbeiros = ref([]);
const todosAgendamentos = ref([]);

// Filtros de agendamentos
const filtroBarbeiro = ref('');
const filtroStatus = ref('');

// Configurações do Barbeiro
const modoCadastroBarbeiro = ref('novo');
const barbeirosSemBarbearia = ref([]);
const barbeiroSelecionadoId = ref('');

const formBarbeiro = reactive({
    nome: '',
    email: '',
    senha: '',
    telefone: ''
});

// Controle de Reagendamento
const reagendamentoAtivoId = ref(null);
const formReagenda = reactive({
    data: '',
    horario: ''
});
const horariosDisponiveisReagenda = ref([]);

// Formulário de Serviços e Lista de Serviços
const formCorte = reactive({
    descCorte: '',
    valor: ''
});
const listaCortes = ref([]);

// Formulário de Configuração da Barbearia
const formConfigBarbearia = reactive({
    id: null,
    nome: '',
    cidade: '',
    categoria: ''
});

// Computados
const dataMinima = computed(() => {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
});

// Filtra agendamentos por barbearia, barbeiro e status
const agendamentosFiltrados = computed(() => {
    return todosAgendamentos.value
        .filter(ag => Number(ag.barbeariaId) === Number(props.usuarioLogado.barbeariaId))
        .filter(ag => !filtroBarbeiro.value || Number(ag.barbeiroId) === Number(filtroBarbeiro.value))
        .filter(ag => !filtroStatus.value || ag.status === filtroStatus.value)
        .sort((a, b) => {
            const dataA = new Date(`${a.data}T${a.horario}`);
            const dataB = new Date(`${b.data}T${b.horario}`);
            return dataB - dataA;
        });
});

onMounted(async () => {
    try {
        // Pegar nome da barbearia
        const barbearias = await bookingService.getBarbearias();
        const b = barbearias.find(x => x.id === Number(props.usuarioLogado.barbeariaId));
        if (b) {
            barbeariaNome.value = b.nome;
            formConfigBarbearia.id = b.id;
            formConfigBarbearia.nome = b.nome;
            formConfigBarbearia.cidade = b.cidade;
            formConfigBarbearia.categoria = b.categoria;
        } else {
            barbeariaNome.value = 'Minha Barbearia';
        }

        await carregarDados();
    } catch (e) {
        console.error("Erro ao inicializar dashboard do admin:", e);
    }
});

/**
 * Carrega e atualiza todos os dados necessários no painel do administrador.
 */
async function carregarDados() {
    try {
        // Carregar barbeiros da barbearia
        const usuarios = await authService.userRepository.getUsuarios();
        listaBarbeiros.value = usuarios.filter(
            u => u.cargo === 'Barbeiro' && Number(u.barbeariaId) === Number(props.usuarioLogado.barbeariaId)
        );

        // Carregar barbeiros sem barbearia para o fluxo de vinculação
        barbeirosSemBarbearia.value = usuarios.filter(
            u => u.cargo === 'Barbeiro' && (u.barbeariaId === null || u.barbeariaId === undefined)
        );

        // Carregar agendamentos
        todosAgendamentos.value = await bookingService.getAgendamentos();

        // Carregar cortes
        listaCortes.value = await bookingService.getCortes(props.usuarioLogado.barbeariaId);
    } catch (e) {
        console.error("Erro ao carregar dados do admin:", e);
    }
}

function formatarData(dataStr) {
    if (!dataStr) return '';
    const partes = dataStr.split('-');
    if (partes.length !== 3) return dataStr;
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

// Ação 1: Cadastrar novo Barbeiro para esta barbearia
async function cadastrarBarbeiro() {
    try {
        await authService.register({
            nome: formBarbeiro.nome,
            email: formBarbeiro.email,
            senha: formBarbeiro.senha,
            telefone: formBarbeiro.telefone,
            cargo: 'Barbeiro',
            barbeariaId: Number(props.usuarioLogado.barbeariaId)
        });

        alert(`Barbeiro ${formBarbeiro.nome} cadastrado com sucesso!`);
        
        // Limpar formulário
        formBarbeiro.nome = '';
        formBarbeiro.email = '';
        formBarbeiro.senha = '';
        formBarbeiro.telefone = '';

        await carregarDados();
    } catch (error) {
        alert(error.message);
    }
}

// Ação: Vincular barbeiro existente que não possui barbearia
async function vincularBarbeiro() {
    if (!barbeiroSelecionadoId.value) {
        alert("Por favor, selecione um barbeiro para vincular.");
        return;
    }
    
    try {
        const userId = Number(barbeiroSelecionadoId.value);
        const usuarios = await authService.userRepository.getUsuarios();
        const barbeiroObj = usuarios.find(u => Number(u.id) === userId);
        
        if (!barbeiroObj) {
            throw new Error("Barbeiro não encontrado.");
        }
        
        // Vincular barbeiro à barbearia do admin
        barbeiroObj.barbeariaId = Number(props.usuarioLogado.barbeariaId);
        await authService.userRepository.updateUser(barbeiroObj);
        
        alert(`Barbeiro "${barbeiroObj.nome}" vinculado com sucesso!`);
        barbeiroSelecionadoId.value = '';
        await carregarDados();
    } catch (error) {
        alert(error.message);
    }
}

// Ação: Remover/Desvincular Barbeiro
async function removerBarbeiro(barbeiro) {
    if (!confirm(`Tem certeza de que deseja remover o barbeiro "${barbeiro.nome}" desta barbearia?\n\nA conta dele NÃO será excluída do sistema, mas ele ficará sem afiliação e todos os seus agendamentos ativos nesta barbearia serão cancelados.`)) {
        return;
    }
    
    try {
        await bookingService.desvincularBarbeiro(barbeiro.id);
        alert(`Barbeiro "${barbeiro.nome}" removido da barbearia e agendamentos cancelados.`);
        await carregarDados();
    } catch (error) {
        alert(error.message);
    }
}

// Ação 2: Cancelar agendamento pela barbearia solicitando motivo
async function cancelarAgendamento(id) {
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
        alert("Agendamento cancelado com sucesso!");
        await carregarDados();
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
        const slots = await bookingService.getSlotsDisponiveis(ag.barbeiroId, formReagenda.data, ag.id);
        horariosDisponiveisReagenda.value = slots
            .filter(s => s.disponivel)
            .map(s => s.hora);
    } catch (e) {
        console.error("Erro ao carregar horários disponíveis:", e);
    }
}

async function salvarReagendamento(id) {
    if (!formReagenda.data || !formReagenda.horario) {
        alert("Selecione a data e o horário para o reagendamento.");
        return;
    }

    try {
        await bookingService.reagendar(id, formReagenda.data, formReagenda.horario);
        alert("Agendamento atualizado com sucesso!");
        reagendamentoAtivoId.value = null;
        await carregarDados();
    } catch (error) {
        alert(error.message);
    }
}

// Ação 4: Cadastrar novo Serviço e Preço
async function cadastrarServico() {
    try {
        await bookingService.cadastrarCorte({
            descCorte: formCorte.descCorte,
            valor: formCorte.valor,
            barbeariaId: Number(props.usuarioLogado.barbeariaId)
        });

        alert(`Serviço "${formCorte.descCorte}" cadastrado com sucesso!`);
        
        // Limpar formulário
        formCorte.descCorte = '';
        formCorte.valor = '';

        await carregarDados();
    } catch (error) {
        alert(error.message);
    }
}

// Ação: Excluir corte/serviço com validação de agendamentos futuros
async function excluirCorte(corte) {
    try {
        // Verificar se há agendamentos futuros marcados para este corte
        const ativos = await bookingService.verificarAgendamentosAtivos(corte.id);
        
        if (ativos.length > 0) {
            const confirmou = confirm(
                `ATENÇÃO: O serviço "${corte.descCorte}" possui ${ativos.length} agendamento(s) ativo(s) pendente(s).\n` +
                `Se você excluir, o serviço sumirá da listagem de novos agendamentos, mas os agendamentos já marcados continuarão válidos.\n\n` +
                `Deseja realmente prosseguir com a exclusão definitiva deste serviço?`
            );
            if (!confirmou) return;
        } else {
            if (!confirm(`Deseja realmente excluir permanentemente o serviço "${corte.descCorte}"?`)) {
                return;
            }
        }

        await bookingService.excluirCorte(corte.id);
        alert(`Serviço "${corte.descCorte}" removido com sucesso.`);
        await carregarDados();
    } catch (error) {
        alert(error.message);
    }
}

// Ação: Salvar edições cadastrais da barbearia (rebranding)
async function salvarDadosBarbearia() {
    try {
        const updated = await bookingService.editarBarbearia({
            id: formConfigBarbearia.id,
            nome: formConfigBarbearia.nome,
            cidade: formConfigBarbearia.cidade,
            categoria: formConfigBarbearia.categoria
        });
        
        barbeariaNome.value = updated.nome;
        alert("Dados da barbearia alterados com sucesso!");
        await carregarDados();
    } catch (error) {
        alert(error.message);
    }
}

// Ação: Encerrar barbearia de forma definitiva (Danger zone)
async function encerrarBarbearia() {
    const confirmar1 = confirm(
        "ALERTA CRÍTICO: Tem certeza absoluta de que deseja fechar esta barbearia?\n\n" +
        "Esta ação é DEFINITIVA. Ela cancelará todos os agendamentos, desvinculará a equipe " +
        "e EXCLUIRÁ permanentemente a sua conta de administrador!"
    );
    if (!confirmar1) return;

    const confirmar2 = confirm(
        "CONFIRMAÇÃO FINAL: Deseja mesmo deletar esta barbearia e sua própria conta do sistema?"
    );
    if (!confirmar2) return;

    try {
        await bookingService.fecharBarbearia(
            Number(props.usuarioLogado.barbeariaId),
            Number(props.usuarioLogado.id)
        );
        
        alert("Barbearia encerrada com sucesso. Sua conta foi excluída.");
        // Limpar sessão e voltar para home
        await authService.logout();
        emit('voltar');
    } catch (error) {
        alert(error.message);
    }
}
</script>
