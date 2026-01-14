<script setup lang="ts">
import { PhFlowerLotus, PhMagnifyingGlass, PhShoppingCart } from '@phosphor-icons/vue';
import { onMounted } from 'vue';

onMounted(() => {
    let prevScrollpos = 0;
    let header = document.getElementById("header");

    function handleHeaderScroll() {
        const currentScrollPos = window.scrollY;

        if (currentScrollPos === 0) {
            header.classList.add('at-top')
        }

        if (currentScrollPos > 0) {
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
    <header id="header" class="at-top">
        <div class="logo-container">
            <PhFlowerLotus size="2rem"/>
            <h4>Calma</h4>
        </div>
        <div class="flex align-center gap-1">
            <PhMagnifyingGlass size="1.5rem"/>
            <PhShoppingCart size="1.5rem"/>
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
    }
</style>