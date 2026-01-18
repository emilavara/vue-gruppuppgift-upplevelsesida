<script setup lang="ts">
    import type { Experience } from '~/composables/useExperiences';

    defineProps<{
        experiences: Experience[]
    }>()
</script>


<template>
    <section class="grid gap-2 pb-8 pb-xs-4">
        <div class="col-12 col-xs-12 pt-8 pt-xs-8">
            <div class="flex justify-between align-center">
                <h2>Trendande upplevelser</h2>
                <p class="hide-mobile">Se alla</p>
            </div>
        </div>
        <ExperienceCard v-for="experience in experiences" :experience="experience"/>
    </section>
</template>