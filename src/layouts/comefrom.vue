<template>
    <section class="ABTUS px-4 lg:px-16">

        <h1 class="font-bold text-4xl text-center lg:text-left mt-24">Where does it come from?</h1>

        <div class="grid grid-cols-1 lg:grid-cols-10 gap-12 lg:gap-8 max-w-7xl px-4 py-12">
    
            <div class="relative col-span-6 w-full mt-10 lg:mt-0">
            
                <img :src="imgCasaSuica" alt="Desain Atap Rumah - Swiss Style" class="w-3/4 ml-auto object-cover"/>

                <img :src="imgPredioABTUS" alt="Arquitetura Moderna" class="absolute bottom-[-10%] left-0 w-2/3 object-cover"/>

                <div class="absolute top-1/2 left-[22%] -translate-y-1/2 -translate-x-1/2 z-10">
                    <img :src="imgLogoABTUS" alt="Selo meuarq.br" class="w-24 h-24 md:w-40 md:h-40"/>
                </div>

            </div>

            <div class="col-span-4 pl-4">
            <div class="flex justify-center">
                <p class="text-center lg:text-left">
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                <br><br>
                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                </p>
            </div>
            </div>

        </div>
    </section>
</template>



<script setup>
import imgCasaSuica from '@/assets/imgCasaSuica.png'
import imgPredioABTUS from '@/assets/imgPredioABTUS.png'
import imgLogoABTUS from '@/assets/imgLogoABTUS.png'
</script>