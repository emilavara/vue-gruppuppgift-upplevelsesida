<script setup lang="ts">
	const { experiences, load: loadExperiences } = useExperiences()

	await loadExperiences()
</script>

<template>
	<SectionsHero/>
	
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