<script>
    import {
        MM_artistSearchBar,
        MM_searchArtistResults_2,
        MM_artistAlbums_2,
        MM_selectedGenre,
        TM_eventGenreList,
        pageParams,
        server_url,
        loc,
        searchRadius,
    } from "$lib/EXAMPLE_stores";

    let sortBy = "artist";
    let sortOrder = 1;
    let rowData = [];

    const COLUMNS = [
        {
            // TODO check if this is the correct key/value
            key: "eventId",
            title: "Event ID",
            sortable: true,
            value: (v) => v.id,
        },
        {
            key: "Name",
            title: "Artist",
            sortable: true,
            value: (v) => v.artist,
        },
        {
            key: "genre",
            title: "Genre",
            sortable: true,
            value: (v) => {
                if (v.genres[0]) {
                    return v.genres[0];
                } else {
                    return "";
                }
            },
        },
        {
            key: "subgenre",
            title: "Subgenre",
            sortable: true,
            value: (v) => {
                if (v.subgenres[0]) {
                    return v.subgenres[0];
                } else {
                    return "";
                }
            },
        },
    ];

    async function searchEvents() {
        await fetch(`${$server_url}/geoplugin`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                $loc.geohash = data.geohash;
                $loc.lat = data.lat;
                $loc.lon = data.lon;
            });
        fetch(
            `${$server_url}/nearbyConcerts/${$MM_selectedGenre}/${$loc.geohash}/${$searchRadius}/${$pageParams.size}/${$pageParams.page}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                $TM_eventGenreList = data;
                rowData = data;
            })
            .catch((error) => {
                console.log(error);
            });
    }
</script>

<!-- TODO search TM genres, get genre that matches MM selected -->
<!-- Do a concert search by that genre -->

<div class="my-4">
    <h3>3. Search for events matching genre</h3>
    <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-3 mt-1"
        on:click={searchEvents}>Search Events</button
    >
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg" />
</div>
