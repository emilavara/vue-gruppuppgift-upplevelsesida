<script setup lang="ts">
    import type { Article } from '~/composables/useArticles';

    defineProps<{
        articles: Article[]
    }>()
</script>


<template>
    <section class="grid gap-2 pb-8">
        <div class="col-12 col-xs-12">
            <div class="flex justify-between align-center">
                <h2>Yoga som ämne</h2>
                <p>Se alla</p>
            </div>
        </div>
        <ArticleCard v-for="article in articles" :article="article"/>
    </section>
</template>