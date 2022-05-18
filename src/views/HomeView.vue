<script lang="ts" setup>
import CharacterList from "@/components/CharacterList/CharacterList.vue";
import SearchBar from "@/components/SearchBar/SearchBar.vue";

import { ref, reactive, computed, onBeforeMount, onBeforeUnmount } from "vue";
import type { ApiResponse } from "../types";

const characters: ApiResponse = reactive({
  results: [] as ApiResponse["results"],
  info: {} as ApiResponse["info"],
});
const currentSite = ref(1);
const hidden = ref(true);
const filters = reactive({
  species: "",
  status: "",
  gender: [] as string[],
});
async function loadNext(): Promise<void> {
  const req = await fetch(`${characters.info.next}`);
  const data = await req.json();
  characters.results = data.results;
  characters.info = data.info;
  currentSite.value += 1;
  window.scrollTo(0, 0);
}
async function loadPrev(): Promise<void> {
  const req = await fetch(`${characters.info.prev}`);
  const data: ApiResponse = await req.json();
  characters.results = data.results;
  characters.info = data.info;
  currentSite.value -= 1;
  window.scrollTo(0, 0);
}
const filteredData = computed((): ApiResponse['results'] => {
  // here are all the queries that can be inputed by user
  const res = characters.results;
  if (!characters.results) {
    return [];
  }
  return res.filter((character) => {
    const status = character.status;
    const species = character.species;
    const gender = character.gender;

    const statusQ = filters.status;
    const speciesQ = filters.species;
    const genderQ = filters.gender;
    const result = () => {
      // searching for characters that have at least one element from gender query
      if (genderQ.length < 1) {
        return true;
      }
      return genderQ.some((item) => item === gender);
    };

    return status.includes(statusQ) && species.includes(speciesQ) && result();
  });
});
onBeforeMount(async (): Promise<void> => {
  const req = await fetch("https://rickandmortyapi.com/api/character");
  const data: ApiResponse = await req.json();
  characters.results = data.results;
  characters.info = data.info;
  currentSite.value = 1;
  window.addEventListener("scroll", getTop);
});
function getData(data: ApiResponse): void {
  if (data.error) {
    characters.info = {} as ApiResponse["info"];
    characters.results = [] as ApiResponse["results"];
    return;
  }
  characters.results = data.results;
  characters.info = data.info;
  currentSite.value = 1;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getQueryData(data: { status: string; species: string; gender: string[] }): void {
  filters.status = data.status;
  filters.species = data.species;
  filters.gender = data.gender;
}
function getTop(): void {
  if (document.documentElement.scrollTop > 100) {
    hidden.value = false;
    return;
  }
  hidden.value = true;
}
onBeforeUnmount((): void => {
  window.removeEventListener("scroll", getTop);
});
</script>

<template>
  <div class="home">
    <SearchBar
      :characters="characters"
      @new-query="getData"
      @filter-data="getQueryData"
    />
    <CharacterList :characters="characters" :filteredData="filteredData" />
    <div class="sites-wrapper">
      <button v-if="characters.info.prev" @click="loadPrev()">
        <i class="far fa-arrow-alt-circle-left"></i>
      </button>
      <div class="site-number" v-if="characters.results.length > 0">
        {{ currentSite }} of {{ characters.info.pages }}
      </div>
      <button v-if="characters.info.next" @click="loadNext()">
        <i class="far fa-arrow-alt-circle-right"></i>
      </button>
    </div>
    <a id="scroll-top" :class="{ hidden: hidden }" href="#">
      <FontAwesomeIcon class="i" icon="arrowUpLong" />
    </a>
  </div>
</template>

<style>
.home {
  min-width: 100%;
}
.sites-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3.5rem;
  padding-bottom: 3.5rem;
  font-size: 1.5rem;
  color: rgb(156, 192, 156);
}
.sites-wrapper button {
  font-size: 2.5rem;
  border: none;
  background: none;
  cursor: pointer;
  color: #d8ced3;
  margin: 0 0.5rem;
}
#scroll-top {
  width: 60px;
  height: 60px;
  background-color: #36352a;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 100;
  color: white;
  font-size: 2.5rem;
  border-radius: 10px;
  box-shadow: 0 0 3px hsl(180, 4%, 36%);

  transition: opacity 0.5s ease-out, box-shadow 0.2s ease-out;
}
#scroll-top:hover {
  box-shadow: 0 0 15px hsl(177, 37%, 65%);
}
#scroll-top .i {
  transform: rotateZ(90deg);
  line-height: 60px;
  margin-right: 1.2rem;
  color: white;
  font-size: 2.3rem;
}
</style>
