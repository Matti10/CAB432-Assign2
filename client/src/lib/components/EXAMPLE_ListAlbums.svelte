<script>
    import {
        pageParams,
        TM_selectedArtist,
        MM_searchArtistResults_1,
        MM_artistAlbums_1,
        server_url,
    } from "$lib/EXAMPLE_stores";

    let sortBy = "artist";
    let sortOrder = 1;
    let rowData = [];
    let searchResult = "";

    const COLUMNS = [
        {
            key: "albumId",
            title: "Album ID",
            sortable: true,
            value: (v) => v.albumId,
        },
        {
            key: "album",
            title: "Album",
            sortable: true,
            value: (v) => v.album,
        },
        {
            key: "releaseDate",
            title: "Release Date",
            sortable: true,
            value: (v) => v.releaseDate,
        },
    ];

    async function getMM_artistAlbums_1() {
        await fetch(
            `${$server_url}/search/mm/${$TM_selectedArtist.artist}/${$pageParams.size}/${$pageParams.page}`
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                $MM_searchArtistResults_1 = data;
            });

        if ($MM_searchArtistResults_1.length > 0) {
            fetch(
                `${$server_url}/albums/${$MM_searchArtistResults_1[0].artistId}/${$pageParams.size}/${$pageParams.page}`
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    $MM_artistAlbums_1 = data;
                    rowData = data;
                    searchResult = "";
                });
        } else {
            searchResult = "No artists matching concert name found.";
        }
    }
</script>

<div class="mt-3">
    <h3>3. List the selected artist's albums</h3>
    <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full my-3"
        on:click={getMM_artistAlbums_1}>List Artist Albums</button
    >
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg" />
    <p>{searchResult}</p>
</div>
