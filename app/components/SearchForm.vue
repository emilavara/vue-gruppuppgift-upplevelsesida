<script setup lang="ts">
    import { computed, ref } from "vue";
    import DatePicker from "./DatePicker.vue";
    import PersonPicker from "./PersonPicker.vue";

    type PeopleCounts = {
        adults: number;
        children: number;
        seniors: number;
    };

    const props = defineProps<{
        date: string;
        people: PeopleCounts;
    }>();

    const emit = defineEmits<{
        (event: "update:date", value: string): void;
        (event: "update:people", value: PeopleCounts): void;
    }>();

    const showDatePicker = ref(false);
    const showPersonPicker = ref(false);

    const dateValue = computed({
        get: () => props.date,
        set: (value) => emit("update:date", value),
    });

    const peopleValue = computed({
        get: () => props.people,
        set: (value) => emit("update:people", value),
    });

    const toggleDatePicker = () => {
        showDatePicker.value = !showDatePicker.value;
    };

    const togglePersonPicker = () => {
        showPersonPicker.value = !showPersonPicker.value;
    };

    const peopleLabel = computed(() => {
        const total = props.people.adults + props.people.children + props.people.seniors;
        return `${total} personer`;
    });
</script>

<template>
    <div class="search-form">
        <div class="picker-group">
            <div class="picker-toggle" @click.stop="toggleDatePicker">
                <p class="label">Välj datum</p>
                <p class="chosen-value">{{ dateValue }}</p>
            </div>
            <DatePicker v-model="dateValue" :show="showDatePicker" @close="showDatePicker = false" />
        </div>
        <div class="picker-group">
            <div class="picker-toggle" @click.stop="togglePersonPicker">
                <p class="label">Personer</p>
                <p class="chosen-value">{{ peopleLabel }}</p>
            </div>
            <PersonPicker v-model="peopleValue" :show="showPersonPicker" @close="showPersonPicker = false" />
        </div>
    </div>
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
        border: 1px solid #e3e3e3;

        @media (max-width: 768px) {
            width: 100%;
        }
    }

    .picker-group {
        position: relative;
        flex: 1;
    }

    .picker-group + .picker-group {
        border-left: 1px solid #e3e3e3;
    }

    .picker-toggle {
        position: relative;
        // width: 100%;
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

        .chosen-value {
            color: black;
            font-weight: 600;
        }
    }

</style>
