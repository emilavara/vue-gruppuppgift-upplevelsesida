<script setup lang="ts">
	import { ref } from "vue";

	const today = new Date();
	const yyyy = today.getFullYear();
	const mm = String(today.getMonth() + 1).padStart(2, "0");
	const dd = String(today.getDate()).padStart(2, "0");

	const date = ref<string>(`${yyyy}-${mm}-${dd}`);
	const people = ref({ adults: 2, children: 0, seniors: 0 });

	const { experiences, load: loadExperiences } = useExperiences();

	await loadExperiences();
</script>

<template>
	<SectionsHero v-model:date="date" v-model:people="people" />
	
	<section class="grid gap-2">
		<div class="col-12 col-xs-12 pt-8">
			<div class="flex justify-between align-center">
				<h2>Trendande upplevelser</h2>
				<p>Se alla</p>
			</div>
		</div>
		<ExperienceCard v-for="experience in experiences" :experience="experience"/>
	</section>
</template>

<style lang="scss">
</style>
