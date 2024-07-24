<script lang="ts">
    import { formatDate} from '$lib/utils'
    import * as config from '$lib/config'
    export let data
</script>

<svelte:head>
    <title>{config.title}</title>
</svelte:head>

<section>
    <ul class="labs">
        {#each data.labs as lab}
            <li class="lab">
                <a href={lab.slug} class="title">{lab.title}</a>
                <p class="date">{formatDate(lab.date)}</p>
                <p class="description">{lab.description}</p>
            </li>
        {/each}
    </ul>
</section>

<style>
    .labs {
        display: grid;
        gap: var(--size-7);
    }
    .lab {
        max-inline-size: var(--size-content-3)
    }
    .lab:not(:last-child) {
        border-bottom: 1px solid var(--border);
        padding-bottom: var(--size-7);
    }
    .title {
        font-size: var(--font-size-fluid-3);
        text-transform: capitalize;
    }
    .date {
        color: var(--text-2);
    }
    .description {
        margin-top: var(--size-3);
    }
</style>