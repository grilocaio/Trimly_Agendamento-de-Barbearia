<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    subtitle: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },

    color: {
        type: String,
        required: false,
        default: 'text-black'
    }
})

</script>

<template>
    <div class="flex flex-col items-center gap-4 pb-12 pt-24 px-4 lg:px-16 ">
            <div class="flex gap-1 justify-center items-center">
                <p class="text-red-800 text-center lg:text-lg font-bold">{{ props.subtitle }}</p>
            </div>
            <h1 :class="props.color" class="text-center font-bold px-6 lg:px-0 text-3xl lg:text-5xl">{{ props.title }}</h1>
        </div>
</template>