<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
</script>

<link href="
https://cdn.jsdelivr.net/npm/hack-font@3.3.0/build/web/hack.min.css
" rel="stylesheet">

<template>
  <header></header>
  <body class="h-screen overflow-y-auto">
    <canvas id="bg"></canvas>
    <!-- begin header -->
    <!-- bg-star bg-no-repeat bg-center bg-contain -->
    <div id="header" class="flex justify-center items-center px-20 pt-28">
      <!-- column 1 -->
      <div id="hcol1" class="text-right self-center pr-14">
        <router-link to="/" class="text-white" id="home">home</router-link
        ><br />
        <router-link to="/about" class="text-white" id="portfolio"
          >portfolio</router-link
        >
      </div>
      <!-- column 2 -->
      <div id="hcol2" class="flex justify-center place-content-center">
        <!-- <img alt="star" src="star-texture.png" /> -->
        <canvas id="eyebox"> </canvas>
      </div>
      <!-- column 3 -->
      <div id="hcol3" class="text-left self-center pl-14">
        <a href="#" class="text-white" id="music">music</a> <br />
        <a href="#" class="text-white" id="gallery">gallery</a>
        <audio
          src="http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/eatpellet.ogg"
        ></audio>
        <audio
          src="http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/bonus.wav"
        ></audio>
      </div>
    </div>
    <!-- begin content -->
    <div
      id="content"
      class="
        lg:h-[calc(100vh-500px)]
        md:h-[calc(100vh-500px)]
        sm:h-[calc(100vh-500px)]
        h-[calc(100vh-400px)]
        flex-row
        lg:w-2/3 lg:mx-auto
        md:mx-20
        m-10
        p-10
        border-2 border-white
        rounded-lg
        overflow-y-auto
      "
    >
    <div id="percent" class="fixed"></div>
      <router-view />
    </div>
  <!-- music player -->
  <div class="msuic-contianer container flex align-center content-center">
    <div class="music-info">
      <h4 is="title">Song</h4>
      <div class="progress-container">
        <div class="progress"></div>
      </div>
    </div>

    <audio src="music/untitled.mp3" id="audio"></audio>
  </div>
  </body>
</template>
