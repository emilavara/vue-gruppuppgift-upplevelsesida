<script setup lang="ts">
    import { ref } from "vue";
    import DatePicker from "./DatePicker.vue";

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    const date = ref<string>(`${yyyy}-${mm}-${dd}`);
    const showPicker = ref(false);

    const togglePicker = () => {
        showPicker.value = !showPicker.value;
    };
</script>

<template>
    <form class="search-form">
            <div class="date-toggle" @click.stop="togglePicker">
                <p class="label">Välj datum</p>
                <p class="chosen-date">{{date}}</p>
            </div>
            <div class="date-toggle" @click.stop="togglePicker">
                asd
            </div>
            <DatePicker v-model="date" :show="showPicker" @close="showPicker = false" />
    </form>
</template>

<style lang="scss">
    .search-form {
        height: 4rem;
        background-color: var(--bg-color);
        width: calc(var(--page-width) / 2);
        border-radius: 4rem;
        position: absolute;
        bottom: -2rem;
        display: flex;
        // overflow: hidden;
        border: 1px solid #e3e3e3;

        @media (max-width: 768px) {
            width: 100%;
        }
    }

    .date-picker {
        position: relative;
    }

    .date-toggle {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: flex-start;
        padding: 0 1.5rem;
        border-radius: 4rem;
        cursor: pointer;

        &:hover {
            background-color: hsl(0 0 95%);
        }

        .label {
            font-size: 0.75rem;
        }

        .chosen-date {
            color: black;
            font-weight: 600;
        }
    }

</style>
