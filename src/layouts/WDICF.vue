<template>
    <section class="WDICF px-4 lg:px-16 lg:-mb-96">
        <h1 class="font-bold lg:text-4xl text-3xl mt-24 text-center lg:text-left">Where Does it Come From?</h1>
        <div class="grid grid-cols-1 lg:grid-cols-8 mt-8 gap-12">
            <div class="col-span-5">
                <div class="flex justify-end pl-64">
                    <div>
                        <div class="flex flex-col text-3xl lg:text-4xl translate-y-10 lg:translate-y-11">
                            <h1 class="font-bold -translate-x-15 lg:-translate-x-0">Desain Atap Rumah </h1>
                            <h1 class="text-white translate-x-2">Swiss Style</h1>
                        </div>
                        
                        <img :src="imgCasaSuica">
                        
                        <div class="-translate-y-50 -translate-x-64 z-10">
                        <img :src="imgPredioABTUS">
                        </div>
                        <div class="-translate-y-140 -translate-x-35 z-10 pr-56">
                            <img :src="imgLogoABTUS">
                        </div>
                    
                    </div>
                </div>
            </div>
            <div class="col-span-3 pt-18">
                <div class="flex justify-center">
                    <p class="text-left text-lg">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, 
                        a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. 
                        Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance.
                         The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                        <br>
                        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form,
                         accompanied by English versions from the 1914 translation by H. Rackham.
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