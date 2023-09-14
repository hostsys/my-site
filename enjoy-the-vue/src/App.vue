<script setup>
import MusicPlayer from './components/MusicPlayer.vue'
import NavMenu from './components/NavMenu.vue'
</script>

<link href="https://cdn.jsdelivr.net/npm/hack-font@3.3.0/build/web/hack.min.css" rel="stylesheet" />

<template>
    <header class="text-primary">
        <canvas id="bg"></canvas>
        <div
            class="absolute inset-0 z-10 flex items-center justify-center bg-secondary bg-opacity-70 font-pixel transition-opacity"
            id="enterBtnBox"
        >
            <button
                id="enterBtn"
                class="rounded-md border-2 border-primary px-7 py-5 shadow-[0_0_25px] hover:border-tertiary hover:text-tertiary"
            >
                enter
            </button>
        </div>
    </header>
    <body
        class="flex h-screen max-h-screen min-h-screen flex-col gap-10 overflow-y-hidden p-5 font-pixel text-base text-primary opacity-0 md:p-10 lg:gap-20"
        id="contentBody"
    >
        <NavMenu />
        <!-- begin content -->
        <div
            id="content"
            class="group order-1 flex-grow overflow-y-auto rounded-sm border-2 border-solid border-primary p-5 shadow-primary transition-colors duration-500 ease-in-out hover:border-4 hover:border-double lg:p-10"
        >
            <div
                id="percent"
                class="rounded-xs fixed left-20 top-20 z-10 w-24 bg-primary py-1 text-center text-scene transition-opacity"
            >
                scroll
            </div>
            <router-view />
        </div>
        <!-- music player -->
        <MusicPlayer />
    </body>
</template>
