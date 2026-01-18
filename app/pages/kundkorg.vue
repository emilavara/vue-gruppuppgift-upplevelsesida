<script setup lang="ts">
	const cart = useCartStore()

	function handleCheckout() {
		cart.clear()
	}
</script>

<template>
	<section class="cart grid gap-4 pt-8 pb-8 pt-xs-6 pb-xs-8">
		<div class="col-8 col-xs-12">
			<h2>Kundkorg</h2>

			<div v-if="cart.items.length === 0" class="empty">
				<p>Din kundkorg är tom.</p>
			</div>

			<div v-else class="items">
				<div v-for="item in cart.items" :key="item.id" class="item">
					<div class="image">
						<img :src="item.image" :alt="item.title" />
					</div>
					<div class="details">
						<h5>{{ item.title }}</h5>
						<p>Datum: {{ item.date }}</p>
						<p>Dagar: {{ item.days }}</p>
						<p>
							Personer: {{ item.people.adults }} vuxna,
							{{ item.people.children }} barn,
							{{ item.people.seniors }} seniorer
						</p>
						<p v-if="item.packages.length > 0">
							Tillval:
							<span v-for="pkg in item.packages" :key="pkg.id">{{ pkg.title }}</span>
						</p>
					</div>
					<div class="price">
						<p>{{ item.totalPrice }}.00 SEK</p>
						<button class="button secondary sm" type="button" @click="cart.removeItem(item.id)">
							Ta bort
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="col-4 col-xs-12 summary">
			<h5>Sammanfattning</h5>
			<hr />
			<p>Antal bokningar: {{ cart.totalItems }}</p>
			<hr />
			<h3 class="mb-1">Totalt: {{ cart.totalPrice }}.00 SEK</h3>
			<NuxtLink :to="`/bekraftelse`" class="button primary" @click="handleCheckout">
				Gå till betalning
			</NuxtLink>
		</div>
	</section>
</template>

<style scoped lang="scss">
	.cart {
		
		@media (max-width: 768px) {
			column-gap: 0;
			row-gap: 1rem;
		}

		.item {
			display: grid;
			grid-template-columns: 6rem 1fr auto;
			gap: 1rem;
			align-items: start;
			border: 1px solid #e3e3e3;
			border-radius: 1rem;
			padding: 1rem;
			margin-top: 1rem;

			@media (max-width: 768px) {
				grid-template-columns: 1fr 1fr;
			}
		}

		.image {
			aspect-ratio: 1 / 1;
			border-radius: 0.75rem;
			overflow: hidden;
			border: 2px solid #e3e3e3;

			@media (max-width: 768px) {
				display: none;
			}

			img {
				height: 100%;
				width: 100%;
				object-fit: cover;
			}
		}

		.price {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			gap: 0.5rem;
			white-space: nowrap;
		}

		.summary {
			border: 1px solid #e3e3e3;
			border-radius: 1rem;
			padding: 1.5rem;
			height: fit-content;
		}

		hr {
			border: none;
			border-top: 1px solid #e3e3e3;
			height: 0;
			background-color: transparent;
			margin: 1rem 0;
		}
	}
</style>
