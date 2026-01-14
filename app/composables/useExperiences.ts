export type Experience = {
    id: string;
    title: string;
    location: string;
    image: string;
    shortDescription: string;
    description: string;
    basePricePerDay: number;
    packages: Array<{
        id: string;
        title: string;
        description: string;
        price: number;
    }>
}

export default function useExperiences() {
    const experiences = useState<Experience[]>("experiences", () => [])

    async function load() {
        //kolla om experiences är tom, annars gör en fetch
        if (experiences.value.length > 0) return
        
        //gör fetchen absolut på servern, så inte ssr går sönder
        const origin = useRequestURL().origin
        const data = await $fetch<{ experiences: Experience[] }>('/data/experiences.json', {
            baseURL: origin
        })
            
            experiences.value = data.experiences
        }

    function getById(id: string) {
        return experiences.value.find(e => e.id === id)
    }

    return {
        experiences,
        load,
        getById
    }
}