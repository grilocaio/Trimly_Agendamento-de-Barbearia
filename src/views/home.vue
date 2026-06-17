<template>
  <Header 
      :usuario="usuarioLogado" 
      @abrirLogin="telaAtual = 'login'" 
      @sair="fazerLogout" 
  />
  <div v-if="telaAtual === 'home'">
      <Hero @buscar="irParaBusca" />
      <br>
      <Cards/>
      <Imagens />
    </div>
    
    <Barbearias 
    v-if="telaAtual === 'Barbearias'" 
    @voltar="telaAtual = 'home'"
    :cidade="cidadeDaBusca" 
      :estado="estadoDaBusca" 
  />

  <Login 
      v-if="telaAtual === 'login'" 
      @voltar="telaAtual = 'home'" 
      @loginSucesso="entrarNoSistema"
  />
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Header from '@/components/Header.vue';
import Hero from '@/layouts/Hero.vue';
import Imagens from '@/layouts/Imagens.vue';
import Footer from '@/components/Footer.vue';
import Barbearias from '@/views/Barbearias.vue'; 
import Login from '@/views/Login.vue';
import Cards from '@/layouts/Cards.vue';

const telaAtual = ref('home');
const estadoDaBusca = ref('');
const cidadeDaBusca = ref('');

// Variável que agora vai guardar o NOME da pessoa
const usuarioLogado = ref(null);

// Assim que o site abre, ele checa se tem o NOME salvo
onMounted(() => {
    usuarioLogado.value = localStorage.getItem('trimly_logado');
});

function irParaBusca(estado, cidade) {
    estadoDaBusca.value = estado;
    cidadeDaBusca.value = cidade;
    telaAtual.value = 'Barbearias';
}

// Recebe o NOME da tela de login e ativa o Header
function entrarNoSistema(nomeDaPessoa) {
    usuarioLogado.value = nomeDaPessoa;
    telaAtual.value = 'home';
}

// Quando clica em sair, ele apaga a chave certa
function fazerLogout() {
    localStorage.removeItem('trimly_logado');
    usuarioLogado.value = null;
    telaAtual.value = 'home';
}
</script>