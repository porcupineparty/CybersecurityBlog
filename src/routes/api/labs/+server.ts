import type { Lab } from "$lib/types"
import { json } from "@sveltejs/kit"

async function getLabs() {
    let labs: Lab[] = []

    const paths = import.meta.glob('/src/labs/*.md', { eager: true })
    for (const path in paths) {
        const file = paths[path]
        const slug = path.split('/').at(-1)?.replace('.md', '')

        if (file && typeof file === 'object' && 'metadata'  in file && slug){
            const metadata = file.metadata as Omit<Lab, 'slug'>
            const lab = { ...metadata, slug } satisfies Lab
            lab.published && labs.push(lab)
        }
    }
    labs = labs.sort(
        (first, second) =>
        new Date(second.date).getTime() - new Date(first.date).getTime()
    )

    return labs
}

export async function GET() {
    const labs = await getLabs()
    return json(labs)
}