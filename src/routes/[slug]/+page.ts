import { error } from "@sveltejs/kit"

export async function load({ params }) {
    try {
        const lab = await import(`../../labs/${params.slug}.md`)
    

        return {
            content: lab.default,
            meta: lab.metadata
        }
    } catch (e) {
        throw error(404, `Could not find ${params.slug}`)
    }
} 
    
