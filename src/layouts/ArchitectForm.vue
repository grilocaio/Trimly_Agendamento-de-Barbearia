<template>
    <section class="ArchitectForm">
        <div class="flex flex-col justify-center gap-4 mt-24">
            <div class="flex gap-1 items-center justify-center">
                <img :src="imgRegua" class="h-5 w-5">
                <p class="text-[#8D6D25] text-center font-bold">Contact</p>
            </div>
            <h1 class="text-center font-bold px-6 lg:px-0 text-3xl lg:text-4xl">Fill This Form to Connect With Robert Fox</h1>
        </div>
        <div class="mt-11">
            <Form />
        </div>
    </section>
</template>

<script setup>
import imgRegua from '@/assets/imgRegua.png'
import Form from '@/components/Form/Form.vue'
</script>
