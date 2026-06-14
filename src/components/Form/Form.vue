<script setup>
import { reactive } from 'vue'

import BaseInput from '@/components/Form/BaseInputForm.vue'
import BaseTextarea from '@/components/Form/BaseTextAreaForm.vue'

const form = reactive({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',
    city: '',
    request: ''
})

function submitForm() {
    console.log(form)
}
</script>

<template>
    <section class="form">
        <div class="bg-black p-16 mx-40">
            <form
                @submit.prevent="submitForm"
                class="max-w-6xl mx-auto flex flex-col gap-6"
            >

                <!-- GRID -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <BaseInput
                        v-model="form.firstName"
                        placeholder="First name"
                    />

                    <BaseInput
                        v-model="form.lastName"
                        placeholder="Last name"
                    />

                    <BaseInput
                        v-model="form.email"
                        type="email"
                        placeholder="Your Email"
                    />

                    <BaseInput
                        v-model="form.phone"
                        type="tel"
                        placeholder="Phone number"
                    />

                    <BaseInput
                        v-model="form.zipCode"
                        placeholder="Zip code"
                    />

                    <BaseInput
                        v-model="form.city"
                        placeholder="Project city"
                    />

                </div>

                <!-- TEXTAREA -->
                <BaseTextarea
                    v-model="form.request"
                    placeholder="Your request"
                />

                <!-- BUTTON -->
                <div class="flex justify-center">
                    <button
                        type="submit"
                        class="
                            bg-white
                            text-[#8D6D25]
                            px-10 py-4
                            transition
                            hover:bg-[#8D6D25]
                            hover:text-white
                        "
                    >
                        Click here ↗
                    </button>
                </div>

            </form>
        </div>
    </section>
</template>