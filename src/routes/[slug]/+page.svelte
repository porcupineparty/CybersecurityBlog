<script lang="ts">
    export let data
    import {formatDate} from '$lib/utils.js'
</script>

<svelte:head>
    <title>{data.meta.title}</title>
    <meta property="og:type" content="article" />
    <meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
    <hgroup>
        <h1>{data.meta.title}</h1>
        <p>Published on {formatDate(data.meta.date)}</p>
    </hgroup>

    <div class="tags">
        {#each data.meta.categories as category}
            <span class="surface-4">&num;{category}</span>
        {/each}
    </div>

    <div class="prose">
        <svelte:component this={data.content} /> 
    </div>
</article>

<style>
    article {
        max-inline-size: var(--size-content-3);
        margin-inline: auto;
    }

    h1 {
        text-transform: capitalize;
    }
    h1 + p {
        margin-top: var(--size-2);
        color: var(--text-2);
    }
    .tags {
        display: flex;
        flex-wrap: wrap; /* Allow tags to wrap */
        gap: var(--size-2); /* Space between tags */
        margin-top: var(--size-2);
        max-width: 100%; /* Ensure container does not overflow */
    }

    .tags > * {
        padding: var(--size-1) var(--size-2); /* Adjusted spacing */
        border-radius: var(--radius-round);
        margin-bottom: var(--size-2); /* Add bottom margin for better spacing when wrapping */
    }
    .prose {
        line-height: var(--size-6); /* Improve readability with better line height */
    
    }

    
</style>