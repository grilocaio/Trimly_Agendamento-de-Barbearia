<template>
    <div class="min-h-[70vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8 bg-white p-10 shadow-xl rounded-xl">
            
            <div class="text-center">
                <h2 class="mt-6 text-3xl font-bold text-gray-900">
                    {{ isCadastro ? 'Crie sua conta' : 'Acesse sua conta' }}
                </h2>
                <p class="mt-2 text-sm text-gray-600">
                    <span v-if="!isCadastro">
                        Ou <button @click="isCadastro = true" class="font-medium text-red-700 hover:text-red-500">crie uma conta nova</button>
                    </span>
                    <span v-else>
                        Já tem uma conta? <button @click="isCadastro = false" class="font-medium text-red-700 hover:text-red-500">Faça o login</button>
                    </span>
                </p>
            </div>

            <form v-if="isCadastro" class="mt-8 space-y-6" @submit.prevent="fazerCadastro">
                <div class="rounded-md shadow-sm space-y-4">
                    <input type="text" required v-model="cadNome" placeholder="Seu Nome Completo"
                        class="appearance-none rounded block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                    
                    <input type="tel" required v-model="cadTelefone" placeholder="Telefone / WhatsApp"
                        class="appearance-none rounded block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                    
                    <input type="email" required v-model="cadEmail" placeholder="Seu E-mail"
                        class="appearance-none rounded block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                    
                    <input type="password" required v-model="cadSenha" placeholder="Crie uma Senha"
                        class="appearance-none rounded block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                </div>
                <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors">
                    Cadastrar
                </button>
            </form>

            <form v-else class="mt-8 space-y-6" @submit.prevent="fazerLogin">
                <div class="rounded-md shadow-sm space-y-4">
                    <input type="email" required v-model="logEmail" placeholder="Seu E-mail"
                        class="appearance-none rounded block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                    
                    <input type="password" required v-model="logSenha" placeholder="Sua Senha"
                        class="appearance-none rounded block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm">
                </div>
                <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-800 transition-colors">
                    Entrar
                </button>
            </form>

            <div class="text-center mt-4">
                <button @click="$emit('voltar')" class="text-sm font-medium text-gray-500 hover:text-gray-900">
                    ← Voltar para o Início
                </button>
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['voltar', 'loginSucesso']);

// Controle de qual tela mostrar
const isCadastro = ref(false);

// Variáveis do Cadastro
const cadNome = ref('');
const cadTelefone = ref('');
const cadEmail = ref('');
const cadSenha = ref('');

// Variáveis do Login
const logEmail = ref('');
const logSenha = ref('');

// FUNÇÃO 1: Salvar o Cadastro
function fazerCadastro() {
    // Puxa a lista de usuários ou cria uma lista vazia se não existir
    const usuariosSalvos = localStorage.getItem('trimly_usuarios');
    const listaUsuarios = usuariosSalvos ? JSON.parse(usuariosSalvos) : [];

    // Verifica se o e-mail já foi usado
    const emailJaExiste = listaUsuarios.find(user => user.email === cadEmail.value);
    if (emailJaExiste) {
        alert("Este e-mail já está cadastrado!");
        return;
    }

    // Cria o pacote do novo usuário
    const novoUsuario = {
        nome: cadNome.value,
        telefone: cadTelefone.value,
        email: cadEmail.value,
        senha: cadSenha.value
    };

    // Adiciona na lista e salva no navegador
    listaUsuarios.push(novoUsuario);
    localStorage.setItem('trimly_usuarios', JSON.stringify(listaUsuarios));

    alert("Cadastro realizado com sucesso! Faça seu login.");
    
    // Limpa os campos e volta para a tela de login
    cadNome.value = ''; cadTelefone.value = ''; cadEmail.value = ''; cadSenha.value = '';
    isCadastro.value = false; 
}

// FUNÇÃO 2: Validar o Login
function fazerLogin() {
    // Puxa a lista de usuários do banco
    const usuariosSalvos = localStorage.getItem('trimly_usuarios');
    const listaUsuarios = usuariosSalvos ? JSON.parse(usuariosSalvos) : [];

    // Procura alguém que tenha o mesmo email E a mesma senha
    const usuarioValido = listaUsuarios.find(user => user.email === logEmail.value && user.senha === logSenha.value);

    if (usuarioValido) {
        // Se achou, salva o NOME da pessoa como logado e avisa a página Home
        localStorage.setItem('trimly_logado', usuarioValido.nome);
        emit('loginSucesso', usuarioValido.nome);
    } else {
        alert("E-mail ou senha incorretos!");
    }
}
</script>