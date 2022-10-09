<script>
    import {
        TM_artistList,
        pageParams,
        loc,
        searchRadius,
        server_url,
    } from "$lib/EXAMPLE_stores";

    async function getEvents() {
        await fetch(`${$server_url}/geoplugin`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                $loc.geohash = data.geohash;
                $loc.lat = data.lat;
                $loc.lon = data.lon;
            });
        fetch(
            `${$server_url}/nearbyConcerts/${$loc.geohash}/${$searchRadius}/${$pageParams.size}/${$pageParams.page}`,
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
                $TM_artistList = data;
            });
    }
</script>

<div>
    <h3>1. Search for nearby concerts</h3>
    <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full my-3"
        on:click={getEvents}>Get Nearby Event Artists</button
    >
</div>
