<!-- Website Header and Footer -->
<script>
    import "../app.css";
</script>

<header>
    <nav class="flex items-center justify-between flex-wrap bg-teal-600 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
            <span class="font-semibold text-xl tracking-tight"
                >Tailwind CSS</span
            >
        </div>
        <div class="w-full block flex-grow md:flex md:items-center md:w-auto">
            <div class="text-sm md:flex-grow">
                <a
                    href="/"
                    class="block mt-4 md:inline-block md:mt-0
                    text-white hover:text-white mr-4 rounded
                      bg-slate-400 hover:bg-slate-500 px-6 py-2"
                >
                    Home
                </a>
                <a
                    href="artistCatalogue"
                    class="block mt-4 md:inline-block md:mt-0
                    text-white hover:text-white mr-4 rounded
                     bg-slate-400 hover:bg-slate-500 px-6 py-2"
                >
                    Get Artists from Events
                </a>
                <a
                    href="eventGenre"
                    class="block mt-4 md:inline-block md:mt-0
                    text-white hover:text-white mr-4 rounded
                     bg-slate-400 hover:bg-slate-500 px-6 py-2"
                >
                    Get Events from Genres
                </a>
            </div>
        </div>
    </nav>
</header>

<main class="flex-grow bg-slate-200">
    <slot />
</main>

<footer class="bg-slate-200 pb-3">
    <section class="container">
        <hr class="border-zinc-600 border-t-2" />
        <div class="flex items-center flex-col">
            <h3>CAB432 Assignment 1 Frontend</h3>
            <h4>n9995846 - Simon Di Florio</h4>
        </div>
    </section>
</footer>
