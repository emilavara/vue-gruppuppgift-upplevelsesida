<script setup lang="ts">
    import { onBeforeUnmount, onMounted, ref } from "vue";

    const props = defineProps<{
        modelValue: {
            adults: number;
            children: number;
            seniors: number;
        };
        show: boolean;
    }>();

    const emit = defineEmits<{
        (event: "update:modelValue", value: { adults: number; children: number; seniors: number }): void;
        (event: "close"): void;
    }>();

    const pickerRef = ref<HTMLElement | null>(null);

    const updateCount = (key: "adults" | "children" | "seniors", delta: number) => {
        const nextValue = Math.max(0, props.modelValue[key] + delta);
        emit("update:modelValue", { ...props.modelValue, [key]: nextValue });
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

    onMounted(() => {
        document.addEventListener("click", closeIfOutside);
    });

    onBeforeUnmount(() => {
        document.removeEventListener("click", closeIfOutside);
    });
</script>

<template>
    <div v-if="show" ref="pickerRef" class="person-popup">
        <div class="person-row">
            <span class="person-label">Vuxen</span>
            <div class="person-controls">
                <button class="button secondary sm" type="button" @click="updateCount('adults', -1)">-</button>
                <span class="person-count">{{ modelValue.adults }}</span>
                <button class="button secondary sm" type="button" @click="updateCount('adults', 1)">+</button>
            </div>
        </div>
        <div class="person-row">
            <span class="person-label">Barn</span>
            <div class="person-controls">
                <button class="button secondary sm" type="button" @click="updateCount('children', -1)">-</button>
                <span class="person-count">{{ modelValue.children }}</span>
                <button class="button secondary sm" type="button" @click="updateCount('children', 1)">+</button>
            </div>
        </div>
        <div class="person-row">
            <span class="person-label">Senior</span>
            <div class="person-controls">
                <button class="button secondary sm" type="button" @click="updateCount('seniors', -1)">-</button>
                <span class="person-count">{{ modelValue.seniors }}</span>
                <button class="button secondary sm" type="button" @click="updateCount('seniors', 1)">+</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .person-popup {
        position: absolute;
        top: 4.5rem;
        left: 0;
        background: var(--bg-color);
        border: 1px solid #e3e3e3;
        border-radius: 1rem;
        padding: 0.75rem;
        width: 17rem;
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

    .person-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.4rem 0;
    }

    .person-label {
        font-size: 0.9rem;
        color: var(--text-foreground-color);
    }

    .person-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .person-count {
        min-width: 1.5rem;
        text-align: center;
        font-weight: 600;
    }
</style>
