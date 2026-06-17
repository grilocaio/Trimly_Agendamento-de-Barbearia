<template>
    <header>
        <div class="bg-white border-b border-b-gray-200 lg:border-b-0 h-20 w-full lg:bg-black">
            <div class="flex justify-between h-20 lg:grid grid-cols-12">
                
                <div class="hidden lg:flex items-center bg-gray-200 [clip-path:polygon(0_0,100%_0,75%_100%,0_100%)] h-20 pl-16 pr-8 w-auto col-span-2">
                    <img :src="logo" alt="imgTrimly" class="h-12 w-auto object-contain">
                </div>
                
                <div class="flex items-center justify-center px-4 py-2 lg:hidden shrink-0 font-bold text-xl">
                    Trimly
                </div>

                <nav class="hidden lg:flex items-center justify-center gap-8 col-span-8 text-white font-medium">
                    <a href="#" class="hover:text-red-800 transition-colors">Home</a>
                    <a href="#" class="hover:text-red-800 transition-colors">Barbearias</a>
                    <a href="#" class="hover:text-red-800 transition-colors">About Us</a>
                </nav>

                <div class="flex items-center justify-end px-4 lg:hidden">
                    <button class="flex items-center justify-center bg-red-800 rounded-lg p-2" @click="abrirMenu">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-8 h-8" fill="none">
                            <path d="M10 17H38" stroke="white" stroke-width="3" stroke-linecap="round" />
                            <path d="M10 24H38" stroke="white" stroke-width="3" stroke-linecap="round" />
                            <path d="M10 31H26" stroke="white" stroke-width="3" stroke-linecap="round" />
                        </svg>
                    </button>
                </div>

                <div class="hidden lg:flex items-center justify-end pr-8 col-span-2">
                    
                    <div v-if="usuario" class="flex items-center gap-4 text-white">
                        <span class="font-medium text-sm">
                            Olá, {{ usuario }}
                        </span>
                        <button @click="$emit('sair')" class="bg-red-700 hover:bg-red-600 px-4 py-2 rounded-lg font-bold transition-colors">
                            Sair
                        </button>
                    </div>

                    <div v-else>
                        <Button text="Login" @click="$emit('abrirLogin')">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3-6 3 3m0 0-3 3m3-3H9" />
                            </svg>
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    </header>

    <div v-if="menuAberto" @click="fecharMenu" class="fixed inset-0 bg-black/50 z-20 lg:hidden"></div>

    <aside :class="[
        'fixed top-0 right-0 h-full w-64 bg-white text-black z-30 transition-transform lg:hidden',
        menuAberto ? 'translate-x-0' : 'translate-x-full'
    ]">
        <div class="p-4">
            <button @click="fecharMenu" class="text-gray-500 hover:text-black mb-8 font-bold">X Fechar</button>

            <nav class="flex flex-col gap-6">
                <a href="#" class="font-medium hover:text-red-800">Home</a>
                <a href="#" class="font-medium hover:text-red-800">Barbearias</a>
                <a href="#" class="font-medium hover:text-red-800">About Us</a>
                
                <hr class="border-gray-200">
                
                <div v-if="usuario" class="flex flex-col gap-4">
                    <span class="text-gray-600">Logado como: <br> <b>{{ usuario }}</b></span>
                    <button @click="$emit('sair'); fecharMenu()" class="bg-red-700 text-white px-4 py-2 rounded-lg font-bold">Sair</button>
                </div>
                <button v-else @click="$emit('abrirLogin'); fecharMenu()" class="bg-black text-white px-4 py-2 rounded-lg font-bold">
                    Fazer Login
                </button>
            </nav>
        </div>
    </aside>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue';
import logo from '@/assets/imgTrimly.png';
import Button from './Button.vue';

const props = defineProps({
    usuario: String
});

const emit = defineEmits(['abrirLogin', 'sair']);
const menuAberto = ref(false);

function abrirMenu() {
    menuAberto.value = true;
}

function fecharMenu() {
    menuAberto.value = false;
}
</script>