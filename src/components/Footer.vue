<template>
    <section id="aboutUs" class="footer">
        <footer class="mt-24">
            <div class="relative w-full lg:h-[160px] h-[260px] overflow-hidden">

                <div class="hidden lg:block absolute top-1 left-0 w-[45%] h-full brightness-40 bg-cover bg-center z-10 [clip-path:polygon(0_0,80%_0,100%_100%,0%_100%)]" :style=" {backgroundImage : `url(${imgFooter})`}">
                </div>

                <div class="w-full h-full lg:h-[140px] bg-red-800 lg:absolute bottom-0 right-0 grid grid-cols-1 lg:grid-cols-2">

                    <div class="hidden lg:block"></div>

                    <div class="flex flex-col justify-center px-8 py-12 gap-8 lg:py-0 lg:px-0 lg:gap-4 lg:pr-16 lg:flex-row lg:justify-between">

                        <div class="flex flex-col justify-center gap-2 text-left">
                            <h1 class="text-white font-bold text-2xl lg:text-3xl">
                                É um dono de barbearia?
                            </h1>
                            <h2 class="text-gray-200 lg:text-xl lg:font-semibold">
                                Junte-se a nós
                            </h2>
                        </div>

                        <div class="flex items-center font-semibold">
                            <Button text="Clique aqui" color="bg-white" textColor="text-red-800">
                                <svg class="w-4 h-4 shrink-0 text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>
                            </Button>
                        </div>

                    </div>
                </div>
            </div>

            <div class="bg-cover bg-center" :style="{ backgroundImage : `url(${BGFooter})` } ">
                <div class="grid grid cols-2 lg:grid-cols-6 pt-24 pb-32 px-8 lg:px-16 lg:gap-16">
                    <div class="flex flex-col col-span-2 gap-8">
                        <h1 class="text-white text-5xl font-bold">Trimly</h1>
                        <p class="text-gray-200 pt-8">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste mollitia quo laboriosam nobis, officiis, blanditiis, sint assumenda dignissimos est quae culpa rem! Facilis, assumenda! Sunt, eum sint! Distinctio, cupiditate in!
                        </p>
                        <div class="flex gap-4 lg:gap-8">
                            <p class="text-white text-lg">Social Media :</p>
                            <nav class="flex gap-2 lg:gap-4">
                                <a href="#"><img :src="iconYT" class="h-[28px] w-[28px]"></a>
                                <a href="#"><img :src="iconIG" class="h-[28px] w-[28px]"></a>
                                <a href="#"><img :src="iconTT" class="h-[28px] w-[28px]"></a>
                                <a href="#"><img :src="iconFB" class="h-[28px] w-[28px]"></a>
                            </nav>
                        </div>
                    </div>
                    <div class=""></div>
                    <div class="flex flex-col col-span-2 lg:col-span-1 gap-8 pt-10">
                        <h2 class="text-white font-bold text-2xl">
                            About Us
                        </h2>
                        <ul class="list-disc pl-5 space-y-3 lg:space-y-4 text-gray-200">
                            <li>PlaceHolder</li>
                            <li>PlaceHolder</li>
                            <li>PlaceHolder</li>
                        </ul>
                    </div>


                    <div class="flex flex-col col-span-2 gap-8 pt-10">
                        <h2 class="text-white font-bold text-2xl">
                            Contact Us
                        </h2>
                        <div v-for="(item, index) in contacts" :key="item.id"  class="flex gap-4">
                            <img :src="item.image" class="h-[28px] w-[28px]">
                            <p class="text-gray-200">{{ item.text }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </section>
</template>

<script setup>
import imgTrimly from '@/assets/imgTrimly.png'
import Button from '@/components/Button.vue'
import imgFooter from '@/assets/imgFooter.png'
import logoFooter from '@/assets/imgLogoFooter.png'
import BGFooter from '@/assets/imgBGFooter.png'
import iconYT from '@/assets/iconYT.png'
import iconIG from '@/assets/iconIG.png'
import iconTT from '@/assets/iconTT.png'
import iconFB from '@/assets/iconFB.png'
import iconLoc from '@/assets/iconLoc.png'
import iconTel from '@/assets/iconTel.png'
import iconMail from '@/assets/iconMail.png'

const contacts = [
    {id : 1, image : iconLoc, text : 'AV. Dep. Benedito Matarazzo, 5101, São José do Campos - SP'},
    {id : 2, image : iconTel, text : '11 2365-2356'},
    {id : 3, image : iconMail, text : 'Info@pressrelief.com'}
]
</script>