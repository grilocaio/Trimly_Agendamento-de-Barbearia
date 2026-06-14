<template>
    <section class="RecentProjects">
        <div class="flex flex-col items-center justify-center gap-11 mt-24">
            <div class="font-bold text-4xl text-center">
                <h1>Recent Projects</h1>
            </div>
            <RecentProjectsComp />
        </div>
    </section>
</template>

<script setup>
import RecentProjectsComp from '@/components/RecentProjectsComp.vue';
</script>