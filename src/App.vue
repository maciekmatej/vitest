
<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style>
@import '@/assets/base.css';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: rgb(0, 0, 0);
  background-image: url(@/assets/images/bg.png);
  min-width: 320px;
  min-height: 100vh;
}
</style>