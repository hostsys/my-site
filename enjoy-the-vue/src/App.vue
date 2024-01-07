<script setup>
import MusicPlayer from './components/MusicPlayer.vue'
import NavMenu from './components/NavMenu.vue'
</script>

<link href="https://cdn.jsdelivr.net/npm/hack-font@3.3.0/build/web/hack.min.css" rel="stylesheet" />

<template>
    <header class="text-primary">
        <canvas id="bg"></canvas>
        <dialog
            class="absolute top-[50%] z-10 flex h-28 w-48 cursor-default flex-col justify-around border-2 border-primary bg-secondary bg-opacity-0 p-4 text-primary"
            :class="{}"
            open
        >
            <p>enter site?</p>
            <form class="flex justify-end" method="dialog">
                <button type="submit" class="bg-primary bg-opacity-30 px-3" id="enterBtn">
                    ok
                </button>
            </form>
        </dialog>
        <!-- <div
            class="cursor-pixel absolute inset-0 z-10 flex items-center justify-center bg-secondary bg-opacity-70 font-pixel transition-opacity"
            id="enterBtnBox"
        >
            <button
                id="enterBtn"
                class="rounded-md border-2 border-primary px-7 py-5 shadow-[0_0_25px] shadow-transparent hover:border-tertiary hover:text-tertiary"
            >
                enter
            </button>
        </div> -->
    </header>
    <body
        class="flex h-screen max-h-screen min-h-screen cursor-default flex-col gap-10 overflow-y-hidden p-5 font-pixel text-base text-primary opacity-0 transition-opacity duration-300 selection:bg-primary selection:text-secondary active:cursor-stab md:p-5 lg:gap-10"
        id="contentBody"
    >
        <NavMenu />
        <!-- begin content -->
        <div
            id="content"
            class="order-1 flex-grow overflow-y-auto rounded-sm border-2 border-solid border-primary border-opacity-80 p-5 shadow-primary transition-all duration-300 hover:border-opacity-100 lg:p-5"
        >
            <div
                id="percent"
                class="rounded-xs fixed left-8 top-8 z-10 w-24 bg-primary py-1 text-center text-scene transition-all duration-300 md:left-10 md:top-10"
            >
                scroll
            </div>
            <router-view />
        </div>
        <!-- music player -->
        <MusicPlayer />
    </body>
</template>
