<script setup lang="ts">
    import type { Experience } from '~/composables/useExperiences';
    
    defineProps<{
        experience: Experience
    }>()
</script>

<template>
    <div class="col-3 col-xs-6 experience-card">
        <div class="image-container">
            <img :src="experience.image" height="200"/>
        </div>
        <div>
            <h5>{{ experience.title }}</h5>
            <!-- <p>{{ experience.description }}</p> -->
            <p>{{ experience.location }} &bullet; från {{ experience.basePricePerDay }} kr</p>
        </div>
        <div class="button-container">
            <NuxtLink :to="`/upplevelse/${experience.id}`" class="button secondary sm">Läs mer</NuxtLink>
            <NuxtLink class="button primary sm">Boka nu</NuxtLink>
        </div>
    </div>
</template>

<style lang="scss">
    .experience-card {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        text-decoration: none;

        h5, p {
            font-size: 0.875rem;
        }

        p {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;  
            overflow: hidden;
        }

        .image-container {
            // height: 200px;
            overflow: hidden;
            border-radius: 16px;
            aspect-ratio: 1 / 1;

            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }

        .button-container {
            display: flex;
            gap: 0.5rem;
            justify-content: flex-end;
            width: 100%;
        }

    }
</style>