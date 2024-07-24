export type Categories = 'sveltekit' | 'svelte'

export type Lab = {
    title: string
    slug: string
    description: string
    date: string
    categories: Categories[]
    published: boolean
}