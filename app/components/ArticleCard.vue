<script setup lang="ts">
    import type { Article } from '~/composables/useArticles';
import type ArticleList from './sections/ArticleList.vue';
    const route = useRoute();
    
    defineProps<{
        article: Article
    }>()
</script>

<template>
    <NuxtLink :to="`/artikel/${article.id}`" class="col-3 col-xs-6 article-card">
        <div class="image-container">
            <img :src="article.image" height="200"/>
        </div>
        <div>
            <h5>{{ article.title }}</h5>
            <p>{{ article.excerpt }}</p>
        </div>
    </NuxtLink>
</template>

<style lang="scss">
    .article-card {
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