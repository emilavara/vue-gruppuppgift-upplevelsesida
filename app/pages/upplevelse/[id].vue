<script setup lang="ts">
const route = useRoute()
const id = route.params.id as string

const { experiences, load, getById } = useExperiences()
await load()

const experience = computed(() => getById(id))
</script>

<template>
    <section v-if="experience" class="experience-section grid gap-2 pt-8">
        <div class="col-6 col-xs-12">
            <img :src="experience.image"/>
        </div>
        <div class="col-1 col-xs-12"></div>
        <div class="col-5 col-xs-12">
            <div class="text mt-2">
                <h2>{{ experience.title }}</h2>

                <p>{{ experience.location }}</p>
                <p class="mt-1">{{ experience.description }}</p>
            </div>
            
            <div v-if="$route.query.date" class="choices mt-1">
                <h5>Dina val</h5>
                <ul>
                    <li>Datum: {{ $route.query.date }}</li>
                    <li>
                        Personer: 
                        <span v-if="$route.query.adults">{{ $route.query.adults }} vuxna, </span>
                        <span v-if="$route.query.children">{{ $route.query.children }} barn, </span>
                        <span v-if="$route.query.seniors">{{ $route.query.seniors }} seniorer</span>
                    </li>
                </ul>
            </div>
            
            <h2 class="mt-4">från {{ experience.basePricePerDay }}.00 SEK</h2>
            <NuxtLink :to="{path: `/boka/${experience.id}`, query: route.query}" class="button primary mt-1">Boka nu</NuxtLink>
        </div>
    </section>
    <SectionsExperienceList :experiences="experiences"/>
</template>

<style lang="scss" scoped>
    .experience-section {
        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
            border-radius: 1rem;
            aspect-ratio: 4 / 3;
        }
        
        .choices {
            background-color: var(--container-color);
            padding: 1rem;
            width: calc(100% - 2rem);
            border-radius: 1rem;

            ul {
                padding: 0;
                list-style: none;
            }
        }

        .col-5 {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
    }
</style>