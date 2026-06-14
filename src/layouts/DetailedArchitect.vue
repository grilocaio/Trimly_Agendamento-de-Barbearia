<template>
    <section class="DetailedArchitect">
        <div class="bg-cover bg-center w-full h-[550px] flex items-center" :style="{backgroundImage: `url(${imgBGTitulo})`}">
            <DetailedArchitectComp :image="imgRobertFox" name="Robert Fox" rating="4.9 (12)" loc="AVA Studio - Los Angeles (EC2Y 8AT)" desc="AVA Studio is a dynamic young London’s practice led by innovation and aesthetics. The architecture and design studio adopts an interdisciplinary vision of architecture influenced by visual arts and technology." />    
        </div>
    </section>

</template>

<script setup>
import imgBGTitulo from '@/assets/imgBGFooter.png'
import DetailedArchitectComp from '@/components/DetailedArchitectComp.vue'

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