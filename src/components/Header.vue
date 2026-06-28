<template>
    <header :class="[
        'sticky top-0 z-30 w-full transition-transform duration-300',
        isHidden ? '-translate-y-full' : 'translate-y-0'
    ]">
        <div class="bg-black border-b border-b-gray-900 h-20 w-full">
            <div class="flex justify-between h-20 lg:grid grid-cols-12">
                
                <div class="hidden lg:flex items-center bg-gray-200 [clip-path:polygon(0_0,100%_0,75%_100%,0_100%)] h-20 pl-16 pr-8 w-auto col-span-2">
                    <img :src="logo" alt="imgTrimly" class="h-12 w-auto object-contain">
                </div>
                
                <div class="flex lg:hidden items-center bg-gray-200 [clip-path:polygon(0_0,100%_0,80%_100%,0_100%)] h-20 pl-6 pr-10 w-auto shrink-0">
                    <img :src="logo" alt="imgTrimly" class="h-10 w-auto object-contain">
                </div>

                <nav class="hidden lg:flex items-center justify-center gap-8 col-span-8 text-white font-medium">
                    <a href="#" @click.prevent="$emit('navegar', 'home')" class="hover:text-red-800 transition-colors cursor-pointer">Home</a>
                    <a href="#" @click.prevent="$emit('navegar', 'Barbearias')" class="hover:text-red-800 transition-colors cursor-pointer">Barbearias</a>
                    
                    <!-- Links específicos baseados no Cargo -->
                    <template v-if="usuario">
                        <a v-if="usuario.cargo === 'Cliente'" href="#" @click.prevent="$emit('navegar', 'client_agendamentos')" class="hover:text-red-800 transition-colors cursor-pointer">Meus Agendamentos</a>
                        <a v-if="usuario.cargo === 'Administrador'" href="#" @click.prevent="$emit('navegar', 'admin_dashboard')" class="hover:text-amber-500 transition-colors cursor-pointer text-amber-400 font-bold">★ Painel Admin</a>
                        <a v-if="usuario.cargo === 'Barbeiro'" href="#" @click.prevent="$emit('navegar', 'barbeiro_dashboard')" class="hover:text-emerald-500 transition-colors cursor-pointer text-emerald-400 font-bold">✄ Minha Agenda</a>
                    </template>
                </nav>

                <div class="flex items-center justify-end px-4 lg:hidden">
                    <button class="flex items-center justify-center bg-red-800 rounded-lg p-2 cursor-pointer" @click="abrirMenu">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-8 h-8" fill="none">
                            <path d="M10 17H38" stroke="white" stroke-width="3" stroke-linecap="round" />
                            <path d="M10 24H38" stroke="white" stroke-width="3" stroke-linecap="round" />
                            <path d="M10 31H26" stroke="white" stroke-width="3" stroke-linecap="round" />
                        </svg>
                    </button>
                </div>

                <div class="hidden lg:flex items-center justify-end pr-8 col-span-2">
                    
                    <div v-if="usuario" class="flex items-center gap-4 text-white">
                        <span class="font-medium text-sm cursor-pointer hover:text-red-500 transition-colors flex items-center gap-1" @click="$emit('navegar', 'perfil_usuario')" title="Editar meu perfil">
                            👤 {{ usuario.nome || usuario }}
                        </span>
                        <Button text="Sair" @click="$emit('sair')" class="cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3-6 3 3m0 0-3 3m3-3H9" />
                            </svg>
                        </Button>
                    </div>

                    <div v-else>
                        <Button text="Login" @click="$emit('abrirLogin')" class="cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3-6 3 3m0 0-3 3m3-3H9" />
                            </svg>
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    </header>

    <div v-if="menuAberto" @click="fecharMenu" class="fixed inset-0 bg-black/50 z-40 lg:hidden"></div>

    <aside :class="[
        'fixed top-0 right-0 h-full w-64 bg-white text-black z-50 transition-transform lg:hidden',
        menuAberto ? 'translate-x-0' : 'translate-x-full'
    ]">
        <div class="p-4">
            <button @click="fecharMenu" class="text-gray-500 hover:text-black mb-8 font-bold cursor-pointer">X Fechar</button>

            <nav class="flex flex-col gap-6">
                <a href="#" @click.prevent="$emit('navegar', 'home'); fecharMenu()" class="font-medium hover:text-red-800">Home</a>
                <a href="#" @click.prevent="$emit('navegar', 'Barbearias'); fecharMenu()" class="font-medium hover:text-red-800">Barbearias</a>
                
                <template v-if="usuario">
                    <a v-if="usuario.cargo === 'Cliente'" href="#" @click.prevent="$emit('navegar', 'client_agendamentos'); fecharMenu()" class="font-medium hover:text-red-800">Meus Agendamentos</a>
                    <a v-if="usuario.cargo === 'Administrador'" href="#" @click.prevent="$emit('navegar', 'admin_dashboard'); fecharMenu()" class="font-medium text-amber-600 font-bold hover:text-amber-800">★ Painel Admin</a>
                    <a v-if="usuario.cargo === 'Barbeiro'" href="#" @click.prevent="$emit('navegar', 'barbeiro_dashboard'); fecharMenu()" class="font-medium text-emerald-600 font-bold hover:text-emerald-800">✄ Minha Agenda</a>
                </template>
                
                <hr class="border-gray-200">
                
                <div v-if="usuario" class="flex flex-col gap-3">
                    <span class="text-gray-600 text-xs">Logado como: <br> <b>{{ usuario.nome || usuario }}</b> ({{ usuario.cargo }})</span>
                    <button @click="$emit('navegar', 'perfil_usuario'); fecharMenu()" class="bg-gray-100 border text-gray-800 px-4 py-2 rounded-lg font-bold cursor-pointer hover:bg-gray-200 text-xs">Editar Perfil</button>
                    <button @click="$emit('sair'); fecharMenu()" class="bg-red-700 text-white px-4 py-2 rounded-lg font-bold cursor-pointer hover:bg-red-800 text-xs">Sair</button>
                </div>
                <button v-else @click="$emit('abrirLogin'); fecharMenu()" class="bg-black text-white px-4 py-2 rounded-lg font-bold cursor-pointer">
                    Fazer Login
                </button>
            </nav>
        </div>
    </aside>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineEmits, defineProps } from 'vue';
import logo from '@/assets/imgTrimly.png';
import Button from './Button.vue';

const props = defineProps({
    usuario: Object // Pode ser String (legado) ou Object completo
});

const emit = defineEmits(['abrirLogin', 'sair', 'navegar']);
const menuAberto = ref(false);
const isHidden = ref(false);
let lastScrollY = 0;

function abrirMenu() {
    menuAberto.value = true;
}

function fecharMenu() {
    menuAberto.value = false;
}

function handleScroll() {
    const currentScrollY = window.scrollY;
    
    // Mantém sempre visível se estiver muito próximo ao topo
    if (currentScrollY <= 50) {
        isHidden.value = false;
        lastScrollY = currentScrollY;
        return;
    }

    if (currentScrollY > lastScrollY) {
        // Deslizar para baixo -> Esconder Header
        isHidden.value = true;
    } else {
        // Deslizar para cima -> Mostrar Header
        isHidden.value = false;
    }
    lastScrollY = currentScrollY;
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>