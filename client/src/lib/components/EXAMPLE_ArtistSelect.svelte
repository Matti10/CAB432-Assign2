<script>
    import { TM_artistList, TM_selectedArtist } from "$lib/EXAMPLE_stores";

    function changeEvent() {
        console.log($TM_selectedArtist);
    }
</script>

<div>
    <h3>2. Select a returned artist</h3>
    <select
        class="mb-3 min-w-[200px]"
        bind:value={$TM_selectedArtist}
        on:change={changeEvent}
    >
        {#each $TM_artistList as artist}
            <option value={artist}>
                {artist.artist}
            </option>
        {/each}
    </select>
</div>
