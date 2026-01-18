<script setup lang="ts">
import { PhFlowerLotus, PhMagnifyingGlass, PhShoppingCart } from '@phosphor-icons/vue';
import { onMounted } from 'vue';

const route = useRoute()
const cart = useCartStore()


onMounted(() => {
    let prevScrollpos = 0;
    let header = document.getElementById("header");

    function handleHeaderScroll() {
        if (!header) return

        const currentScrollPos = window.scrollY;

        if (currentScrollPos === 0 && route.path === '/') {
            header.classList.add('at-top')
        }

        if (currentScrollPos > 0 && route.path === '/') {
            header.classList.remove('at-top')
        }

        if (prevScrollpos <= currentScrollPos ){
            header.classList.add("scrolled");
        } else {  
            header.classList.remove('scrolled');
        }

        prevScrollpos = currentScrollPos;
    }

    window.addEventListener('scroll', handleHeaderScroll)
})
</script>

<template>
    <header id="header" :class="[$route.path != '/' ? '' : 'at-top']">
        <NuxtLink :to="'/'">
            <div class="logo-container">
            <PhFlowerLotus size="2rem"/>
            <h4>Calma</h4>
        </div>
        </NuxtLink>
        <div class="flex align-center gap-1">
            <PhMagnifyingGlass size="1.5rem"/>
            <NuxtLink :to="'/kundkorg'" class="cart-btn">
                <PhShoppingCart size="1.5rem"/>
                <div class="cart-count">
                    {{ cart.items.length }}
                </div>
            </NuxtLink>
            <button class="button secondary">Mina sidor</button>
        </div>
    </header>
</template>

<style lang="scss">
    header {
        height: 4rem;
        position: fixed;
        z-index: 1;
        top: 0;
        right: 0;
        left: 0;
        background-color: white;
        display: flex;
        padding-left: calc(50vw - 37.5rem);
        padding-right: calc(50vw - 37.5rem);
        justify-content: space-between;
        align-items: center;
        transition: transform 0.33s ease, color 0.33s ease, background-color 0.33s ease;

        .logo-container {
            display: flex;
            align-items: center;
            gap: 0.35rem;
        }


        @media (max-width: 768px) {
            padding-left: 1rem;
            padding-right: 1rem;
        }

        &.scrolled {
            transform: translateY(-4rem);
        }

        &.at-top {
            background-color: transparent;
            color: white;
            h4 {
                color: white;
            }
        }

        .cart-btn {
            position: relative;
            
            .cart-count {
                position: absolute;
                top: -0.5rem;
                right: -0.5rem;
                background: black;
                color: white;
                height: 1rem;
                width: 1rem;
                font-size: 0.75rem;
                display: grid;
                place-items: center;
                border-radius: 100%;
            }
        }
    }
</style>