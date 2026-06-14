<template>
    <section class="findAnArchitect">
        <div class="bg-cover bg-center" :style="{ backgroundImage: `url(${BGFnA})` }">
            <div class="flex flex-col items-center gap-4 lg:gap-8 px-8 lg:px-44 py-16 lg:py-24">
                <div class="flex flex-col items-center px-1 gap-4">
                    <div class="flex gap-1 justify-center items-center">
                        <img :src="imgRegua" class="h-5 w-5">
                        <p class="text-center text-[#8D6D25] text-lg font-bold">Find an Architect</p>
                    </div>
                    <h1 class="text-center text-white font-bold text-3xl lg:text-5xl">Connect with Your Ideal Architect</h1>
                </div>
                <p class="text-center text-gray-200 text-lg lg:text-xl pt-6">Choosing an architect is a commitment to an important partnership in
                    your
                    construction project, be it a new construction, renovation or expansion. Whether you are an individual
                    or a business, find an architect specializing in single-family homes or commercial architecture on the
                    Find My Architect website. Our website allows you to find architects near you and contact directly the
                    right architecture studio for your project, based on the type of property (house, office building,
                    apartment, etc.), type of work (construction, renovation), style (contemporary, modern). , traditional,
                    etc) or language. With Find My Architect, connect with the best specialized architect for your project.
                </p>
            </div>
        </div>
    </section>
</template>

<script setup>
import imgRegua from '@/assets/imgRegua.png'
import BGFnA from '@/assets/imgBGFnA.png'
</script>