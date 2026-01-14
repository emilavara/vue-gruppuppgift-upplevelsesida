<template>
    <section class="hero-section">
        <div style="display: flex; flex-direction: column;">
            <h1>Lorem, ipsum dolor.</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, error.</p>
            <div style="display: flex; gap: 0.25rem">
                <button class="primary">Boka nu</button>
                <button class="secondary">Läs mer</button>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    .hero-section {
        height: 100vh;
        max-width: unset;
        width: 100%;
        display: grid;
        place-items: center;

        button {
            all: unset;
            background-color: hsl(0, 0, 15%);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 64px;
            cursor: pointer;
            transition: background-color 0.2s ease;

            &:hover {
                background-color: hsl(0, 0, 30%);
            }

            &.secondary {
                background-color: hsl(0, 0, 95%);
                color: var(--text-foreground-color);
                
                &:hover {
                    background-color: hsl(0,0,90%);
                }
            }
        }
    }
</style>