<template>
    <section class="tituloPag">
        <div class="bg-cover bg-center flex items-center justify-center w-full h-[345px]" :style="{backgroundImage: `url(${imgBGTitulo})`}">
            <h1 class="text-4xl text-white font-bold text-center">About Us</h1>
        </div>
    </section>
</template>

<script setup>
import imgBGTitulo from '@/assets/imgBGFooter.png'
</script>