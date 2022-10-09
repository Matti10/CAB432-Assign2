<script>
    import { pageParams } from "$lib/EXAMPLE_stores";

    function validatePage() {
        if ($pageParams.page < 1) {
            $pageParams.page = 1;
        } else if ($pageParams.page > 10) {
            $pageParams.page = 10;
        }
    }
    function validatePageSize() {
        if ($pageParams.size < 1) {
            $pageParams.size = 1;
        } else if ($pageParams.size > 100) {
            $pageParams.size = 100;
        }
    }
</script>

<div class="my-3">
    <label>
        <h4><strong>Page Number</strong></h4>
        <input
            type="number"
            min="1"
            max="10"
            bind:value={$pageParams.page}
            on:change={validatePage}
        />
        <input type="range" bind:value={$pageParams.page} min="1" max="10" />
    </label>

    <label>
        <h4><strong>Page Size</strong></h4>
        <input
            type="number"
            min="1"
            max="100"
            bind:value={$pageParams.size}
            on:change={validatePageSize}
        />
        <input type="range" bind:value={$pageParams.size} min="1" max="100" />
    </label>
</div>
