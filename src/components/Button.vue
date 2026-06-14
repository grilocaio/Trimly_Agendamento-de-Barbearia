<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    text: {
        type: String,
        required: true
    },
    
    color : {
        type: String,
        required: false,
        default: '#8D6D25'
    },
    textColor : {
        type: String,
        required: false,
        default: 'text-white'
    }
})

</script>
<template>
    <div class="flex items-center">
        <button :class="props.color" class="bg-red-800 flex text-white items-center  py-3 px-6 gap-2">
            <p :class="props.textColor">{{ text }}</p>
            
            <slot />
        </button>
    </div>
</template>

