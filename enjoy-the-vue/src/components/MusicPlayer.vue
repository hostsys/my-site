<script setup>
import { BackwardIcon } from '@heroicons/vue/24/outline'
import { PlayIcon } from '@heroicons/vue/24/outline'
import { PauseIcon } from '@heroicons/vue/24/outline'
import { ForwardIcon } from '@heroicons/vue/24/outline'
</script>
<template>
    <div
        id="music-container"
        class="group/container order-3 flex max-h-28 rounded-sm border-2 border-primary border-opacity-80 transition-colors duration-300 hover:border-opacity-100"
    >
        <div id="img-container" class="group/tooltip relative flex h-full w-28 flex-shrink-0 p-1">
            <img
                id="cover"
                src="https://media.tenor.com/kxefu8OQcD8AAAAC/loli-anime.gif"
                class="cursor-active active:cursor-stabbing"
            />
            <img
                id="cover-tooltip"
                src="https://media.tenor.com/kxefu8OQcD8AAAAC/loli-anime.gif"
                class="absolute left-[calc(50%-2px)] z-10 hidden h-full rounded-sm border-2 border-primary group-hover/tooltip:top-[-160%] group-hover/tooltip:block group-hover/tooltip:scale-[200%]"
            />
        </div>
        <div id="music-container-inner" class="grid w-full grid-flow-col grid-cols-7 grid-rows-3">
            <div
                id="volume-container"
                class="no-select cursor-active active:cursor-stabbing col-span-1 row-span-1 flex w-full border-b-2 border-l-2 border-primary border-opacity-80 p-1 text-sm text-secondary transition-colors duration-300 group-hover/container:border-opacity-100"
            >
                <div
                    id="0"
                    class="vol-btn transition-colors-manual flex w-1/5 items-center justify-center bg-primary"
                >
                    <p>0%</p>
                </div>
                <div
                    id="25"
                    class="vol-btn transition-colors-manual flex w-1/5 items-center justify-center bg-primary"
                >
                    <p>25%</p>
                </div>
                <div
                    id="50"
                    class="vol-btn transition-colors-manual flex w-1/5 items-center justify-center bg-primary"
                >
                    <p
                        class="underline decoration-secondary decoration-dotted decoration-4 underline-offset-2"
                    >
                        50%
                    </p>
                </div>
                <div
                    id="75"
                    class="vol-btn transition-colors-manual flex w-1/5 items-center justify-center border-secondary bg-primary"
                >
                    <p>75%</p>
                </div>
                <div
                    id="100"
                    class="vol-btn transition-colors-manual flex w-1/5 items-center justify-center border-secondary bg-primary"
                >
                    <p>100%</p>
                </div>
            </div>
            <div id="music-info" class="col-span-1 row-span-2 flex flex-col justify-center pl-1">
                <h4 id="title" class="text-left text-sm">loading...</h4>
                <h4 id="spotify-link" class="text-sm underline">Spotify</h4>
            </div>
            <div id="music-progress" class="col-span-6 row-span-1 flex">
                <div
                    id="progress-container"
                    class="cursor-active active:cursor-stabbing w-full border-b-2 border-l-2 border-primary border-opacity-80 p-1 transition-colors duration-300 group-hover/container:border-opacity-100"
                >
                    <div
                        id="progress"
                        class="h-full w-0 bg-primary bg-fixed transition-all duration-150 ease-in"
                    >
                        <div
                            class="h-full bg-gradient-to-r from-transparent from-20% to-secondary bg-fixed"
                        ></div>
                    </div>
                </div>
            </div>
            <!-- bg-gradient-to-r from-purple-700 to-orange-700 -->
            <div id="navigation" class="col-span-6 row-span-2 flex justify-center">
                <button id="prev">
                    <BackwardIcon class="h-6 w-6" />
                </button>
                <button id="play-pause">
                    <PlayIcon class="play-icon h-8 w-8" />
                    <PauseIcon class="pause-icon hidden h-8 w-8" />
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
    name: 'MusicPlayer'
}
</script>
