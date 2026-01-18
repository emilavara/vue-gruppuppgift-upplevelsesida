<script setup lang="ts">
	import { ref, watch, onMounted } from "vue";

	const today = new Date();
	const yyyy = today.getFullYear();
	const mm = String(today.getMonth() + 1).padStart(2, "0");
	const dd = String(today.getDate()).padStart(2, "0");

	const date = ref<string>(`${yyyy}-${mm}-${dd}`);
	const people = ref({ adults: 2, children: 0, seniors: 0 });

	const { experiences, load: loadExperiences } = useExperiences();

	const route = useRoute()
	const router = useRouter()
	
	//uppdatera query params när datum uppdateras
	watch(date, (newDate) => {
		router.replace({
			query: {
				...route.query,
				date: newDate || undefined
			}
		})
	})

	//uppdatera query params när antal personer uppdateras
	watch(people, (newPeople) => {
        router.replace({
            query: {
                ...route.query,
                adults: newPeople.adults || undefined,
                children: newPeople.children || undefined,
                seniors: newPeople.seniors || undefined
            }
        })
    }, { deep: true })

	await loadExperiences();

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
	<SectionsHero v-model:date="date" v-model:people="people" />
	<SectionsExperienceList :experiences="experiences"/>
</template>

<style lang="scss">
</style>