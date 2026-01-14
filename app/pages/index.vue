<script setup lang="ts">
	const { experiences, load: loadExperiences } = useExperiences()

	await loadExperiences()
</script>

<template>
	<Header/>
	<SectionsHero/>
	
	<section class="grid gap-2">
		<div class="col-12 pt-8">
			<h2>Trendande upplevelser</h2>
		</div>
		<ExperienceCard v-for="experience in experiences" :experience="experience"/>
	</section>
</template>

<style lang="scss">
</style>