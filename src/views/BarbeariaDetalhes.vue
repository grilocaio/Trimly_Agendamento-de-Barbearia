<template>
    <div class="bg-gray-50 py-12 px-4 lg:px-16 w-full min-h-screen">
        <div class="max-w-6xl mx-auto">
            
            <!-- Botão de Voltar -->
            <button @click="$emit('voltar')" class="mb-8 flex items-center gap-2 text-gray-600 hover:text-red-800 transition-colors font-semibold cursor-pointer">
                ← Voltar para {{ origem === 'home' ? 'o Início' : 'Barbearias' }}
            </button>

            <!-- Card de Detalhes da Barbearia -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 mb-12">
                <div class="lg:col-span-5 h-[300px] lg:h-full relative">
                    <img :src="barbearia.imagem" :alt="barbearia.nome" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/60 to-transparent"></div>
                </div>
                <div class="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center">
                    <span class="text-xs uppercase font-bold tracking-widest text-red-700 bg-red-50 px-3 py-1 rounded-full self-start mb-4">
                        {{ barbearia.categoria }}
                    </span>
                    <h1 class="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">{{ barbearia.nome }}</h1>
                    <p class="text-gray-600 text-sm mb-6">
                        📍 Localizada em {{ barbearia.cidade === 'sjc' ? 'São José dos Campos' : 'Jacareí' }}
                    </p>
                    
                    <h3 class="text-lg font-bold text-gray-800 mb-3 border-b pb-2">Nosso Time de Barbeiros</h3>
                    <div v-if="barbeiros.length > 0" class="flex flex-wrap gap-3">
                        <div v-for="b in barbeiros" :key="b.id" class="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg border border-gray-200">
                            <span class="text-sm font-semibold text-gray-800">✄ {{ b.nome }}</span>
                        </div>
                    </div>
                    <p v-else class="text-gray-500 text-sm italic">
                        Nenhum barbeiro cadastrado para esta barbearia no momento.
                    </p>
                </div>
            </div>

            <!-- Seção de Agendamento -->
            <div class="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
                <h2 class="text-2xl lg:text-3xl font-extrabold text-gray-950 mb-6 flex items-center gap-2">
                    📅 Agende seu Horário
                </h2>

                <!-- Caso o usuário não esteja logado -->
                <div v-if="!usuarioLogado" class="text-center py-10 bg-red-50 border border-red-200 rounded-xl p-6">
                    <h3 class="text-lg font-bold text-red-900 mb-2">Quer fazer um agendamento?</h3>
                    <p class="text-red-700 text-sm mb-6">Você precisa estar logado na sua conta de cliente para reservar um horário com nossos profissionais.</p>
                    <button @click="$emit('irParaLogin')" class="px-8 py-3 bg-red-800 text-white font-bold rounded-lg shadow hover:bg-red-900 transition-all cursor-pointer">
                        Fazer Login / Cadastrar
                    </button>
                </div>

                <!-- Caso o usuário esteja logado, mas não seja Cliente -->
                <div v-else-if="usuarioLogado.cargo !== 'Cliente'" class="text-center py-10 bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <h3 class="text-lg font-bold text-amber-900 mb-2">Acesso Restrito</h3>
                    <p class="text-amber-700 text-sm">
                        Como {{ usuarioLogado.cargo }}, você não possui permissão para agendar cortes. Acesse seu painel correspondente para gerenciar a barbearia ou sua agenda.
                    </p>
                </div>

                <!-- Formulário de Agendamento do Cliente -->
                <form v-else @submit.prevent="fazerAgendamento" class="space-y-6">
                    <div class="grid grid-cols-12 gap-6">
                        
                        <!-- Seleção do Barbeiro -->
                        <div class="col-span-12 md:col-span-6">
                            <label class="block text-sm font-bold text-gray-700 mb-2">Selecione o Barbeiro</label>
                            <select required v-model="form.barbeiroId" @change="carregarHorariosDisponiveis" class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 bg-white text-sm">
                                <option value="" disabled selected>Escolha o profissional...</option>
                                <option v-for="b in barbeiros" :key="b.id" :value="b.id">{{ b.nome }}</option>
                            </select>
                            <p v-if="barbeiros.length === 0" class="text-xs text-red-600 mt-1">
                                Não é possível agendar pois não há barbeiros disponíveis.
                            </p>
                        </div>

                        <!-- Seleção do Serviço -->
                        <div class="col-span-12 md:col-span-6">
                            <label class="block text-sm font-bold text-gray-700 mb-2">Selecione o Serviço</label>
                            <select required v-model="form.corteId" class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 bg-white text-sm">
                                <option value="" disabled selected>Escolha o tipo de serviço...</option>
                                <option v-for="c in cortes" :key="c.id" :value="c.id">{{ c.descCorte }} - R$ {{ c.valor.toFixed(2) }}</option>
                            </select>
                        </div>

                        <!-- Seleção de Data -->
                        <div class="col-span-12 md:col-span-6">
                            <label class="block text-sm font-bold text-gray-700 mb-2">Escolha a Data</label>
                            <input required type="date" v-model="form.data" :min="dataMinima" @change="carregarHorariosDisponiveis"
                                class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 bg-white text-sm">
                        </div>

                        <!-- Observações/Instruções Específicas (Requisito R4) -->
                        <div class="col-span-12 md:col-span-6">
                            <label class="block text-sm font-bold text-gray-700 mb-2">Instruções Específicas / Detalhes (Opcional)</label>
                            <textarea v-model="form.descricao" rows="2" placeholder="Ex: Cabelo curto nas laterais degradê na 1. Barba desenhada..."
                                class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 bg-white text-sm"></textarea>
                        </div>

                    </div>

                    <!-- Seleção de Horários Disponíveis (Sem Conflitos) -->
                    <div v-if="form.barbeiroId && form.data" class="mt-8 border-t pt-6">
                        <label class="block text-sm font-bold text-gray-700 mb-4">
                            Horários Disponíveis para {{ barbeiroSelecionadoNome }} em {{ form.data }}
                        </label>
                        
                        <div class="grid grid-cols-12 gap-3">
                            <button
                                type="button"
                                v-for="h in listaHorariosComStatus"
                                :key="h.hora"
                                :disabled="!h.disponivel"
                                @click="form.horario = h.hora"
                                :class="[
                                    'col-span-4 sm:col-span-3 md:col-span-2 py-3 px-2 text-center rounded-lg text-sm font-semibold transition-all border cursor-pointer',
                                    !h.disponivel 
                                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through' 
                                        : form.horario === h.hora
                                            ? 'bg-red-800 text-white border-red-800 shadow-md scale-105'
                                            : 'bg-white text-gray-800 border-gray-300 hover:border-red-800 hover:text-red-800'
                                ]"
                            >
                                {{ h.hora }}
                                <span class="block text-[10px] font-normal leading-tight" v-if="!h.disponivel">Ocupado</span>
                                <span class="block text-[10px] font-normal leading-tight text-emerald-600" v-else>Livre</span>
                            </button>
                        </div>
                        <input type="hidden" required v-model="form.horario">
                        <p v-if="!form.horario" class="text-xs text-red-700 font-medium mt-3">
                            ⚠️ Por favor, selecione um dos horários livres acima.
                        </p>
                    </div>

                    <!-- Botão de Confirmação -->
                    <div class="pt-6 border-t flex justify-end">
                        <button type="submit" class="px-8 py-4 bg-black text-white hover:bg-red-800 transition-colors font-bold text-sm rounded-lg shadow-lg cursor-pointer">
                            Confirmar Agendamento ↗
                        </button>
                    </div>

                </form>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, defineProps, defineEmits } from 'vue';
import { authService, bookingService } from '@/services';

const props = defineProps({
    barbearia: Object,
    usuarioLogado: Object,
    origem: {
        type: String,
        default: 'Barbearias'
    }
});

const emit = defineEmits(['voltar', 'irParaLogin', 'agendamentoSucesso']);

// Estado de dados locais
const barbeiros = ref([]);
const cortes = ref([]);
const listaHorariosComStatus = ref([]);

// Formulário reativo
const form = reactive({
    barbeiroId: '',
    corteId: '',
    data: '',
    horario: '',
    descricao: ''
});

// Calcula a data mínima de agendamento (hoje) no fuso local
const dataMinima = computed(() => {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
});

const barbeiroSelecionadoNome = computed(() => {
    const b = barbeiros.value.find(x => x.id === Number(form.barbeiroId));
    return b ? b.nome : '';
});

onMounted(async () => {
    try {
        // Carregar barbeiros da barbearia atual
        const todosUsuarios = await authService.userRepository.getUsuarios();
        barbeiros.value = todosUsuarios.filter(
            u => u.cargo === 'Barbeiro' && Number(u.barbeariaId) === Number(props.barbearia.id)
        );

        // Carregar cortes e horários do banco
        cortes.value = await bookingService.getCortes(props.barbearia.id);
    } catch (e) {
        console.error("Erro ao carregar detalhes da barbearia:", e);
    }
});

// Carrega horários disponíveis e marca os ocupados
async function carregarHorariosDisponiveis() {
    if (!form.barbeiroId || !form.data) {
        listaHorariosComStatus.value = [];
        return;
    }

    // Limpa horário anterior selecionado se mudar barbeiro ou data
    form.horario = '';

    try {
        listaHorariosComStatus.value = await bookingService.getSlotsDisponiveis(form.barbeiroId, form.data);
    } catch (e) {
        console.error("Erro ao carregar horários disponíveis:", e);
    }
}

// Submeter o agendamento
async function fazerAgendamento() {
    if (!form.barbeiroId || !form.corteId || !form.data || !form.horario) {
        alert("Preencha todos os campos obrigatórios e escolha um horário disponível.");
        return;
    }

    // Detalhes do barbeiro e corte selecionados
    const barbeiro = barbeiros.value.find(x => x.id === Number(form.barbeiroId));
    const corte = cortes.value.find(x => x.id === Number(form.corteId));

    try {
        await bookingService.fazerAgendamento({
            clienteId: props.usuarioLogado.id,
            clienteNome: props.usuarioLogado.nome,
            barbeiroId: Number(form.barbeiroId),
            barbeiroNome: barbeiro.nome,
            barbeariaId: Number(props.barbearia.id),
            barbeariaNome: props.barbearia.nome,
            corteId: Number(form.corteId),
            corteNome: corte.descCorte,
            valor: corte.valor,
            data: form.data,
            horario: form.horario,
            descricao: form.descricao
        });

        alert(`Agendamento realizado com sucesso para o dia ${form.data} às ${form.horario} com o barbeiro ${barbeiro.nome}!`);
        
        // Emitir sucesso
        emit('agendamentoSucesso');
    } catch (error) {
        alert(error.message);
        await carregarHorariosDisponiveis();
    }
}
</script>
