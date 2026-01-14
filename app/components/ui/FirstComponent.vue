<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

let count = ref<number>(0);

const doubled = computed(() => count.value * 2)

let text = ref<string>('hejsan')

function increment() {
	console.log(text)
	count.value++ //måste unwrappas -> till value
}

onMounted(() => {
	// alert('mountades')
	document.getElementById('text').style.color = "red"
})
</script>

<template>
	<p id="text">{{ count }}</p>
	doubled: {{doubled}}
	<button @click="increment">inkrementera</button>
	<input v-model="text" type="text"/>
</template>

<style></style>
