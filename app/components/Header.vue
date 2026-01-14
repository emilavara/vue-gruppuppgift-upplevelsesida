<script setup lang="ts">
import { PhFlowerLotus } from '@phosphor-icons/vue';

</script>

<template>
    <header class="at-top">
        <div class="logo-container">
            <PhFlowerLotus size="2rem"/>
            <h4>Calma</h4>
        </div>
        <div class="button-container">
            <button class="primary">Mina sidor</button>
        </div>
    </header>
</template>

<style lang="scss">
    header {
        height: 4rem;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        background-color: white;
        display: flex;
        padding-left: calc(50vw - 37.5rem);
        padding-right: calc(50vw - 37.5rem);
        justify-content: space-between;
        align-items: center;

        .logo-container {
            display: flex;
            align-items: center;
            gap: 0.35rem;
        }


        @media (max-width: 768px) {
            padding-left: 1rem;
            padding-right: 1rem;
        }

        &.at-top {
            background-color: transparent;
        }
    }
</style>