<template>
    <div class="min-h-[70vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8 bg-white p-10 shadow-xl rounded-xl">
            
            <div class="text-center">
                <h2 class="text-3xl font-bold text-gray-900">
                    {{ isCadastro ? 'Crie sua conta' : 'Acesse sua conta' }}
                </h2>
                <p class="mt-2 text-sm text-gray-600">
                    <span v-if="!isCadastro">
                        Ou <button @click="isCadastro = true" class="font-medium text-red-700 hover:text-red-500 cursor-pointer">crie uma conta nova</button>
                    </span>
                    <span v-else>
                        Já tem uma conta? <button @click="isCadastro = false" class="font-medium text-red-700 hover:text-red-500 cursor-pointer">Faça o login</button>
                    </span>
                </p>
            </div>

            <!-- Formulário de Cadastro -->
            <form v-if="isCadastro" class="mt-8 space-y-4" @submit.prevent="fazerCadastro">
                <div class="rounded-md shadow-sm space-y-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">Tipo de Conta</label>
                        <select v-model="cadCargo" class="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm bg-white">
                            <option value="Cliente">Cliente (Quero agendar cortes)</option>
                            <option value="Barbeiro">Barbeiro (Trabalho em uma barbearia)</option>
                        </select>
                    </div>

                    <!-- Dropdown de Barbearia apenas para Barbeiro -->
                    <div v-if="cadCargo === 'Barbeiro'">
                        <label class="block text-sm font-semibold text-gray-700 mb-1">Selecione sua Barbearia</label>
                        <select required v-model="cadBarbeariaId" class="block w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm bg-white">
                            <option value="" disabled selected>Escolha a barbearia onde você trabalha</option>
                            <option v-for="b in barbearias" :key="b.id" :value="b.id">{{ b.nome }} ({{ b.cidade.toUpperCase() }})</option>
                        </select>
                    </div>

                    <input type="text" required v-model="cadNome" placeholder="Seu Nome Completo"
                        class="appearance-none rounded block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                    
                    <input type="tel" required :value="cadTelefone" @input="cadTelefone = applyPhoneMask($event.target.value)" placeholder="Telefone / WhatsApp" maxlength="15"
                        class="appearance-none rounded block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                    
                    <input type="email" required v-model="cadEmail" placeholder="Seu E-mail"
                        class="appearance-none rounded block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                    
                    <input type="password" required v-model="cadSenha" placeholder="Crie uma Senha"
                        class="appearance-none rounded block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                </div>

                <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors cursor-pointer font-bold">
                    Cadastrar
                </button>
            </form>

            <!-- Formulário de Login -->
            <form v-else class="mt-8 space-y-6" @submit.prevent="fazerLogin">
                <div class="rounded-md shadow-sm space-y-4">
                    <input type="email" required v-model="logEmail" placeholder="Seu E-mail"
                        class="appearance-none rounded block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                    
                    <input type="password" required v-model="logSenha" placeholder="Sua Senha"
                        class="appearance-none rounded block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                </div>

                <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-800 transition-colors cursor-pointer font-bold">
                    Entrar
                </button>
            </form>

            <div class="text-center mt-4">
                <button @click="$emit('voltar')" class="text-sm font-medium text-gray-500 hover:text-gray-900 cursor-pointer">
                    ← Voltar para o Início
                </button>
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import { authService, bookingService } from '@/services';
import { applyPhoneMask } from '@/utils/phoneMask';

const emit = defineEmits(['voltar', 'loginSucesso']);

// Controle de qual tela mostrar
const isCadastro = ref(false);

// Listagem de Barbearias para o cadastro de barbeiro
const barbearias = ref([]);

// Variáveis do Cadastro
const cadNome = ref('');
const cadTelefone = ref('');
const cadEmail = ref('');
const cadSenha = ref('');
const cadCargo = ref('Cliente');
const cadBarbeariaId = ref('');

// Variáveis do Login
const logEmail = ref('');
const logSenha = ref('');

onMounted(async () => {
    try {
        barbearias.value = await bookingService.getBarbearias();
    } catch (e) {
        console.error("Erro ao carregar barbearias:", e);
    }
});

// FUNÇÃO 1: Salvar o Cadastro
async function fazerCadastro() {
    try {
        await authService.register({
            nome: cadNome.value,
            email: cadEmail.value,
            senha: cadSenha.value,
            telefone: cadTelefone.value,
            cargo: cadCargo.value,
            barbeariaId: cadCargo.value === 'Barbeiro' ? Number(cadBarbeariaId.value) : null
        });

        alert("Cadastro realizado com sucesso! Faça seu login.");
        
        // Limpa os campos e volta para a tela de login
        cadNome.value = ''; 
        cadTelefone.value = ''; 
        cadEmail.value = ''; 
        cadSenha.value = '';
        cadCargo.value = 'Cliente';
        cadBarbeariaId.value = '';
        isCadastro.value = false; 
    } catch (error) {
        alert(error.message);
    }
}

// FUNÇÃO 2: Validar o Login
async function fazerLogin() {
    try {
        const usuarioValido = await authService.login(logEmail.value, logSenha.value);
        emit('loginSucesso', usuarioValido);
    } catch (error) {
        alert(error.message);
    }
}
</script>
