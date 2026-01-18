export type Article = {
    id: string;
    title: string;
    image: string;
    excerpt: string;
    content: string;
}

export default function useArticles() {
    const articles = useState<Article[]>("articles", () => [])

    async function load() {
        //kolla om articles är tom, annars gör en fetch
        if (articles.value.length > 0) return
        
        //gör fetchen absolut på servern, så inte ssr går sönder
        const origin = useRequestURL().origin
        const data = await $fetch<{ articles: Article[] }>('/data/articles.json', {
            baseURL: origin
        })
            
            articles.value = data.articles
        }

    function getById(id: string) {
        return articles.value.find(e => e.id === id)
    }

    return {
        articles,
        load,
        getById
    }
}