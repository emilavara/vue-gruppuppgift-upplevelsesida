<script setup lang="ts">
const route = useRoute()
const id = route.params.id as string

const { load, getById } = useExperiences()
await load()

const experience = computed(() => getById(id))
</script>

<template>
    <section v-if="experience" class="experience-section grid gap-2 pt-8">
        <div class="col-7">
            <!-- <img :src="experience.image"/> -->
        </div>
        <div class="col-5">
            <div class="text">
                <h2>{{ experience.title }}</h2>

                <p>{{ experience.location }}</p>
                <p>{{ experience.description }}</p>
                <p>{{ experience.basePricePerDay }}.00 SEK</p>

                <div class="flex gap-1">
                    <div v-for="pkg in experience.packages" class="container">
                        <p>{{ pkg.title }}</p>
                        <p>{{ pkg.description }}</p>
                        <p>{{ pkg.price }}</p>
                    </div>
                </div>
            </div>
            
            <div class="choices">
                <h5>Dina val (från query params)</h5>
                <ul>
                    <li>Datum: 2025-10-05</li>
                    <li>Personer: 2, vuxna ...</li>
                </ul>
            </div>
            
            <NuxtLink class="button primary">Boka nu</NuxtLink>

        </div>
    </section>

</template>

<style lang="scss">
    .experience-section {
        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
            border-radius: 1rem;
        }
        
        .choices {
            background-color: var(--container-color);
            padding: 1rem;

            ul {
                padding: 0;
                list-style: none;
            }
        }
    }
</style>