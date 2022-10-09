<script lang="ts">
    import PageParamSetter from "$lib/components/EXAMPLE_PageParamSetter.svelte";
    import ArtistSearch from "$lib/components/EXAMPLE_ArtistSearch.svelte";
    import EventSearch from "$lib/components/EXAMPLE_EventSearch.svelte";
</script>

<section class="container">
    <div>
        <h2>Use Case 2</h2>
        <p>API Logic Flow:</p>
        <ol class="list-decimal">
            <li>Search for artists from Musixmatch.</li>
            <li>Get artist's album genres from Musixmatch.</li>
            <li>Get events from Ticketmaster matching those genres.</li>
        </ol>
    </div>
    <div>
        <PageParamSetter />

        <ArtistSearch />
        <br />
        <!-- Add in search for events by selected genre -->
        <EventSearch />
    </div>
</section>
