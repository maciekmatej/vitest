<template>
  <header class="search-bar">
    <div class="search-bar-container">
      <div class="logo" @click="reload">
        <img src="@/assets/images/logo.png" alt="" />
      </div>

      <section class="search-form">
        <font-awesome-icon class="i" icon="search" />
        <form id="query">
          <input
            type="text"
            name="name"
            v-model="searchData.nameQuery"
            id="nameQ"
            placeholder="Type the name..."
          />
          <button class="btn search-btn" @click.prevent="newQuery">
            Search
          </button>
        </form>
      </section>
      <div class="filters-wrapper">
        <button class="btn filters-btn" @click="toggle">
          Filters<i
            class="far fa-caret-down"
            :class="{ 'spin-button': searchData.toggleFilter }"
          ></i>
        </button>
        <div class="filter-container" :class="{ show: !searchData.toggleFilter }">
          <form @change.prevent="filterQuery" id="filter-form">
            <label for="statusFilter">status:</label>
            <select v-model="searchData.filters.status" name="status" id="statusFilter">
              <option value="">all</option>
              <option v-for="status in characterStatus" 
                      :key="status">
                {{ status }}
              </option>
            </select>
            <label for="speciesFilter">species:</label>
            <select v-model="searchData.filters.species" name="species" id="speciesFilter">
              <option value="">all</option>
              <option v-for="species in characterSpecies" :key="species">
                {{ species }}
              </option>
            </select>
            <div class="gender">
              <span>gender:</span>
              <div class="checkbox-wrapper">
                <label for="female">female</label>
                <input
                  v-model="searchData.filters.gender"
                  type="checkbox"
                  name="Female"
                  id="female"
                  value="Female"
                />
              </div>
              <div class="checkbox-wrapper">
                <label for="male">male</label>
                <input
                  v-model="searchData.filters.gender"
                  type="checkbox"
                  name="Male"
                  id="male"
                  value="Male"
                />
              </div>
              <div class="checkbox-wrapper">
                <label for="unknown">unknown</label>
                <input
                  v-model="searchData.filters.gender"
                  type="checkbox"
                  name="Unknown"
                  id="unknown"
                  value="unknown"
                />
              </div>
            </div>
            <button @click.prevent="reset" type="button" class="reset-btn">
              Reset
            </button>
          </form>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import type { ApiResponse } from "@/types";
import { reactive, computed } from "vue"
import { useFetchApiData } from "@/composables/fetchApiData";

const props = defineProps<{
  characters: ApiResponse;
}>();
const emits = defineEmits(['new-query', 'filter-data'])
const searchData = reactive({
  toggleFilter: false,
  filters: {
    status: '',
    species: '',
    gender: [] as Array<string>
  },
  nameQuery: '',
})

const newQuery = async(): Promise<void> => {
  const url = `https://rickandmortyapi.com/api/character/?name=${searchData.nameQuery}`
  const { getData } = useFetchApiData();
  const data = await getData(url);
  emits('new-query', data)
}
const filterQuery = (): void => {
  emits('filter-data', searchData.filters)
}
const toggle = (): void => {
  searchData.toggleFilter = !searchData.toggleFilter
}
const reset = (): void => {
  searchData.filters = {
    status: '',
    species: '',
    gender: []
  }
  emits('filter-data', searchData.filters)
}
const reload = (): void => {
  window.location.reload()
}

const characterStatus = computed((): Array<string> => {
  let allStatus: Array<string> = []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props.characters.results.forEach((character) => {
    allStatus.push(character.status)
  })
  allStatus = [...new Set(allStatus)]
  return allStatus
})

const characterSpecies = computed((): Array<string> => {
  let allSpecies: Array<string> = []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props.characters.results.forEach((character) => {
    allSpecies.push(character.species)
  })
  allSpecies = [...new Set(allSpecies)]
  return allSpecies
})

</script>

<style>
.search-bar {
  position: fixed;
  display: flex;
  justify-content: center;
  top: 0;
  z-index: 9999;
  background-color: #05081d;
  width: 100%;
  height: 9.5rem;
  box-shadow: 0 0 30px 10px #05081d;
  padding-top: 1rem;
  padding-bottom: 2rem;
}
.search-bar-container {
  display: flex;
  min-width: 1200px;
  justify-content: space-between;
  align-items: center;
}
.search-form {
  display: flex;
  align-items: center;
}
.search-form .i {
  margin-right: 1.2rem;
  color: white;
  font-size: 2.3rem;
}

.btn {
  font-size: 1.5rem;
  border-radius: 8px;
  font-weight: 700;
  box-shadow: 0 0 10px rgb(144, 239, 252);
  border: none;
  margin-left: 1.4rem;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease-out;
}
.search-btn {
  background-color: white;
  color: #05081d;
}
.search-btn:hover {
  box-shadow: 0 0 12px 1px rgb(69, 233, 255);
  background-color: #a5d4eb;
}
.filters-btn {
  font-size: 1.2rem;
  background-color: #05081d;
  color: white;
  box-shadow: inset 0 0 10px rgb(144, 239, 252), 0 0 10px rgb(144, 239, 252);
  border: 1px solid white;
}
.filters-btn i {
  font-size: 1.4rem;
  margin-left: 1rem;
}
.logo {
  height: 100%;
  cursor: pointer;
}
.logo img {
  height: 6.5rem;
}
#nameQ {
  padding: 0.4rem 0.9rem;
  background: none;
  border: white 4px solid;
  border-radius: 10px;
  box-shadow: inset 0 0 10px rgb(144, 239, 252), 0 0 10px rgb(144, 239, 252);
  color: white;
  font-size: 1.5rem;
}
.spin-button {
  transform: rotate(180deg);
}

.show {
  visibility: hidden;
  opacity: 0;
}
.filters-wrapper {
  position: relative;
}
.filter-container {
  position: absolute;
  top: 6rem;
  left: -3rem;
  width: 15rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: opacity 0.5s linear;
  border-radius: 10px;
  box-shadow: 0 0 20px black;
  padding: 20px;
}
.filter-container form {
  display: flex;
  width: 100%;
  height: 20rem;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.filter-container form select {
  padding: 0.2rem;
  font-size: 1rem;
}
.gender {
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.3rem;
}
.filter-container label {
  font-size: 1.3rem;
}
.checkbox-wrapper label {
  font-size: 1.1rem;
}
::placeholder {
  color: white;
}
.reset-btn {
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  background-color: rgb(209, 208, 208);
  padding: 8px 20px;
}
@media screen and (max-width: 1400px) {
  .search-bar-container {
    min-width: 1000px;
  }
  .logo img {
    height: 5rem;
  }
  #nameQ {
    font-size: 1.2rem;
    padding-left: 10px;
    padding-right: 10px;
  }
  .search-btn {
    font-size: 1.2rem;
    margin-left: 10px;
  }
  .filters-btn {
    font-size: 1.1rem;
    margin-left: 10px;
    padding: 8px 10px;
  }
  .filters-btn i {
    margin-left: 7px;
  }
  .filter-container {
    z-index: 9999;
    top: 5rem;
    left: -4.5rem;
  }
}
@media screen and (max-width: 1159px) {
  .search-bar {
    position: static;
    height: unset;
    background-color: unset;
  }
  .search-bar-container {
    flex-direction: column;
    min-width: unset;
    height: unset;
    justify-content: space-between;
    height: 15rem;
  }
  .filters-wrapper {
    margin-top: 2rem;
  }
  .filter-container {
    z-index: 9999;
    top: 3.6rem;
    left: -4.5rem;
  }
}
@media screen and (max-width: 500px) {
  .search-bar-container {
    width: 300px;
  }
  .search-form i {
    display: none;
  }
  #query {
    display: flex;
  }
  #nameQ {
    width: 180px;
  }
}
</style>
