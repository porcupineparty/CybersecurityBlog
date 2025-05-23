import { error } from "@sveltejs/kit";

// Disable prerendering — this route is dynamic
export const prerender = false;

export async function load({ params }) {
    try {
        const lab = await import(`../../labs/${params.slug}.md`);

        return {
            content: lab.default,
            meta: lab.metadata
        };
    } catch (e) {
        throw error(404, `Could not find ${params.slug}`);
    }
}
