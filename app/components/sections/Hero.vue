<template>
    <section class="hero-section">
        <div>
            <h1 class="text-white">Hitta ditt flow</h1>
            <p class="text-white-muted">Yoga-upplevelser för återhämtning, närvaro och balans. På dina villkor.</p>
        </div>
        <SearchForm/>
    </section>
</template>

<style lang="scss">
    .hero-section {
        height: 40vh;
        min-height: 23.5rem;
        max-width: unset;
        width: 100%;
        display: grid;
        place-items: center;
        background-color: var(--container-color);
        background-image: linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url('https://images.unsplash.com/photo-1646166624994-9bd6876e6520?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
        background-position: center center;
        text-align: center;
        position: relative;
    }
</style>