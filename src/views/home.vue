<template>
  <Header 
      :usuario="usuarioLogado" 
      @abrirLogin="telaAtual = 'login'" 
      @sair="fazerLogout"
      @navegar="navegarPara"
  />
  
  <!-- Página Inicial -->
  <div v-if="telaAtual === 'home'">
      <Hero @buscar="irParaBusca" />
      <br>
      <Cards/>
      <Imagens @verBarbearia="irParaDetalhesBarbeariaPorId" />
  </div>
    
  <!-- Listagem de Barbearias -->
  <Barbearias 
      v-if="telaAtual === 'Barbearias'" 
      @voltar="telaAtual = 'home'"
      @selecionarBarbearia="irParaDetalhesBarbearia"
      :cidade="cidadeDaBusca" 
      :estado="estadoDaBusca" 
  />

  <!-- Detalhes da Barbearia & Agendamento -->
  <BarbeariaDetalhes
      v-if="telaAtual === 'barbearia_detalhe'"
      :barbearia="barbeariaSelecionada"
      :usuarioLogado="usuarioLogado"
      :origem="origemDetalhes"
      @voltar="telaAtual = origemDetalhes"
      @irParaLogin="telaAtual = 'login'"
      @agendamentoSucesso="telaAtual = 'client_agendamentos'"
  />

  <!-- Agendamentos do Cliente -->
  <ClienteAgendamentos
      v-if="telaAtual === 'client_agendamentos' && usuarioLogado && usuarioLogado.cargo === 'Cliente'"
      :usuarioLogado="usuarioLogado"
      @voltar="telaAtual = 'home'"
  />

  <!-- Painel do Administrador -->
  <AdminDashboard
      v-if="telaAtual === 'admin_dashboard' && usuarioLogado && usuarioLogado.cargo === 'Administrador'"
      :usuarioLogado="usuarioLogado"
      @voltar="telaAtual = 'home'"
  />

  <!-- Painel do Barbeiro -->
  <BarbeiroDashboard
      v-if="telaAtual === 'barbeiro_dashboard' && usuarioLogado && usuarioLogado.cargo === 'Barbeiro'"
      :usuarioLogado="usuarioLogado"
      @voltar="telaAtual = 'home'"
  />

  <!-- Tela de Perfil do Usuário -->
  <PerfilUsuario
      v-if="telaAtual === 'perfil_usuario' && usuarioLogado"
      :usuarioLogado="usuarioLogado"
      @voltar="telaAtual = 'home'"
      @perfilAtualizado="usuarioObj => usuarioLogado = usuarioObj"
  />

  <!-- Tela de Login -->
  <Login 
      v-if="telaAtual === 'login'" 
      @voltar="telaAtual = 'home'" 
      @loginSucesso="entrarNoSistema"
  />
  <Footer />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Header from '@/components/Header.vue';
import Hero from '@/layouts/Hero.vue';
import Imagens from '@/layouts/Imagens.vue';
import Footer from '@/components/Footer.vue';
import Barbearias from '@/views/Barbearias.vue'; 
import Login from '@/views/Login.vue';
import Cards from '@/layouts/Cards.vue';

// Importação das novas telas
import BarbeariaDetalhes from '@/views/BarbeariaDetalhes.vue';
import ClienteAgendamentos from '@/views/ClienteAgendamentos.vue';
import AdminDashboard from '@/views/AdminDashboard.vue';
import BarbeiroDashboard from '@/views/BarbeiroDashboard.vue';
import PerfilUsuario from '@/views/PerfilUsuario.vue';

import { authService, bookingService } from '@/services';
import { RoleStrategyContext } from '@/strategies/RoleStrategy';

const telaAtual = ref('home');
const estadoDaBusca = ref('');
const cidadeDaBusca = ref('');

// Usuário logado é um objeto completo: { id, nome, email, cargo, barbeariaId }
const usuarioLogado = ref(null);
const barbeariaSelecionada = ref(null);
const origemDetalhes = ref('Barbearias');

onMounted(() => {
    carregarUsuarioLogado();
});

function carregarUsuarioLogado() {
    usuarioLogado.value = authService.getCurrentUser();
}

// Quando o usuário pesquisa/filtra barbearias pelo Hero
function irParaBusca(estado, cidade) {
    estadoDaBusca.value = estado;
    cidadeDaBusca.value = cidade;
    telaAtual.value = 'Barbearias';
}

// Detalhes a partir da listagem completa de Barbearias
function irParaDetalhesBarbearia(barbearia) {
    barbeariaSelecionada.value = barbearia;
    origemDetalhes.value = 'Barbearias';
    telaAtual.value = 'barbearia_detalhe';
}

// Detalhes a partir de cliques diretos nos cards do Home
async function irParaDetalhesBarbeariaPorId(id) {
    try {
        const barbearias = await bookingService.getBarbearias();
        const b = barbearias.find(x => x.id === Number(id));
        if (b) {
            barbeariaSelecionada.value = b;
            origemDetalhes.value = 'home';
            telaAtual.value = 'barbearia_detalhe';
        }
    } catch (e) {
        console.error("Erro ao carregar barbearia por ID:", e);
    }
}

// Monitora a troca de telas para rolar a página para o topo automaticamente
watch(telaAtual, (novaTela) => {
    if (novaTela === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        window.scrollTo(0, 0);
    }
});

function navegarPara(tela) {
    if (tela === 'Barbearias') {
        telaAtual.value = 'home';
        setTimeout(() => {
            const el = document.getElementById('nossas-barbearias');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    } else if (tela === 'home') {
        if (telaAtual.value === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            telaAtual.value = 'home';
        }
    } else {
        telaAtual.value = tela;
    }
}

// Recebe o objeto do Usuário após login bem sucedido
function entrarNoSistema(usuarioObj) {
    usuarioLogado.value = usuarioObj;
    
    // Redireciona usando Strategy baseada no cargo
    const strategy = RoleStrategyContext.getStrategy(usuarioObj.cargo);
    telaAtual.value = strategy.getDashboardView();
}

// Limpa todas as chaves de sessão e redefine tela
async function fazerLogout() {
    await authService.logout();
    usuarioLogado.value = null;
    telaAtual.value = 'home';
}
</script>