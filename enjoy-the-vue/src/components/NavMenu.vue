<script setup>
    import { RouterLink } from 'vue-router';
</script>

<template>
    <div id="header" class="order-2 flex justify-center items-center">
      <!-- column 1 -->
      <div id="hcol1" class="text-right md:pr-14 pr-4">
        <router-link to="/" id="home">home</router-link
        ><br />
        <router-link to="/portfolio" id="portfolio"
          >portfolio</router-link
        >
      </div>
      <!-- column 2 -->
      <div id="hcol2" class="flex justify-center">
        <!-- <img alt="star" src="star-texture.png" /> -->
        <canvas id="eyebox"> </canvas>
      </div>
      <!-- column 3 -->
      <div id="hcol3" class="text-left md:pl-14 pl-4">
        <router-link to="/music" id="music">music</router-link> <br />
        <router-link to="/gallery" id="gallery">gallery</router-link>
      </div>
    </div>
</template>

<script>
export default {
    name: "NavMenu"
}
</script>