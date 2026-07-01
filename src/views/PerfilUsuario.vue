<template>
    <div class="bg-gray-50 py-12 px-4 lg:px-16 w-full min-h-screen">
        <div class="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden p-8 lg:p-10">
            
            <div class="text-center mb-8">
                <span class="text-xs uppercase font-extrabold tracking-wider text-red-700 bg-red-50 px-3 py-1 rounded-full">
                    Meu Perfil
                </span>
                <h1 class="text-2xl font-extrabold text-gray-900 mt-3">Editar Informações</h1>
                <p class="text-gray-500 text-xs mt-1">Atualize seus dados de contato e credenciais de acesso.</p>
            </div>

            <form @submit.prevent="salvarPerfil" class="space-y-5">
                
                <!-- Informações Não Editáveis -->
                <div class="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                    <div>
                        <span class="block text-[10px] font-bold uppercase text-gray-400">Nome Completo</span>
                        <span class="text-sm font-semibold text-gray-800">{{ usuarioLogado.nome }}</span>
                    </div>
                    <div>
                        <span class="block text-[10px] font-bold uppercase text-gray-400">E-mail (Login)</span>
                        <span class="text-sm font-semibold text-gray-800">{{ usuarioLogado.email }}</span>
                    </div>
                    <div>
                        <span class="block text-[10px] font-bold uppercase text-gray-400">Cargo / Função</span>
                        <span class="text-sm font-semibold text-gray-800 uppercase tracking-wide text-red-800">{{ usuarioLogado.cargo }}</span>
                    </div>
                </div>

                <!-- Campo Telefone (Editável) -->
                <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">Telefone / WhatsApp</label>
                    <input required type="tel" :value="form.telefone" @input="form.telefone = applyPhoneMask($event.target.value)" placeholder="Ex: 11999999999"
                        class="w-full px-3 py-2.5 border rounded-lg text-sm focus:ring-1 focus:ring-red-500 focus:outline-none bg-white text-gray-900">
                </div>

                <!-- Campo Senha Atual -->
                <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">Senha Atual (Para confirmação)</label>
                    <input required type="password" v-model="form.senhaAtual" placeholder="Digite sua senha atual"
                        class="w-full px-3 py-2.5 border rounded-lg text-sm focus:ring-1 focus:ring-red-500 focus:outline-none bg-white text-gray-900">
                </div>

                <!-- Campos de Nova Senha (Opcional) -->
                <div class="border-t pt-4 space-y-4">
                    <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Alterar Senha (Opcional)</p>
                    
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1">Nova Senha</label>
                        <input type="password" v-model="form.novaSenha" placeholder="Digite a nova senha se desejar mudar"
                            class="w-full px-3 py-2.5 border rounded-lg text-sm focus:ring-1 focus:ring-red-500 focus:outline-none bg-white text-gray-900">
                    </div>
                    
                    <div>
                        <label class="block text-xs font-bold text-gray-700 mb-1">Confirmar Nova Senha</label>
                        <input type="password" v-model="form.confirmarNovaSenha" placeholder="Confirme a nova senha"
                            class="w-full px-3 py-2.5 border rounded-lg text-sm focus:ring-1 focus:ring-red-500 focus:outline-none bg-white text-gray-900">
                    </div>
                </div>

                <!-- Botões de Ação -->
                <div class="pt-6 border-t flex flex-col gap-3">
                    <button type="submit" class="w-full py-3 bg-black hover:bg-red-800 transition-colors text-white font-bold rounded-lg text-xs cursor-pointer shadow">
                        Salvar Alterações
                    </button>
                    <button type="button" @click="$emit('voltar')" class="w-full py-3 border border-gray-300 hover:bg-gray-50 transition-colors text-gray-700 font-bold rounded-lg text-xs cursor-pointer">
                        Cancelar
                    </button>
                </div>

            </form>

            <!-- Zona de Perigo - Exclusão de Conta Própria -->
            <div class="border-t border-red-200 mt-8 pt-6 space-y-4">
                <h3 class="text-xs font-bold text-red-800 uppercase tracking-wider">⚠️ Zona de Perigo</h3>
                <p class="text-xs text-gray-500">
                    A exclusão da sua conta é <strong>permanente e irreversível</strong>. Todos os seus agendamentos ativos serão cancelados e seus dados de acesso deletados do sistema.
                </p>
                <button 
                    type="button" 
                    @click="excluirMinhaConta" 
                    class="w-full py-2.5 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 text-red-700 font-bold rounded-lg text-xs cursor-pointer transition-colors"
                >
                    Excluir minha conta permanentemente
                </button>
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, defineProps, defineEmits } from 'vue';
import { authService } from '@/services';
import { applyPhoneMask } from '@/utils/phoneMask';

const props = defineProps({
    usuarioLogado: Object
});

const emit = defineEmits(['voltar', 'perfilAtualizado', 'contaExcluida']);

const form = reactive({
    telefone: '',
    senhaAtual: '',
    novaSenha: '',
    confirmarNovaSenha: ''
});

onMounted(() => {
    form.telefone = props.usuarioLogado.telefone || '';
});

/**
 * Salva as alterações feitas no perfil do usuário ativo.
 */
async function salvarPerfil() {
    // Validar confirmação localmente
    if (form.novaSenha && form.novaSenha !== form.confirmarNovaSenha) {
        alert("Erro: A confirmação da nova senha não confere.");
        return;
    }

    try {
        const usuarioAtualizado = await authService.updateProfile(props.usuarioLogado.id, {
            telefone: form.telefone,
            senhaAtual: form.senhaAtual,
            novaSenha: form.novaSenha
        });
        alert("Perfil atualizado com sucesso!");
        emit('perfilAtualizado', usuarioAtualizado);
        emit('voltar');
    } catch (error) {
        alert(error.message);
    }
}

/**
 * Exclui permanentemente a própria conta do usuário mediante dupla confirmação de segurança.
 */
async function excluirMinhaConta() {
    const confirm1 = confirm("Tem certeza absoluta de que deseja excluir permanentemente a sua conta?\nTodos os seus dados pessoais e de acesso serão deletados do sistema Trimly!");
    if (!confirm1) return;

    const confirm2 = confirm("CONFIRMAÇÃO FINAL: Deseja realmente deletar sua conta? Esta ação é irreversível e você será deslogado imediatamente.");
    if (!confirm2) return;

    try {
        await authService.deleteAccount(props.usuarioLogado.id);
        alert("Sua conta foi excluída com sucesso.");
        emit('contaExcluida');
    } catch (error) {
        alert(error.message);
    }
}
</script>
