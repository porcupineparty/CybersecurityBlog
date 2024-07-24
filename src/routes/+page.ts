import type { Lab } from "$lib/types"

export async function load({ fetch }) {
    const response = await fetch('api/labs')
    const labs: Lab[] = await response.json()
    return { labs }
}