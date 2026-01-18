<!-- /boka/[id] -->
<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue';

    const route = useRoute()
    const id = route.params.id as string

    const { load, getById } = useExperiences()
    const cart = useCartStore()
    await load()

    const today = new Date();
	const yyyy = today.getFullYear();
	const mm = String(today.getMonth() + 1).padStart(2, "0");
	const dd = String(today.getDate()).padStart(2, "0");

	const date = ref<string>(`${yyyy}-${mm}-${dd}`);

    const showPersonPicker = ref(false);
    const showDatePicker = ref(false);

    const days = ref(1);
    const people = ref({ adults: 2, children: 0, seniors: 0 });
    const selectedPackageIds = ref<string[]>([])
    
    const totalPeople = computed(() => {
        return Object.values(people.value)
            .reduce((sum, value) => sum + value, 0);
    });

    const selectedPackages = computed(() => {
        if (!experience.value) return []
        return experience.value.packages.filter(p => selectedPackageIds.value.includes(p.id))
    })

    const packagesTotal = computed(() => {
        return selectedPackages.value.reduce((sum, p) => sum + p.price, 0)
    })

    const baseTotal = computed(() => {
        if (!experience.value) return 0
        return experience.value.basePricePerDay * days.value * totalPeople.value
    })

    const totalPrice = computed(() => baseTotal.value + (packagesTotal.value * totalPeople.value))

    const experience = computed(() => getById(id))

    const togglePersonPicker = () => {
        showPersonPicker.value = !showPersonPicker.value;
    };

    const toggleDatePicker = () => {
        showDatePicker.value = !showDatePicker.value;
    };

    function addToCart() {
        if (!experience.value) return

        cart.addItem({
            experienceId: experience.value.id,
            title: experience.value.title,
            image: experience.value.image,
            date: date.value,
            days: days.value,
            people: { ...people.value },
            packages: selectedPackages.value.map((pkg) => ({
                id: pkg.id,
                title: pkg.title,
                price: pkg.price,
            })),
            basePricePerDay: experience.value.basePricePerDay,
            totalPrice: totalPrice.value,
        })

        console.log('added to cart')
        console.log(cart.items)
    }

    function togglePackage(id: string) {
        const idx = selectedPackageIds.value.indexOf(id)
        if (idx >= 0) {
            selectedPackageIds.value.splice(idx, 1)
        } else {
            selectedPackageIds.value.push(id)
        }
    }

    onMounted(() => {
        if (typeof route.query.date === "string") {
			date.value = route.query.date
		}

		if (typeof route.query.adults === "string") {
			people.value.adults = Number(route.query.adults) || 0
		}

		if (typeof route.query.children === "string") {
			people.value.children = Number(route.query.children) || 0
		}

		if (typeof route.query.seniors === "string") {
			people.value.seniors = Number(route.query.seniors) || 0
		}
	})
</script>

<template>
    <section v-if="experience" class="experience-section grid gap-4 pt-8">
        <div class="col-8 col-xs-12 flex flex-column">
            <h2>Boka upplevelse</h2>

            <div class="container">
                <div class="image-container">
                    <img :src="experience.image"/>
                </div>
                <div class="text-container">
                    <h5>{{ experience.title }}</h5>
                    <p>{{ experience.location }}</p>
                    <p>{{ experience.shortDescription }}</p>
                </div>
                <h4 style="margin-left: auto;">{{ experience.basePricePerDay }}.00 SEK</h4>
            </div>

            <div class="container justify-between" style="position: relative;">
                <h5>Datum: {{ date }}</h5>
                <button class="button secondary" @click.stop="toggleDatePicker"> Ändra</button>
                <DatePicker v-model="date" :show="showDatePicker" @close="showDatePicker = false" />
            </div>

            <div class="container">
                <div class="person-row" style="width: 100%">
                <h5>Antal dagar:</h5>
                <div class="person-controls">
                    <button class="button secondary sm" type="button" @click="days--">-</button>
                    <span class="person-count">{{ days }}</span>
                    <button class="button secondary sm" type="button" @click="days++">+</button>
                </div>
            </div>
            </div>

            <div class="container justify-between" style="position: relative;">
                <h5>Antal personer: {{ totalPeople }}</h5>
                <button class="button secondary" @click.stop="togglePersonPicker"> Ändra</button>
                <PersonPicker v-model="people" :show="showPersonPicker" @close="showPersonPicker = false" />
            </div>

            <div class="container package-container">
                <div v-for="pkg in experience.packages" class="package">
                    <input type="checkbox" :checked="selectedPackageIds.includes(pkg.id)" @change="togglePackage(pkg.id)" />
                    <div class="text-container">
                        <p class="title">{{ pkg.title }}</p>
                        <p class="description">{{ pkg.description }}</p>
                        <p class="price">{{pkg.price}}.00 SEK</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-4 col-xs-12">
            <h5>Sammanfattning</h5>
            <hr>
            <p>{{ experience.title }} ({{ days }} dagar)</p>
            <hr>
            <p>Datum: {{ date }}</p>
            <hr>
            <p>Antal personer: {{ totalPeople }}</p>
            <hr>

            <p v-if="selectedPackages.length != 0">Tillval: <span v-for="pkg in selectedPackages">{{ pkg.title + ', ' }}</span></p>
            <hr v-if="selectedPackages.length != 0">

            <h3>Totalt: {{ totalPrice }}.00 SEK</h3>
            <button class="button primary mt-1" @click="addToCart">Lägg i kundkorg</button>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    .container {
        display: flex;
        background-color: transparent;
        // height: 4rem;
        border: 1px solid #e3e3e3;
        border-radius: 1rem;
        gap: 1rem;
        align-items: center;
        margin-top: 1rem;

        &.package-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            justify-content: stretch;
        }

        .image-container {
            aspect-ratio: 1 / 1;
            border-radius: 1rem;
            overflow: hidden;
            border: 2px solid #e3e3e3;
            height: 4rem;

            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }

        .package {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            background-color: var(--container-color);
            padding: 1rem;
            border-radius: 1rem;

            input {
                appearance: none;
                height: 1.5rem;
                width: 1.5rem;
                aspect-ratio: 1 / 1;
                background-color: white;
                border-radius: 100%;
                border: 1px solid #e3e3e3;

                &:checked {
                    background-color: black;
                    outline: 5px solid white;
                    outline-offset: -6px;
                }
            }

            .title, .price {
                color: black;
                font-weight: 600;
            }

            .description {
                font-size: 0.875rem;
                margin-bottom: 0.25rem;
                min-height: 2.625rem;
            }
        }
    }

    hr {
        border: none;
        border-top: 1px solid #e3e3e3;
        height: 0;
        background-color: transparent;
        margin: 1rem 0;
    }
</style>
