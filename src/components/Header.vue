<template>
    <header>
        <div class="bg-white border-b border-b-gray-200 lg:border-b-0 h-20 w-full lg:bg-black">

            <div class="flex justify-between h-20 lg:grid grid-cols-12">
                <!--logo LG-->
                <div
                    class="hidden lg:flex items-center bg-gray-200 [clip-path:polygon(0_0,100%_0,75%_100%,0_100%)] h-20 pl-16 pr-8 w-auto col-span-2">
                    Logo
                </div>
                <!--logo SM-->
                <div class="flex items-center justify-center px-4 py-2 lg:hidden shrink-0">
                    Logo SM
                </div>
                <div class="flex items-center justify-end text-white px-4 col-span-1 lg:hidden">
                    <button class="lg:hidden flex items-center jusitfy-center bg-[#8D6D25] rounded-lg"
                        @click="abrirMenu">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-12 h-12" fill="none">
                            <!-- linhas -->
                            <path d="M10 17H38" stroke="white" stroke-width="3" stroke-linecap="round" />

                            <path d="M10 24H38" stroke="white" stroke-width="3" stroke-linecap="round" />

                            <path d="M10 31H26" stroke="white" stroke-width="3" stroke-linecap="round" />
                        </svg>
                    </button>
                </div>
                <div class="hidden lg:flex lg:col-span-10 lg:items-center lg:justify-between lg:px-16">
                    <nav class="flex gap-8 text-white">
                        <a href="#home" class="nav-link font-semibold hover:text-[#8D6D25]">Home</a>
                        <a href="#architects" class="nav-link font-semibold hover:text-[#8D6D25]">Barbearias</a>
                        <a href="#aboutUs" class="nav-link font-semibold hover:text-[#8D6D25]">About Us</a>
                    </nav>
                    <div class="flex items-center gap-4 text-white">
                        <Button text="Login" @click="$emit('join')">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3-6 3 3m0 0-3 3m3-3H9" />
                            </svg>
                        </Button>

                    </div>
                </div>
            </div>
        </div>
    </header>

    <div v-if="menuAberto" @click="fecharMenu" class="fixed inset-0 bg-black/50 z-20"></div>

    <!-- menu lateral -->
    <aside :class="[
        'fixed top-0 right-0 h-full w-64 bg-white text-black z-30 transition-transform',
        menuAberto ? 'translate-x-0' : 'translate-x-full'
    ]">
        <div class="p-4">
            <button @click="fecharMenu">Fechar</button>

            <nav class="flex flex-col gap-4 mt-6">
                <a href="#">Home</a>
                <a href="#">Barbearias</a>
                <a href="#">About</a>
            </nav>
        </div>
    </aside>
</template>

<script setup>
import { ref } from 'vue';
import logo from '@/assets/imgLogo.png'
import Button from './Button.vue'

const menuAberto = ref(false)

function abrirMenu() {
    menuAberto.value = true
}

function fecharMenu() {
    menuAberto.value = false
}
</script>