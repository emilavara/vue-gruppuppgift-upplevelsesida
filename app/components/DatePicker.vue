<script setup lang="ts">
    import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
    import { PhCaretLeft, PhCaretRight } from "@phosphor-icons/vue";

    const props = defineProps<{
        modelValue: string;
        show: boolean;
    }>();

    const emit = defineEmits<{
        (event: "update:modelValue", value: string): void;
        (event: "close"): void;
    }>();

    const viewYear = ref(new Date().getFullYear());
    const viewMonth = ref(new Date().getMonth());
    const pickerRef = ref<HTMLElement | null>(null);

    const monthNames = [
        "Januari",
        "Februari",
        "Mars",
        "April",
        "Maj",
        "Juni",
        "Juli",
        "Augusti",
        "September",
        "Oktober",
        "November",
        "December",
    ];

    const selectedDate = computed(() => {
        const [year, month, day] = props.modelValue.split("-").map(Number);
        return { year, month: month - 1, day };
    });

    const monthLabel = computed(() => monthNames[viewMonth.value]);

    const dayCells = computed(() => {
        const jsDay = new Date(viewYear.value, viewMonth.value, 1).getDay();
        const firstDay = (jsDay + 6) % 7;
        const daysInMonth = new Date(viewYear.value, viewMonth.value + 1, 0).getDate();
        const cells = [];
        for (let i = 0; i < firstDay; i += 1) {
            cells.push(null);
        }
        for (let day = 1; day <= daysInMonth; day += 1) {
            cells.push(day);
        }
        return cells;
    });

    const prevMonth = () => {
        if (viewMonth.value === 0) {
            viewMonth.value = 11;
            viewYear.value -= 1;
            return;
        }
        viewMonth.value -= 1;
    };

    const nextMonth = () => {
        if (viewMonth.value === 11) {
            viewMonth.value = 0;
            viewYear.value += 1;
            return;
        }
        viewMonth.value += 1;
    };

    const selectDate = (day: number) => {
        const month = String(viewMonth.value + 1).padStart(2, "0");
        const dayValue = String(day).padStart(2, "0");
        emit("update:modelValue", `${viewYear.value}-${month}-${dayValue}`);
        emit("close");
    };

    const closeIfOutside = (event: MouseEvent) => {
        if (!props.show) {
            return;
        }
        const target = event.target as Node | null;
        if (pickerRef.value && target && !pickerRef.value.contains(target)) {
            emit("close");
        }
    };

    watch(
        () => props.show,
        (next) => {
            if (!next) {
                return;
            }
            const [year, month] = props.modelValue.split("-").map(Number);
            viewYear.value = year;
            viewMonth.value = month - 1;
        }
    );

    onMounted(() => {
        document.addEventListener("click", closeIfOutside);
    });

    onBeforeUnmount(() => {
        document.removeEventListener("click", closeIfOutside);
    });
</script>

<template>
    <div v-if="show" ref="pickerRef" class="date-popup">
        <div class="date-header">
            <button class="button nav-button" type="button" @click="prevMonth"><PhCaretLeft/></button>
            <span class="month-label">{{ monthLabel }} {{ viewYear }}</span>
            <button class="button nav-button" type="button" @click="nextMonth"><PhCaretRight/></button>
        </div>
        <div class="date-grid">
            <span v-for="day in ['Må', 'Ti', 'On', 'To', 'Fr', 'Lö', 'Sö']" :key="day" class="weekday">
                {{ day }}
            </span>
            <button
                v-for="(day, index) in dayCells"
                :key="`day-${index}`"
                class="button date-cell"
                type="button"
                :disabled="!day"
                :class="{
                    'is-selected':
                        day &&
                        selectedDate.year === viewYear &&
                        selectedDate.month === viewMonth &&
                        selectedDate.day === day,
                }"
                @click="day && selectDate(day)"
            >
                {{ day || '' }}
            </button>
        </div>
    </div>
</template>

<style lang="scss">
    .date-popup {
        position: absolute;
        top: 4.5rem;
        left: 0;
        background: var(--bg-color);
        border: 1px solid #e3e3e3;
        border-radius: 1rem;
        padding: 0.75rem;
        width: 16rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        z-index: 10;
        animation: anim 0.33s ease;
        user-select: none;

        @keyframes anim {
            from {
                filter: blur(5px);
                opacity: 0;
                transform: translateY(1rem);
            }
        }
    }

    .date-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
    }

    .month-label {
        font-weight: 600;
    }

    .nav-button {
        border: none;
        border-radius: 0.75rem;
        // padding: 0.25rem 0.6rem;
        cursor: pointer;
        display: grid;
        place-items: center;

        &:hover {
            background-color: hsl(0 0 95%);
        }
    }

    .date-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 0.25rem;
    }

    .weekday {
        font-size: 0.7rem;
        text-align: center;
        color: var(--text-muted-foreground-color);
        margin-bottom: 0.5rem;
    }

    .date-cell {
        border: none;
        background: transparent;
        padding: 0.4rem 0;
        border-radius: 0.5rem;
        cursor: pointer;
        font-size: 0.85rem;

        &:hover {
            background-color: hsl(0 0 95%);
        }
    }

    .date-cell:disabled {
        cursor: default;
        visibility: hidden;
    }

    .date-cell.is-selected {
        background: var(--button-primary);
        color: var(--bg-color);
    }
</style>
