<!-- upplevelse:id -->
<script setup lang="ts">
	const route = useRoute()
</script>

<template>
	<p>{{ $route.query }}</p>
</template>