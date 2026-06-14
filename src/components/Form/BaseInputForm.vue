<script setup>
const model = defineModel()

defineProps({
    type: {
        type: String,
        default: 'text'
    },

    placeholder: {
        type: String,
        default: ''
    }
})
</script>

<template>
    <input
        v-model="model"
        :type="type"
        :placeholder="placeholder"
        class="
            w-full
            border border-gray-700
            bg-transparent
            text-white
            px-4 py-4
            outline-none
            transition
            focus:border-[#8D6D25]
        "
    >
</template>