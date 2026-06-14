<script setup>
const model = defineModel()

defineProps({
    placeholder: {
        type: String,
        default: ''
    }
})
</script>

<template>
    <textarea
        v-model="model"
        :placeholder="placeholder"
        class="
            w-full
            h-48
            border border-gray-700
            bg-transparent
            text-white
            px-4 py-4
            outline-none
            resize-none
            transition
            focus:border-[#8D6D25]
        "
    ></textarea>
</template>