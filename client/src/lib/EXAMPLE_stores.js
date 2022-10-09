import { writable, readable } from 'svelte/store';
import { browser } from '$app/environment';

// Generic variables
export var server_url;
if (browser)
    server_url = readable(`http://${location.hostname}:3001`);

export var pageParams = writable({ page: 1, size: 10 });
export var searchRadius = writable(20);

// Geoplugin results test
export var loc = writable({
    lat: '0',
    lon: '0',
    geohash: '0'
})

// Ticketmaster search results
export var TM_artistList = writable([
    {
        id: 1,
        artist: 'the beatles'
    },
    {
        id: 2,
        artist: 'the doors'
    }
]);
export var TM_selectedArtist = writable(TM_artistList[0]);

export var TM_eventGenreList = writable([]);

// MusixMatch search results (_1 denotes use case 1 variable, likewise for _2)
export var MM_searchArtistResults_1 = writable([]);
export var MM_artistAlbums_1 = writable([]);

export var MM_artistSearchBar = writable('');

export var MM_searchArtistResults_2 = writable([]);
export var MM_artistAlbums_2 = writable([]);

export var MM_selectedGenre = writable('');





