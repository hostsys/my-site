<script setup>
import MusicPlayer from './components/MusicPlayer.vue';
import NavMenu from './components/NavMenu.vue';
</script>

<link href="
https://cdn.jsdelivr.net/npm/hack-font@3.3.0/build/web/hack.min.css
" rel="stylesheet">



<template>
  <header class="text-white">
    <canvas id="bg"></canvas>
    <div class="absolute inset-0 flex justify-center items-center z-10 bg-black bg-opacity-70 transition-opacity duration-500" id="enterBtnBox">
      <button id="enterBtn" class="border-2 border-white rounded-md py-5 px-7 hover:text-gray-500 hover:border-gray-500">enter</button>
    </div>
  </header>
  <body class="flex flex-col md:p-10 p-5 lg:gap-20 gap-10 min-h-screen max-h-screen h-screen overflow-y-hidden transition-opacity duration-500 opacity-0 text-white" id="contentBody">
    <!-- begin header -->
    <!-- bg-star bg-no-repeat bg-center bg-contain -->
    <NavMenu />
    <!-- begin content -->
    <div
      id="content"
      class="flex-grow
        order-1
        p-5
        lg:p-10
        border-2 border-white
        rounded-sm
        overflow-y-auto
      "
    >
    <div id="percent" class="fixed w-24 z-10 py-1 bg-white text-black text-center rounded-sm transition-opacity">scroll</div>
      <router-view />
    </div>
  <!-- music player -->
    <MusicPlayer />
  </body>
</template>