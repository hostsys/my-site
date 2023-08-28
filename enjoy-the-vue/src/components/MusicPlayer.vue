<script setup>
    import { BackwardIcon } from "@heroicons/vue/24/outline";
    import { PlayIcon } from "@heroicons/vue/24/outline";
    import { PauseIcon } from "@heroicons/vue/24/outline";
    import { ForwardIcon } from "@heroicons/vue/24/outline";
</script>
<template>
    <div id="music-container" class="order-3 border-2 border-white rounded-sm flex max-h-32">
        <div id="img-container" class="group relative flex-shrink-0 flex p-1 h-28 w-28">
            <img id="cover" src="https://media.tenor.com/kxefu8OQcD8AAAAC/loli-anime.gif" class="cursor-zoom-in">
            <img id="cover-tooltip" src="https://media.tenor.com/kxefu8OQcD8AAAAC/loli-anime.gif" class="absolute border-2 border-white h-28 hidden rounded-sm group-hover:block left-[calc(50%-2px)] group-hover:top-[-160%] group-hover:scale-[200%]">
        </div>
        <div id="music-container-inner" class="w-full grid grid-flow-col grid-cols-7 grid-rows-3">
            <div id="volume-container" class="row-span-1 col-span-1 border-l-2 border-b-2 border-white w-full flex p-1 text-sm">
                <div id="0" class="bg-gray-800 w-1/5 cursor-pointer flex items-center justify-center vol-btn">
                    0%
                </div>
                <div id="25" class="bg-blue-700 w-1/5 flex items-center justify-center vol-btn">
                    25%
                </div>
                <div id="50" class="bg-yellow-700 w-1/5 border-2 flex items-center justify-center vol-btn">
                    50%
                </div>
                <div id="75" class="bg-orange-700 w-1/5 flex items-center justify-center vol-btn">
                    75%
                </div>
                <div id="100" class="bg-red-700 w-1/5 cursor-pointer flex items-center justify-center vol-btn">
                    100%
                </div>
            </div>
            <div id="music-info" class="row-span-2 col-span-1 flex flex-col justify-center pl-1">
                <h4 id="title" class="text-left text-sm">loading...</h4>
                <h4 id="spotify-link" class="text-sm underline cursor-pointer">Spotify</h4>
            </div>
            <div id="music-progress" class="col-span-6 row-span-1 flex">
                <div id="progress-container" class="border-b-2 border-l-2 border-white w-full cursor-grab active:cursor-grabbing p-1">
                    <div id="progress" class="h-full w-0 bg-gradient-to-r from-purple-700 to-orange-700 bg-fixed"></div>
                </div>
            </div>
            <!-- bg-gradient-to-r from-purple-700 to-orange-700 -->
            <div id="navigation" class="row-span-2 col-span-6 flex justify-center">
                <button id="prev">
                    <BackwardIcon class="h-6 w-6" />
                </button>
                <button id="play-pause">
                    <PlayIcon class="h-8 w-8 play-icon" />
                    <PauseIcon class="h-8 w-8 hidden pause-icon" />
                </button>
                <button id="next">
                    <ForwardIcon class="h-6 w-6" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'MusicPlayer',
};
</script>