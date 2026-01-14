<script setup lang="ts">
const route = useRoute()
const id = route.params.id as string

const { load, getById } = useExperiences()
await load()

const experience = computed(() => getById(id))
</script>

<template>
    <div v-if="experience">
        <h1>{{ experience.title }}</h1>
        <p>{{ experience.description }}</p>
    </div>

    <p v-else>
        Upplevelsen hittades inte.
    </p>
</template>