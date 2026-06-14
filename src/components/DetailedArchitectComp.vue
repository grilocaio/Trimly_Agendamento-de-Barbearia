<template>
    <div class="flex items-center w-full gap-16 px-16">
        <img :src="RobertFox" alt="Robert Fox" class="w-110 h-120 border border-12 border-white translate-y-32">
        <div class="text-white w-full pt-24">
            <div class="flex flex-col gap-4">
                <div class="flex justify-between">
                    <div class="flex items-center gap-4">
                        <h1 class="font-bold text-3xl">{{ props.name }}</h1>
                        <p class="text-xl">⭐ {{ props.rating }}</p>
                    </div>
                    <nav class="flex gap-3">
                        <a href="#"><img :src="iconYT" alt="YouTube" class="w-10 h-10"></a>
                        <a href="#"><img :src="iconIG" alt="Instagram" class="w-10 h-10"></a>
                        <a href="#"><img :src="iconTT" alt="Twitter" class="w-10 h-10"></a>
                        <a href="#"><img :src="iconFB" alt="Facebook" class="w-10 h-10"></a>
                    </nav>
                </div>
                <div class="flex gap-2">
                    ❓
                    <p class="text-xl">{{ props.loc }}</p>
                </div>
                <p class="text-xl">{{ props.desc }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import iconYT from '@/assets/iconYT.png'
import iconTT from '@/assets/iconTT.png'
import iconIG from '@/assets/iconIG.png'
import iconFB from '@/assets/iconFB.png'
import imgBGTitulo from '@/assets/imgBGFooter.png'
import RobertFox from '@/assets/imgRobertFox.png'
import { defineProps } from 'vue';

const props = defineProps({
  image : {
    type: String,
    required: true
  },

  name : {
    type: String,
    required: true
  },

  rating : {
    type: Number,
    required: true
  },

  loc : {
    type: String,
    required: true
  },

  desc : {
    type: String,
    required: true
  }
})

</script>