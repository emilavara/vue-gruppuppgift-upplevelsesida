<script setup lang="ts">
const route = useRoute()
const id = route.params.id as string

const { articles, load, getById } = useArticles()
await load()

const article = computed(() => getById(id))
</script>

<template>
    <section v-if="article" class="article-section grid gap-2 pt-8 pt-xs-6 pb-xs-8">
        <div class="col-6 col-xs-12">
            <img :src="article.image"/>
        </div>
        <div class="col-1 col-xs-12"></div>
        <div class="col-5 col-xs-12">
            <div class="text mt-2">
                <h2>{{ article.title }}</h2>
                <p class="mt-1">{{ article.excerpt }}</p>
                <p class="mt-1">{{ article.content }}</p>
            </div>
            
        </div>
    </section>
</template>

<style lang="scss" scoped>
    .article-section {
        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
            border-radius: 1rem;
            aspect-ratio: 4 / 3;
        }

        .col-5 {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
    }
</style>