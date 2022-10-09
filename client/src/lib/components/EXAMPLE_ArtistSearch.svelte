<script>
    import {
        MM_artistSearchBar,
        MM_searchArtistResults_2,
        MM_artistAlbums_2,
        MM_selectedGenre,
        pageParams,
        server_url,
    } from "$lib/EXAMPLE_stores";

    let sortBy = "artist";
    let sortOrder = 1;
    let rowData = [];
    let genreList = [];

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
            key: "releaseDate",
            title: "Release Date",
            sortable: true,
            value: (v) => v.releaseDate,
        },
    ];

    // function changeEvent() {
    // 	console.log($MM_artistSearchBar);
    // }

    async function searchArtist() {
        await fetch(
            `${$server_url}/search/mm/${$MM_artistSearchBar}/${$pageParams.size}/${$pageParams.page}`
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                $MM_searchArtistResults_2 = data;
            });

        if ($MM_searchArtistResults_2.length > 0)
            await fetch(
                `${$server_url}/albums/${$MM_searchArtistResults_2[0].artistId}/${$pageParams.size}/${$pageParams.page}`
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    $MM_artistAlbums_2 = data;
                    rowData = data;
                    genreList = data.filter((elem) => elem.genres.length !== 0);
                    genreList = genreList.map((elem) => elem.genres[0]);
                });
        else {
            console.log("No artists matching search query");
            $MM_artistAlbums_2 = [];
            rowData = [];
            genreList = [];
        }
    }
</script>

<div class="my-4">
    <h3>1. Search MusixMatch for Artists</h3>
    <label>
        <h4 class="mb-0"><strong>Artist Search</strong></h4>
        <input type="text" bind:value={$MM_artistSearchBar} />
    </label>
    <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-3 mt-1"
        on:click={searchArtist}>Search Artist Catalogue</button
    >
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg" />
    <div class="mt-4">
        <h3>2. Select a returned genre</h3>
        <label>
            <h4><strong>Genre Select</strong></h4>
            <select class="my-3 min-w-[200px]" bind:value={$MM_selectedGenre}>
                {#each genreList as genre}
                    <option value={genre}>
                        {genre}
                    </option>
                {/each}
            </select>
        </label>
    </div>
</div>
